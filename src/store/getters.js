export let getters = {

    // Getters del estado

    conectado(state){
        return state.conectado;
    },

    // Getters de Usuario

    getNombreUsuario(state) {
        return state.usuario.nombre;
    },

    // Getters de divisas

    getDivisas(state) {
        return state.divisas;
    },
    getIdsDivisa(state) {
        return Object.keys(state.divisas);
    },
    getDivisa: (state) => (id) => {
        return state.divisas[id];
    },
    getPrecioValor: (state) => (id) => {
        return state.divisas[id].precio.valor;
    },
    getPrecioCambio: (state) => (id) => {
        return state.divisas[id].precio.cambio;
    },
    getSimbolo:(state) => (id) => {
        return state.divisas[id].simbolo.toUpperCase();
    },

    // Getters de Cartera

    getCarteras(state) {
        return state.usuario.cartera;
    },
    getIdsCartera(state) {
        return Object.keys(state.usuario.cartera);
    },
    getCartera: (state) => (id) => {
        return state.usuario.cartera[id];
    },
    getValorCartera: (state, getters) => (id) => {
        let divisa = getters.getDivisa(id);
        return getters.getCartera(id).cantidad * (id === "fiat" ? 1 : divisa.precio.valor);
    }
}

