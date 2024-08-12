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
exports.Server = void 0;
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const mosca_1 = __importDefault(require("mosca"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const SocketController_1 = require("../controllers/sockets/SocketController");
const MqttController_1 = require("../controllers/mqtt/MqttController");
class Server {
    constructor(options) {
        this.options = options;
        this.app = (0, express_1.default)();
        this.server = (0, http_1.createServer)(this.app);
        this.socketServer = new socket_io_1.Server(this.server);
        this.broker = new mosca_1.default.Server({ port: options.portMqtt });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // Middlewares
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            this.app.use((0, cors_1.default)());
            this.app.use((0, compression_1.default)());
            this.app.use(this.options.routes);
            this.app.get('*', (req, res) => {
                res.status(404).send("<h1>404 | Not found</h1>");
            });
            this.server.listen(this.options.portApi, () => {
                console.log(`Server listening in port ${this.options.portApi}`);
            });
            new SocketController_1.SocketController(this.socketServer, `mqtt://localhost:${this.options.portMqtt}`)
                .listen();
            new MqttController_1.MqttController(this.broker, this.socketServer, `mqtt://localhost:${this.options.portMqtt}`)
                .listen();
        });
    }
}
exports.Server = Server;
