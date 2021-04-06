export let mutations = {

    // Tema

    cambiar_tema(state,tema){
        state.tema = tema;
    },

    // Cargar
    set_cargando(state,cargando){
      state.cargando = cargando;
    },

    //Conectado
    set_conectado(state,conectado){
        state.conectado = conectado;
    },

    // Transacciones
    nueva_transaccion(state,transacciones){

        console.log(transacciones);

        Object.keys(transacciones).forEach(divisa => {

            let transaccion = transacciones[divisa];

            state.usuario.cartera[divisa].transacciones.push(transaccion);

            state.usuario.cartera[divisa].cantidad += (transaccion.tipo ==="compra" ? 1 : -1) *  transaccion.cantidad;

        });

    },

    // Sockets

    SOCKET_inicio(state, datos) {
        console.log(JSON.parse(JSON.stringify(datos)))
        state.conectado = true;
        state.usuario = {...datos.usuario};
        state.divisas = {...datos.divisas};
    },

    SOCKET_divisas(state,divisas){
        state.divisas = {...divisas};
    },

    SOCKET_precio(state, params) {
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