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
Object.defineProperty(exports, "__esModule", { value: true });
const envs_1 = require("./config/envs");
const mysql_1 = require("./data/mysql");
const server_1 = require("./models/server");
const routes_1 = require("./routes/routes");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mysql_1.connectionDB)();
    const server = new server_1.Server({
        portApi: envs_1.envs.PORT_API,
        portMqtt: envs_1.envs.PORT_MQTT,
        routes: routes_1.AppRoutes.routes
    });
    server.start();
}))();
