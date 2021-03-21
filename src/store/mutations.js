export let mutations = {

    // Sockets

    SOCKET_inicio(state, datos) {
        console.log(JSON.parse(JSON.stringify(datos)))
        state.conectado = true;
        state.usuario = {...datos.usuario};
        state.divisas = {...datos.divisas};
    },
    SOCKET_precio(state, params) {
        state.divisas[params[0]].precio = params[1];
    }
}