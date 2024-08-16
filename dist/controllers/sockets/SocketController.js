"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketController = void 0;
const mqtt_1 = __importDefault(require("mqtt"));
const enums_1 = require("../../config/enums");
const mysql_1 = require("../../data/mysql");
class SocketController {
    constructor(socketServer, mqttUrl) {
        this.socketServer = socketServer;
        this.mqttUrl = mqttUrl;
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            this.socketServer.on("connection", (socket) => {
                // Pedir estado actual del dispositivo
                Object.keys(enums_1.Dispositivos).forEach(key => {
                    this.get(socket, `LED_GET_ESTADO_${key}`);
                });
                // Pedir informacion del dispositivo desde la base de datos, envia la informacion en formato JSON
                // Evento para recibir la informacion LED_SEND_INFO_[nombre del dispositivo]
                Object.keys(enums_1.Dispositivos).forEach(key => {
                    this.getDb(socket, `LED_GET_INFO_${key}`);
                });
                // Invierte el estado del dispositivo(true/false), como payload recibe uno de estos valores:
                //   ENCENDIDO
                //   APAGADO
                //   ABIERTO
                //   CERRADO
                // El MQTT tiene que estar subscrito a un topic con el mismo nombre
                Object.keys(enums_1.Dispositivos).forEach(key => {
                    this.set(socket, `LED_SET_ESTADO_${key}`);
                });
                // Pedir el historial de eventos de un dispisitivo
                // Evento para recibir la informacion LED_SEND_EVENTS_[nombre del dispositivo]
                Object.keys(enums_1.Dispositivos).forEach(key => {
                    this.getEvents(socket, `LED_GET_EVENTS_${key}`);
                });
                // Cambiar una columan de la base de datos desde websocket LED_SOCKET_CHANGE_DB
                this.setDb(socket, `LED_SOCKET_CHANGE_DB`);
            });
        });
    }
    get(socket, event) {
        socket.on(event, (payload) => __awaiter(this, void 0, void 0, function* () {
            const pub = mqtt_1.default.connect(this.mqttUrl);
            yield pub.publishAsync(event, (payload) ? payload : "");
            pub.end();
        }));
    }
    set(socket, event) {
        socket.on(event, (payload) => __awaiter(this, void 0, void 0, function* () {
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
                const existDevice = yield mysql_1.prisma.dispositivo.findUnique({ where: { nombre } });
                if (!existDevice)
                    return;
                const device = yield mysql_1.prisma.dispositivo.update({
                    where: { nombre: existDevice.nombre },
                    data: {
                        estado: !existDevice.estado,
                        ultimaActualizacion: formattedDate,
                    }
                });
                yield mysql_1.prisma.evento.create({
                    data: {
                        accion: payload,
                        fecha: formattedDate,
                        id_dispositivo: device.id,
                    }
                });
                const pub = mqtt_1.default.connect(this.mqttUrl);
                yield pub.publishAsync(event, (payload) ? payload : "");
                pub.end();
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
    getDb(socket, event) {
        socket.on(event, (payload) => __awaiter(this, void 0, void 0, function* () {
            const deviceName = event.split("_")[3];
            const info = yield mysql_1.prisma.dispositivo.findUnique({ where: { nombre: deviceName } });
            socket.emit(`LED_SEND_INFO_${deviceName}`, JSON.stringify(info));
        }));
    }
    getEvents(socket, event) {
        socket.on(event, (payload) => __awaiter(this, void 0, void 0, function* () {
            const deviceName = event.split("_")[3];
            const device = yield mysql_1.prisma.dispositivo.findUnique({ where: { nombre: deviceName } });
            if (!device)
                return;
            const events = yield mysql_1.prisma.evento.findMany({
                where: { id_dispositivo: device.id }
            });
            socket.emit(`LED_SEND_EVENTS_${deviceName}`, JSON.stringify(events));
        }));
    }
    setDb(socket, event) {
        socket.on(event, (payload) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = JSON.parse(payload);
                const newValue = (data.tipo === "number")
                    ? parseInt(data.valor)
                    : (data.tipo === "float")
                        ? parseFloat(data.valor)
                        : (data.tipo === "boolean")
                            ? data.valor === "true"
                            : data.valor;
                const result = yield mysql_1.prisma.dispositivo.update({
                    where: { nombre: data.dispositivo },
                    data: {
                        [data.columna]: newValue
                    }
                });
                console.log({
                    event,
                    result,
                });
                const pub = mqtt_1.default.connect(this.mqttUrl);
                yield pub.publishAsync(event, JSON.stringify(result));
                pub.end();
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
}
exports.SocketController = SocketController;
