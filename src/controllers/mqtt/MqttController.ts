import mosca from "mosca";
import { Server } from "socket.io";
import { Events_get_mqtt, Events_send_mqtt } from "../../config/enums";
import mqtt from 'mqtt';
import { prisma } from "../../data/mysql";


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

                if (Object.keys(Events_send_mqtt).includes(packet.topic)) {
                    const payload = packet.payload.toString();
                    this.socketServer.emit(packet.topic, payload);
                }

                if (Object.keys(Events_get_mqtt).includes(packet.topic)) {
                    const deviceName = packet.topic.split("_")[1];
                    const dispositivo = await prisma.dispositivo.findUnique({
                        where: { nombre: deviceName }
                    });
                    if (!dispositivo) return;

                    const pub = mqtt.connect(this.mqttUrl);
                    await pub.publishAsync(
                        `SEND_${deviceName}`,
                        (dispositivo.estado) ? "true" : "false"
                    );
                    await pub.endAsync();
                }

            });
        })
    }
}