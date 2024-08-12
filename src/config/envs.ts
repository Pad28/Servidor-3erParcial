import 'dotenv/config';
import { get } from "env-var";

export const envs = {
    PORT_API: get("PORT_API").required().asPortNumber(),
    PORT_MQTT: get("PORT_MQTT").required().asPortNumber(),
    DATABASE_URL: get('DATABASE_URL').required().asString(),
}

