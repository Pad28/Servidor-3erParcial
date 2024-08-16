import { Server, Socket } from "socket.io";
import mqtt from 'mqtt';
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Dispositivos } from "../../config/enums";
import { prisma } from "../../data/mysql";
import { ChangeDataDevice } from "../mqtt/MqttController";

type SocketClient = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export class SocketController {
    constructor(
        private readonly socketServer: Server,
        private readonly mqttUrl: string,
    ) { }

    public async listen() {
        this.socketServer.on("connection", (socket) => {

            // Pedir estado actual del dispositivo
            Object.keys(Dispositivos).forEach(key => {
                this.get(socket, `LED_GET_ESTADO_${key}`);
            });

            // Pedir informacion del dispositivo desde la base de datos, envia la informacion en formato JSON
            // Evento para recibir la informacion LED_SEND_INFO_[nombre del dispositivo]
            Object.keys(Dispositivos).forEach(key => {
                this.getDb(socket, `LED_GET_INFO_${key}`);
            });

            // Invierte el estado del dispositivo(true/false), como payload recibe uno de estos valores:
            //   ENCENDIDO
            //   APAGADO
            //   ABIERTO
            //   CERRADO
            // El MQTT tiene que estar subscrito a un topic con el mismo nombre
            Object.keys(Dispositivos).forEach(key => {
                this.set(socket, `LED_SET_ESTADO_${key}`);
            });

            // Pedir el historial de eventos de un dispisitivo
            // Evento para recibir la informacion LED_SEND_EVENTS_[nombre del dispositivo]
            Object.keys(Dispositivos).forEach(key => {
                this.getEvents(socket, `LED_GET_EVENTS_${key}`);
            });

            // Cambiar una columan de la base de datos desde websocket LED_SOCKET_CHANGE_DB
            this.setDb(socket, `LED_SOCKET_CHANGE_DB`);

        });
    }

    private get(socket: SocketClient, event: string) {
        socket.on(event, async (payload) => {

            const pub = mqtt.connect(this.mqttUrl);
            await pub.publishAsync(event, (payload) ? payload : "");
            pub.end();
        })
    }

    private set(socket: SocketClient, event: string) {
        socket.on(event, async (payload) => {
            try {
                const nombre = event.split("_")[3];
                const date = new Date();

                // Obtener la fecha y hora local
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes de 0 a 11
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');

                // Construir la cadena de fecha en formato ISO pero con hora local
                const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
                const existDevice = await prisma.dispositivo.findUnique({ where: { nombre } });
                if (!existDevice) return;
                const device = await prisma.dispositivo.update({
                    where: { nombre: existDevice.nombre },
                    data: {
                        estado: !existDevice.estado,
                        ultimaActualizacion: formattedDate,
                    }
                });

                console.log({
                    event,
                    device,
                });


                await prisma.evento.create({
                    data: {
                        accion: payload,
                        fecha: formattedDate,
                        id_dispositivo: device.id,
                    }
                })

                const pub = mqtt.connect(this.mqttUrl);
                await pub.publishAsync(event, JSON.stringify(device));
                pub.end();
            } catch (error) {
                console.log(error);

            }
        })
    }

    private getDb(socket: SocketClient, event: string) {
        socket.on(event, async (payload) => {

            const deviceName = event.split("_")[3];
            const info = await prisma.dispositivo.findUnique({ where: { nombre: deviceName } });
            socket.emit(`LED_SEND_INFO_${deviceName}`, JSON.stringify(info));
        })
    }

    private getEvents(socket: SocketClient, event: string) {
        socket.on(event, async (payload) => {
            const deviceName = event.split("_")[3];
            const device = await prisma.dispositivo.findUnique({ where: { nombre: deviceName } })
            if (!device) return;
            const events = await prisma.evento.findMany({
                where: { id_dispositivo: device.id }
            });

            console.log(JSON.stringify(events));
            socket.emit(`LED_SEND_EVENTS_${deviceName}`, JSON.stringify(events))
        })
    }

    private setDb(socket: SocketClient, event: string) {
        socket.on(event, async (payload) => {
            try {
                console.log(payload);

                const data = JSON.parse(payload) as ChangeDataDevice;
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

                console.log({
                    event,
                    result,
                });

                const pub = mqtt.connect(this.mqttUrl);
                await pub.publishAsync(event, JSON.stringify(result));
                pub.end();
            } catch (error) {
                console.log(error);

            }

        });
    }
}