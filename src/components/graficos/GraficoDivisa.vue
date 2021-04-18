<template>
    <div class="grafico">
        <numero :style="porcenataje(pos('max'))" :valor="getPrecio(pos('max'))" animar/>
        <grafico-lineas class="altura" :chart-data="getDatosGrafica"/>
        <numero class="minimo" :style="porcenataje(pos('min'))" :valor="getPrecio(pos('min'))" animar/>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import GraficoLineas from "@/components/graficos/GraficoLineas";
import Numero from "@/components/Numero";

export default {
    name: "GraficoDivisa",
    components: {Numero, GraficoLineas},
    props:{
        idDivisa:String
    },
    data(){
        return {
            max:0,
            min:0
        }
    },
    computed: {
        ...mapGetters(['getDivisa','getColorDivisa']),

        pos: (state) => (modo) => {

            let precios = state.getDivisa(state.idDivisa).precios;

            if(modo === 'max'){
                return precios.reduce((max,act,pos) => act[1] > precios[max][1] ? pos : max,0);
            }

            return precios.reduce((min,act,pos) => act[1] < precios[min][1] ? pos : min,0);

        },

        getPrecio: (state) => (posicion) => {
            return state.getDivisa(state.idDivisa).precios[posicion][1];
        },

        porcenataje: (state) => (posicion) =>{

            let precios  = state.getDivisa(state.idDivisa).precios;

            let porcentaje = (posicion / precios.length) * 100;

            let restar = precios[posicion][1].toFixed(2).toString().length;

            if(porcentaje+restar>99){
                restar *= 1.5;
            }


            if(porcentaje<2){
                restar *= .5;
            }

            porcentaje = porcentaje.toFixed(2)-restar;

            return `left: ${porcentaje}%;`
        },

        getDatosGrafica(){

            let divisa = this.getDivisa(this.idDivisa),
                color = this.getColorDivisa(this.idDivisa);

            let datosGrafica = {
                labels: [],
                datasets: [
                    {
                        data: [],
                        label: "Precio",
                        borderColor: color,
                        borderJoinStyle: 'round',
                        borderCapStyle: 'round',
                        borderWidth: 3,
                        pointRadius: 0,
                        pointHitRadius: 10,
                        lineTension: .2,
                        backgroundColor:"transparent"
                    },
                ]
            };

            let min = 0,
                max = 0;

            divisa.precios.forEach((precio)=>{

                let f = new Intl.DateTimeFormat('default',{
                    year: 'numeric', month: '2-digit', day: '2-digit',
                    hour: '2-digit', minute: '2-digit',
                    hour12: false,
                });

                let fecha = f.format(new Date(precio[0]));

                datosGrafica.labels.push(fecha);
                datosGrafica.datasets[0].data.push(precio[1]);

                if(min === 0 && max === 0){
                    min = precio[1];
                    max = precio[1];
                }

                if (precio[1] < min){
                    min = precio[1];
                }

                if(precio[1] > max){
                    max = precio[1];
                }

            });

            datosGrafica.max = max;
            datosGrafica.min = min;

            return datosGrafica;

        }

    }
}
</script>

<style scoped lang="sass">

$margen-grafico: 20px

.grafico
  position: relative
  margin: $margen-grafico

.altura
  height: 100%

.dinero
  position: absolute
  top: -20px
  font-size: 0.9rem

  &.minimo
    top: auto
    bottom: -20px

</style>