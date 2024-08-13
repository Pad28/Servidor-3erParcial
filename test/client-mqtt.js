const mqtt = require("mqtt");

console.log(JSON.stringify({
    dispositivo: "TINACO",
    columna: "nivel_agua",
    valor: "20.1",
    tipo: "float",
}, null, 5));


const client = mqtt.connect("mqtt://localhost:8085");
client.on("connect", () => {
    client.publish("LED_CHANGE_DB", JSON.stringify({
        dispositivo: "TINACO",
        columna: "nivel_agua",
        valor: "20.1",
        tipo: "float",
    }));
});

client.on("message", (topic, payload) => {
    if (topic === "LED_GET_ESTADO_ALARMA") {
        client.publish("LED_SEND_ESTADO_ALARMA", "true");
    }
})