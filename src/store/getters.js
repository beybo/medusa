export let getters = {

    // Getters de estado

    getConectado: (state) => state.conectado,
    getCargando: (state) => state.cargando,
    getTema: (state) => state.tema,

    // Getters de Usuario

    getNombreUsuario: (state) => state.usuario.nombre,

    // Getters de divisas

    getDivisas: (state) => state.divisas,

    getIdsDivisa: state => Object.keys(state.divisas),

    getDivisa: (state) => (id) => state.divisas[id],

    getPrecioValor: (state) => (id) => state.divisas[id].precio.valor,

    getPrecioCambio: (state) => (id) => state.divisas[id].precio.cambio,

    getSimbolo: (state) => (id) => state.divisas[id].simbolo.toUpperCase(),

    // Getters de Cartera

    getCarteras: state => state.usuario.cartera,

    getIdsCartera: state => Object.keys(state.usuario.cartera),

    getCartera: (state) => (id) => state.usuario.cartera[id],

    getValorCartera: (state, getters) => (id) => getters.getCartera(id).cantidad * (id==='fiat' ? 1 : getters.getDivisa(id).precio.valor),

    getCantidadCartera: (state,getters) => (id) => getters.getCartera(id).cantidad,

    getCantidadFiat : (state,getters) => getters.getCartera('fiat').cantidad,
}

