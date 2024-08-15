const io = require("socket.io-client");

// const socket = io("https://ede7-187-154-224-176.ngrok-free.app");
const socket = io("http://localhost:8080");

socket.emit(process.argv[2], process.argv[3]);
socket.on("LED_SEND_ESTADO_PERCIANAS", (payload => {
    console.log(payload);
    socket.disconnect()
}))
