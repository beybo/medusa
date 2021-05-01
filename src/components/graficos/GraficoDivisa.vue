<template>
    <div class="contenedor-grafico">
        <div class="grafico">
            <numero :style="porcenataje(pos('max'))" :valor="getPrecio(pos('max'))" animar/>
            <grafico-lineas class="altura" :chart-data="getDatosGrafica"/>
            <numero class="minimo" :style="porcenataje(pos('min'))" :valor="getPrecio(pos('min'))" animar/>
        </div>
        <div class="fila botones">
            <button class="btn-transparente" :style="estiloBoton('dia')" @click="modo = 'dia'">24h</button>
            <button class="btn-transparente" :style="estiloBoton('semana')" @click="modo = 'semana'">7d</button>
            <button class="btn-transparente" :style="estiloBoton('mes')" @click="modo = 'mes'">30d</button>
        </div>
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
        idDivisa:String,
    },
    data(){
        return {
            max:0,
            min:0,
            modo:"mes"
        }
    },
    computed: {
        ...mapGetters(['getDivisa','getColorDivisa']),

        estiloBoton(){
            let color = this.getColorDivisa(this.idDivisa);
            let modo = this.modo;
            return (modoBoton)=>{
                return {
                    color,
                    opacity: modo===modoBoton ? 1 : 0.4
                }
            }
        },

        pos(state){

            let franja = this.modo;

            return (modo) => {

                let precios = state.getDivisa(state.idDivisa).precios[franja];

                if(modo === 'max'){
                    return precios.reduce((max,act,pos) => act[1] > precios[max][1] ? pos : max,0);
                }

                return precios.reduce((min,act,pos) => act[1] < precios[min][1] ? pos : min,0);

            }
        },

        getPrecio(state){

            let franja = this.modo;

            return (posicion) => {
                return state.getDivisa(state.idDivisa).precios[franja][posicion][1];
            }
        },

        porcenataje(state){

            let franja = this.modo;

            return (posicion) =>{

                let precios  = state.getDivisa(state.idDivisa).precios[franja];

                let porcentaje = (posicion / precios.length) * 100;

                let restar = precios[posicion][1].toFixed(2).toString().length;

                if(porcentaje+restar>97){
                    restar *= 1.5;
                }

                if(porcentaje<5){
                    restar *= .5;
                }

                porcentaje = porcentaje.toFixed(2)-restar;

                return `left: ${porcentaje}%;`
            }
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

            let f = new Intl.DateTimeFormat('default',{
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit',
                hour12: false,
            });

            let precios = divisa.precios[this.modo];

            precios.forEach((precio)=>{

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

.contenedor-grafico
  width: 100%

.grafico
  position: relative
  margin: $margen-grafico 0
  width: 100%

.altura
  height: calc(250px - #{$margen-grafico * 2})
  width: 100%

.dinero
  position: absolute
  top: -20px
  font-size: 0.9rem

  &.minimo
    top: auto
    bottom: -20px

.botones
  width: 100%
  justify-content: space-around
  margin-top: $margen * 3

@media (max-width: $mobile)

  .altura
    height: 200px

  .grafico
    width: 100%

</style>