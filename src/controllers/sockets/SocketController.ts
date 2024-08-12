import { Server, Socket } from "socket.io";
import mqtt from 'mqtt';
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Dispositivos } from "../../config/enums";
import { prisma } from "../../data/mysql";

type SocketClient = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export class SocketController {
    constructor(
        private readonly socketServer: Server,
        private readonly mqttUrl: string,
    ) { }

    public async listen() {
        this.socketServer.on("connection", (socket) => {

            Object.keys(Dispositivos).forEach(key => {
                this.get(socket, `LED_GET_ESTADO_${key}`);
            });

            Object.keys(Dispositivos).forEach(key => {
                this.set(socket, `LED_SET_ESTADO_${key}`);
            });


        });
    }

    private get(socket: SocketClient, event: string) {
        socket.on(event, async (payload) => {
            console.log(event, payload);

            const pub = mqtt.connect(this.mqttUrl);
            await pub.publishAsync(event, (payload) ? payload : "");
            pub.end();
        })
    }

    private set(socket: SocketClient, event: string) {

        socket.on(event, async (payload) => {
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
            await prisma.dispositivo.update({
                where: { nombre },
                data: {
                    estado: payload === "true",
                    ultimaActualizacion: formattedDate,
                }
            })

            const pub = mqtt.connect(this.mqttUrl);
            await pub.publishAsync(event, (payload) ? payload : "");
            pub.end();
        })
    }
}