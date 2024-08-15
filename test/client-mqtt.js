const mqtt = require("mqtt");

const topic_subscribe = "LED_SEND_DB_ALARMA";
const topic_publish = "LED_GET_DB_ALARMA";
const payload = "";

const client = mqtt.connect("mqtt://isistemas.upt.edu.mx:22245");
// const client = mqtt.connect("mqtt://localhost:8085");
client.on("connect", () => {
    client.subscribe(topic_subscribe);
    client.publish(topic_publish, payload);
});

client.on("message", (topic, payload) => {

    if (topic === topic_subscribe) {
        console.log(JSON.parse(payload.toString()));

    }
})