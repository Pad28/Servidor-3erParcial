import { createServer, Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

import express, { Application, Router } from 'express';
import mosca from 'mosca';
import cors from 'cors';
import compression from 'compression';
import { SocketController } from '../controllers/sockets/SocketController';
import { MqttController } from '../controllers/mqtt/MqttController';


interface ServerOptions {
    portMqtt: number;
    portApi: number;
    routes: Router;
}

export class Server {

    private readonly app: Application;

    private readonly server: HttpServer;
    private readonly socketServer: SocketIOServer;
    private readonly broker: mosca.Server;

    constructor(
        private readonly options: ServerOptions
    ) {
        this.app = express();
        this.server = createServer(this.app);
        this.socketServer = new SocketIOServer(this.server);
        this.broker = new mosca.Server({ port: options.portMqtt });

    }

    public async start() {

        // Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(cors());
        this.app.use(compression());

        this.app.use(this.options.routes);
        this.app.get('*', (req, res) => {
            res.status(404).send("<h1>404 | Not found</h1>")
        });

        this.server.listen(this.options.portApi, () => {
            console.log(`Server listening in port ${this.options.portApi}`);
        });

        new SocketController(this.socketServer, `mqtt://localhost:${this.options.portMqtt}`)
            .listen();

        new MqttController(this.broker, this.socketServer, `mqtt://localhost:${this.options.portMqtt}`)
            .listen();
    }
}


