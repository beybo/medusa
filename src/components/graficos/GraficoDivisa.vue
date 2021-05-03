<template>
    <div class="contenedor-grafico">
        <div class="grafico">
            <numero :style="porcentaje(pos('max'))" :valor="getPrecio(pos('max'))" animar/>
            <grafico-lineas class="altura" :chart-data="getDatosGrafica"/>
            <numero class="minimo" :style="porcentaje(pos('min'))" :valor="getPrecio(pos('min'))" animar/>
        </div>
        <div class="fila botones">
            <button class="btn-grafico" :class="{active:modo ==='dia'}" :style="estiloBoton('dia')" @click="modo = 'dia'">24h</button>
            <button class="btn-grafico" :class="{active:modo ==='semana'}" :style="estiloBoton('semana')" @click="modo = 'semana'">7d</button>
            <button class="btn-grafico" :class="{active:modo ==='mes'}" :style="estiloBoton('mes')" @click="modo = 'mes'">30d</button>
            <div class="marcador"></div>
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
            modo:"dia"
        }
    },
    computed: {
        ...mapGetters(['getDivisa','getColorDivisa']),

        estiloBoton(){
            let color = this.getColorDivisa(this.idDivisa);
            let modo = this.modo;
            return (modoBoton)=>{
                return {
                    color:modo===modoBoton ? color : "var(--letra)"
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

        porcentaje(state){

            let franja = this.modo;

            return (posicion) =>{

                let precios  = state.getDivisa(state.idDivisa).precios[franja];

                let porcentaje = (posicion / precios.length) * 100;

                let numChars = precios[posicion][1].toFixed(2).toString().length;

                let restar = (16 + (7.5*numChars)) / 2;


                if(porcentaje <= numChars/2){
                    restar = numChars * (numChars/4);
                }

                if(porcentaje >=98){
                    restar *= 1.2;
                }

                porcentaje = this.$helpers.truncarDecimales(porcentaje);

                restar = this.$helpers.truncarDecimales(restar,0);

                return {
                    left: `min(max(5px,${porcentaje}% - ${restar}px),100% - ${numChars * 8}px)`
                }
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
  transition: left $tiempo-transicion linear

  &.minimo
    top: auto
    bottom: -20px

.botones
  width: 100%
  justify-content: space-around
  margin-top: $margen * 3
  position: relative

  .marcador
    width: 40px
    padding: 10px
    height: 20px
    border-radius: $radio-borde-boton
    box-shadow: var(--sombra-interior)
    position: absolute
    left: 0
    transition: left $tiempo-transicion-c linear
    transform: translateX(-50%)

  $long: 16.66%

  .btn-grafico:nth-child(1).active ~ .marcador
    left: $long

  .btn-grafico:nth-child(2).active ~ .marcador
    left: 50%

  .btn-grafico:nth-child(3).active ~ .marcador
    left: 50% + ($long * 2)



.btn-grafico
  background: 0
  font-family: $fuente
  font-weight: bold
  border: 0
  font-size: 1.2em
  cursor: pointer
  transition: all $tiempo-transicion-c linear
  width: 55px
  padding: 10px
  text-align: center
  opacity: 0.5

  &:hover
    opacity: 1
    color: inherit

  &.active
    opacity: 1

@media (max-width: $mobile)

  .altura
    height: 200px

  .grafico
    width: 100%

</style>