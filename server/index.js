const config = require("../app-config");

const server = require('http').createServer();
const io = require('socket.io')(server,{
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        credentials:true
    }
});

io.on('connection', socket => {

    console.log("SE HA CONECTADO");

    setTimeout(()=>{socket.emit("moneda","Uhhhh funciona")},100);


});

server.listen(config.servidor.puerto);

console.log("Escuchando en: "+config.servidor.puerto)