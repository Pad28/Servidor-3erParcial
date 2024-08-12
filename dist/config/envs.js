"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT_API: (0, env_var_1.get)("PORT_API").required().asPortNumber(),
    PORT_MQTT: (0, env_var_1.get)("PORT_MQTT").required().asPortNumber(),
    DATABASE_URL: (0, env_var_1.get)('DATABASE_URL').required().asString(),
};
