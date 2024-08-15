const mqtt = require("mqtt");

// console.log(JSON.stringify({
//     dispositivo: "TINACO",
//     columna: "nivel_agua",
//     valor: "20.1",
//     tipo: "float",
// }, null, 5));


const client = mqtt.connect("mqtt://localhost:8085");
client.on("connect", () => {
    client.subscribe("LED_SEND_DB_ALARMA");
    client.publish("LED_GET_DB_ALARMA", "");
});

client.on("message", (topic, payload) => {
    console.log(topic);

    if (topic === "LED_SEND_DB_ALARMA") {
        console.log(payload.toString());

    }
})