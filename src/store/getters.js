
export let getters = {

    // Getters de Usuario

    getNombre(state){
        return state.usuario.nombre;
    },

    // Getters de divisas

    getDivisas(state){
        return state.divisas;
    },
    getIdsDivisa(state) {
        return Object.keys(state.divisas);
    },
    getDivisa:(state) => (id) => {
        return state.divisas[id];
    },
    getPrecio:(state) => (id) =>{
        return state.divisas[id].precio.valor;
    },

    // Getters de Cartera

    getCarteras(state){
        return state.usuario.cartera;
    },
    getIdsCartera(state){
        return Object.keys(state.usuario.cartera);
    },
    getCartera:(state)=> (id) => {
        return state.usuario.cartera[id];
    },
    getValorCartera:(state,getters) => (id) => {
        let divisa = getters.getDivisa(id);
        return getters.getCartera(id).cantidad * (id==="euros" ? 1 : divisa.precio.valor);
    }
}

