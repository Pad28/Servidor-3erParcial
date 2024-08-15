import mosca from "mosca";
import { Server } from "socket.io";
import { Dispositivos, Events_change_db_mqtt, Events_get_db_mqtt, Events_get_mqtt, Events_send_mqtt } from "../../config/enums";
import mqtt from 'mqtt';
import { prisma } from "../../data/mysql";

type ChangeDataDevice = {
    dispositivo: string;
    columna: string;
    valor: string;
    tipo: "number" | "string" | "float" | "boolean";
}

export class MqttController {
    constructor(
        private readonly broker: mosca.Server,
        private readonly socketServer: Server,
        private readonly mqttUrl: string,
    ) { }

    public async listen() {
        this.broker.on("ready", () => {
            console.log(`Broker MQTT en puerto ${this.broker.opts.port}`);

            this.broker.on("published", async (packet, client) => {

                // Enviar el estado actual del dispositivo a un WebSocket
                if (Object.keys(Events_send_mqtt).includes(packet.topic)) {
                    const payload = packet.payload.toString();
                    this.socketServer.emit(packet.topic, payload);
                }

                // Pedir el estado del dispositivo a la base de datos
                if (Object.keys(Events_get_mqtt).includes(packet.topic)) {
                    const deviceName = packet.topic.split("_")[1];
                    const dispositivo = await prisma.dispositivo.findUnique({
                        where: { nombre: deviceName }
                    });
                    if (!dispositivo) return;

                    const pub = mqtt.connect(this.mqttUrl);
                    await pub.publishAsync(
                        `LED_SEND_ESTADO_MQTT_${deviceName}`,
                        (dispositivo.estado) ? "true" : "false"
                    );
                    await pub.endAsync();
                }

                // Pedir la informacion del dispositivo a la base de datos
                if (Object.keys(Events_get_db_mqtt).includes(packet.topic)) {

                    const deviceName = packet.topic.split("_")[3];
                    const dispositivo = await prisma.dispositivo.findUnique({
                        where: { nombre: deviceName }
                    });
                    if (!dispositivo) return;

                    const pub = mqtt.connect(this.mqttUrl);
                    await pub.publishAsync(
                        `LED_SEND_DB_${deviceName}`,
                        JSON.stringify(dispositivo)
                    );
                    await pub.endAsync();
                }


                if (packet.topic === Events_change_db_mqtt.LED_CHANGE_DB) {
                    try {
                        const data = JSON.parse(packet.payload.toString()) as ChangeDataDevice;
                        const newValue = (data.tipo === "number")
                            ? parseInt(data.valor)
                            : (data.tipo === "float")
                                ? parseFloat(data.valor)
                                : (data.tipo === "boolean")
                                    ? data.valor === "true"
                                    : data.valor;

                        const result = await prisma.dispositivo.update({
                            where: { nombre: data.dispositivo },
                            data: {
                                [data.columna]: newValue
                            }
                        });
                        this.socketServer.emit(packet.topic, JSON.stringify(result))

                    } catch (error) {
                        console.log(error);
                    }
                }

            });
        })
    }
}