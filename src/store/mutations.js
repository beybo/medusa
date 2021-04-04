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
        state.divisas[params[0]].precio = params[1];
    }
}