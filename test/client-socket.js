const io = require("socket.io-client");

const socket = io("https://ede7-187-154-224-176.ngrok-free.app");
// const socket = io("http://localhost:8080");


// socket.emit(`LED_SOCKET_CHANGE_DB`, JSON.stringify({
//     dispositivo: "ALARMA",
//     columna: "descripcion",
//     valor: "test2",
//     tipo: "string"
// }));

socket.emit("LED_GET_EVENTS_PERCIANAS")
socket.on("LED_SEND_EVENTS_PERCIANAS", (payload => {
    console.log(payload);
    socket.disconnect();
}))

// socket.emit("LED_GET_EVENTS_PERCIANAS")
// socket.disconnect()