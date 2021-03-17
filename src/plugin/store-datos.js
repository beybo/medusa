import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let modeloCripto = {
    image: "",
    name:"",
    precio:{
        fecha:"",
        valor:null
    },
    precios:[],
    symbol:""
}

let divisas = ["bitcoin","cardano","chainlink","ethereum","litecoin","polkadot","ripple","uniswap"];

let modeloDivisas = divisas.reduce((acumulador,divisa)=>{
    acumulador[divisa] = JSON.parse(JSON.stringify(modeloCripto));
    return acumulador;
},{});

export const store = new Vuex.Store({
    state:{
        usuario:{
            id_google:'',
            nombre: '',
            email: '',
            cartera:[],
            transacciones:[]
        },
        divisas:modeloDivisas
    },
    mutations:{
        SOCKET_inicio(state, datos){
            console.log(JSON.parse(JSON.stringify(datos)))
            state.usuario = {...datos.usuario};
            state.divisas = {...datos.divisas};
        },
        SOCKET_precio(state, params){
            state.divisas[params[0]].precio = params[1];
        },
    },
    getters:{
        getCartera(state){
            return state.usuario.cartera;
        },
        getNombre(state){
            return state.usuario.nombre;
        },
        getPrecio:(state) => (id,formatear = true) =>{
            let valor = state.divisas[id].precio.valor;
            return formatear ? formatearDinero(valor) : valor;
        },
        getValorCartera:(state) => (id) => {
            let valor = state.usuario.cartera.filter(c => c.id_divisa === id);
            return valor.length > 0 ? valor[0].cantidad : 0;
        }
    }
});

function formatearDinero(valor){
    let formatter = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    });

    return formatter.format(valor);
}