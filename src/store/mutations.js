export let mutations = {

    // Tema

    CAMBIAR_TEMA(state, tema){
        state.tema = tema;
    },

    // Cargar
    SET_CARGANDO(state, cargando){
      state.cargando = cargando;
    },

    //Conectado
    SET_CONECTADO(state, conectado){
        state.conectado = conectado;
    },

    // Transacciones
    NUEVA_TRANSACCION(state, transacciones){

        console.log(transacciones);

        Object.keys(transacciones).forEach(divisa => {

            let transaccion = transacciones[divisa];

            state.usuario.cartera[divisa].transacciones.push(transaccion);

            state.usuario.cartera[divisa].cantidad += (transaccion.tipo ==="compra" ? 1 : -1) *  transaccion.cantidad;

        });

    },


    // Sockets
    SOCKET_TRANSACCION:(state,transacciones)=>{
        Object.keys(transacciones).forEach(divisa => {

            let transaccion = transacciones[divisa];

            state.usuario.cartera[divisa].transacciones.push(transaccion);

            state.usuario.cartera[divisa].cantidad += (transaccion.tipo ==="compra" ? 1 : -1) *  transaccion.cantidad;

        });
    },

    SOCKET_INICIO(state, datos) {
        console.log(JSON.parse(JSON.stringify(datos)))
        state.conectado = true;
        state.usuario = {...datos.usuario};
        state.divisas = {...datos.divisas};
    },

    SOCKET_DIVISAS(state,divisas){
        state.divisas = {...divisas};
    },

    SOCKET_PRECIO(state, params) {
        let divisa = state.divisas[params[0]];

        divisa.precio = params[1];

        let ultFecha = divisa.precios[divisa.precios.length-1][0];

        // Eliminamos el primer valor del array si hay una diferencia de más de ~4 minutos
        // Esto lo hacemos para que en el array que tiene el servidor con los último precios,
        // solo estén las últimas 24h
        let fechaNueva = divisa.precio.fecha;
        if(fechaNueva-ultFecha > 250000){
            divisa.precios.splice(0,1).push([fechaNueva,divisa.precio.valor]);
        }

    }
}