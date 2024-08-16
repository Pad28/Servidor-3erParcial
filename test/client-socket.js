const io = require("socket.io-client");

// const socket = io("https://ede7-187-154-224-176.ngrok-free.app");
const socket = io("http://localhost:8080");

socket.emit(`LED_SOCKET_CHANGE_DB`, JSON.stringify({
    dispositivo: "ALARMA",
    columna: "descripcion",
    valor: "test",
    tipo: "string"
}));
// socket.on("LED_SEND_ESTADO_PERCIANAS", (payload => {
//     console.log(payload);
//     socket.disconnect()
// }))
