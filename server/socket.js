const EMITIR = {
    INICIO:"inicio",
    NUEVO_PRECIO:"precio"
};

module.exports = (http) => {

    const config = require("../app-config");
    const socketioJwt   = require('socketio-jwt');

    const io = require('socket.io')(http,{
        cors: {
            origin: "http://localhost:8080",
            methods: ["GET", "POST"],
            credentials:true
        }
    });

    io.use(socketioJwt.authorize({
        secret: config.servidor.secreto_app,
        handshake: true
    }));

    let funcionesDivisasSocket = {

        divisas:Object,

        setDivisas(divisas) {
            this.divisas = divisas;
        },
        setPrecios(id,precios,emitirAviso){
            this.divisas[id].precios = precios;

            let ultimoPrecio = precios[precios.length-1]

            this.divisas[id].precio = {
                fecha: ultimoPrecio[0],
                valor: ultimoPrecio[1]
            }

            if(emitirAviso===true){
                io.emit(EMITIR.INICIO, this.divisas);
            }

        },

        actualizarPrecios(precios) {

            let ids = Object.keys(precios);

            ids.forEach(id => {

                let precioNuevo = precios[id];
                let fechaNueva = precioNuevo.last_updated_at * 1000;

                let divisa = this.divisas[id];

                if(divisa.precio.fecha < fechaNueva){

                    divisa.precio = {
                        fecha: fechaNueva,
                        valor: precioNuevo.eur
                    }

                    io.emit(EMITIR.NUEVO_PRECIO,id,divisa.precio);

                    let ultFecha = divisa.precios[divisa.precios.length-1][0];

                    // Eliminamos el primer valor del array si hay una diferencia de más de ~4 minutos
                    // Esto lo hacemos para que en el array que tiene el servidor con los último precios,
                    // solo estén las últimas 24h
                    if(fechaNueva-ultFecha > 250000){
                        divisa.precios.splice(0,1).push([fechaNueva,precioNuevo.eur]);
                    }

                }

            });

        }
    };

    io.on('connection', socket => {

        console.log(socket.decoded_token);
        initSocket(socket,funcionesDivisasSocket).catch(err => {
            console.log(err);
        });

    });

    return funcionesDivisasSocket;

}

async function initSocket(socket,funcionesDivisasSocket){

    let divisas = funcionesDivisasSocket.divisas;

    socket.emit(EMITIR.INICIO, {
        usuario:{nombre:"Jorge"},
        divisas:divisas
    });


    console.log(`hello!`);
}