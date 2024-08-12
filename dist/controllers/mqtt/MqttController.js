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
exports.MqttController = void 0;
const enums_1 = require("../../config/enums");
const mqtt_1 = __importDefault(require("mqtt"));
const mysql_1 = require("../../data/mysql");
class MqttController {
    constructor(broker, socketServer, mqttUrl) {
        this.broker = broker;
        this.socketServer = socketServer;
        this.mqttUrl = mqttUrl;
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            this.broker.on("ready", () => {
                console.log(`Broker MQTT en puerto ${this.broker.opts.port}`);
                this.broker.on("published", (packet, client) => __awaiter(this, void 0, void 0, function* () {
                    if (Object.keys(enums_1.Events_send_mqtt).includes(packet.topic)) {
                        const payload = packet.payload.toString();
                        this.socketServer.emit(packet.topic, payload);
                    }
                    if (Object.keys(enums_1.Events_get_mqtt).includes(packet.topic)) {
                        const deviceName = packet.topic.split("_")[1];
                        const dispositivo = yield mysql_1.prisma.dispositivo.findUnique({
                            where: { nombre: deviceName }
                        });
                        if (!dispositivo)
                            return;
                        const pub = mqtt_1.default.connect(this.mqttUrl);
                        yield pub.publishAsync(`SEND_${deviceName}`, (dispositivo.estado) ? "true" : "false");
                        yield pub.endAsync();
                    }
                }));
            });
        });
    }
}
exports.MqttController = MqttController;
