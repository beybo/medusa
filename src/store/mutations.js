import {LTTB} from "downsample";

const TOLERANCIA = 190;

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

        state.usuario.cartera.fiat.cantidad -= transacciones.fiat.comision;

    },

    // Ranking
    RANKING(state, ranking){
        this.state.ranking = {...ranking};
    },


    // Sockets
    SOCKET_TRANSACCION:(state,transacciones)=>{
        Object.keys(transacciones).forEach(divisa => {

            let transaccion = transacciones[divisa];

            state.usuario.cartera[divisa].transacciones.push(transaccion);

            state.usuario.cartera[divisa].cantidad += (transaccion.tipo ==="compra" ? 1 : -1) *  transaccion.cantidad;

        });

        state.usuario.cartera.fiat.cantidad -= transacciones.fiat.comision;

    },

    SOCKET_INICIO(state, datos) {
        console.log(JSON.parse(JSON.stringify(datos)))

        state.usuario = {...datos.usuario};

        if(!datos.divisas.precio){
            state.divisas = {...datos.divisas};
            state.conectado = true;

            Object.keys(state.divisas).forEach(id=>{
                let precios = state.divisas[id].precios;
                ["dia","semana","mes"].forEach(modo=>{
                    precios[modo] = LTTB(precios[modo],TOLERANCIA);
                })
            });

        }

    },

    SOCKET_DIVISAS(state,divisas){
        state.divisas = {...divisas};
        state.conectado = true;

        Object.keys(state.divisas).forEach(id=>{
            let precios = state.divisas[id].precios;

            ["dia","semana","mes"].forEach(modo=>{
                precios[modo] = LTTB(precios[modo],TOLERANCIA);
            })
        });

    },

    SOCKET_PRECIO(state, params) {
        let divisa = state.divisas[params[0]];

        divisa.precio = params[1];

        let fechaNueva = divisa.precio.fecha;
        let precioNuevo = divisa.precio.valor;

        let preciosDia = divisa.precios.dia;
        let preciosSemana = divisa.precios.semana;
        let preciosMes = divisa.precios.mes;

        let ultFechaDia = preciosDia[preciosDia.length-1][0];
        let ultFechaSemana = preciosSemana[preciosSemana.length-1][0];
        let ultFechaMes = preciosMes[preciosMes.length-1][0];

        // Eliminamos el primer valor del array si hay una diferencia de más de ~4 minutos
        // Esto lo hacemos para que en el array que tiene el servidor con los último precios,
        // solo estén las últimas 24h
        if(fechaNueva-ultFechaDia > 250000){
            preciosDia.splice(0,1);
            preciosDia.push([fechaNueva,precioNuevo]);
        }

        if(fechaNueva-ultFechaSemana > 3570000){
            preciosSemana.splice(0,1);
            preciosSemana.push([fechaNueva,precioNuevo]);
        }

        if(fechaNueva-ultFechaMes > 3583600){
            preciosMes.splice(0,1);
            preciosMes.push([fechaNueva,precioNuevo]);
        }

    }
}