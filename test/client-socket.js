const io = require("socket.io-client");

const socket = io("http://localhost:8080");

socket.emit(process.argv[2], process.argv[3]);
socket.on("LED_SEND_INFO_ALARMA", (payload => console.log(payload)))