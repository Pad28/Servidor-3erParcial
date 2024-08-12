import { envs } from "./config/envs";
import { connectionDB } from "./data/mysql";
import { Server } from "./models/server";
import { AppRoutes } from "./routes/routes";



(async () => {
    await connectionDB();

    const server = new Server({
        portApi: envs.PORT_API,
        portMqtt: envs.PORT_MQTT,
        routes: AppRoutes.routes
    });

    server.start();
})();


