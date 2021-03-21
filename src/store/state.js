let modeloCripto = {
    image: "",
    name: "",
    precio: {
        fecha: "",
        valor: null
    },
    precios: [],
    symbol: ""
}

let divisas = ["bitcoin", "cardano", "chainlink", "ethereum", "litecoin", "polkadot", "ripple", "uniswap"];

let modeloDivisas = divisas.reduce((acumulador, divisa) => {
    acumulador[divisa] = JSON.parse(JSON.stringify(modeloCripto));
    return acumulador;
}, {});

export let state = {
    usuario: {
        id_google: '',
        nombre: '',
        email: '',
        cartera: [],
        transacciones: []
    },
    divisas: modeloDivisas,
    conectado:false
}