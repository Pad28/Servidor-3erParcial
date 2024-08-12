const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://localhost:8085");
client.on("connect", () => {
    client.subscribe("SEND_TENDEDERO");
    client.publish("GET_TENDEDERO", "payload_test");
});

client.on("message", (topic, payload) => {
    console.log(topic, payload.toString());

})