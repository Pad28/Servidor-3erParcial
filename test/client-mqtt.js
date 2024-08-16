const mqtt = require("mqtt");

const topic_subscribe = "LED_SEND_EVENTS_PERCIANAS";
const topic_publish = "LED_GET_ESTADO_ALARMA";
const payload = "";

const client = mqtt.connect("mqtt://187.141.55.141:22245");
console.log("Ok");

// const client = mqtt.connect("mqtt://localhost:8085");
client.on("connect", () => {
    const aux = client.subscribe(topic_subscribe);
    console.log(aux);

    // client.publish(topic_publish, payload);
});

client.on("message", (topic, payload) => {
    console.log(payload.toString());
    client.end();
})