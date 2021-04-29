<template>
    <div class="grafico">
        <div class="relativo" :class="'hover-'+idSeleccionado">
            <transition name="ocultar-muy-corto" mode="out-in">
                <div v-if="idSeleccionado === ''" />
                <imagen-divisa v-else :id-divisa="idSeleccionado" tam="50" :key="idSeleccionado"/>
            </transition>
            <grafico-tarta class="altura" :chart-data="getDatosGrafica" @hover="hoverGrafico" @click="clickGrafico"/>
        </div>
        <p class="descripcion">
            <transition name="ocultar-muy-corto" mode="out-in">
                <span v-if="idSeleccionado===''" key="sin">Activos de tu cartera</span>
                <span v-else :key="idSeleccionado">{{getNombre(idSeleccionado)}}: <numero negrita :valor="getValorCartera(idSeleccionado)"/></span>
            </transition>
        </p>
    </div>
</template>

<script>
import GraficoTarta from "@/components/graficos/GraficoTarta";
import {mapGetters} from "vuex";
import ImagenDivisa from "@/components/ImagenDivisa";
import Numero from "@/components/Numero";
export default {
    name: "GraficoCarteras",
    components: {Numero, ImagenDivisa, GraficoTarta},
    data(){
        return{
            idSeleccionado:""
        }
    },
    methods:{
        hoverGrafico(id){
            if(this.idSeleccionado!==id){
                this.idSeleccionado = id;
            }
        },
        clickGrafico(id){
            this.idSeleccionado = id;
        }
    },
    computed:{
        ...mapGetters(['getValorCartera','getIdsDivisa','getColorDivisa','getNombre','getSimbolo']),
        getDatosGrafica() {

            let fondo = getComputedStyle(document.body).getPropertyValue('--fondo');

            let datosGrafica = {
                labels: [],
                datasets: [
                    {
                        data: [],
                        label: "Precio",
                        borderColor:fondo,
                        hoverBorderColor:[],
                        backgroundColor:[],
                        hoverBackgroundColor:[],
                        borderWidth:2,
                        borderAlign:'inner',
                        ids:[]
                    },
                ]
            };

            this.getIdsDivisa.forEach(id=>{

                let precio = this.getValorCartera(id);

                if(precio===0)
                    return

                let color = this.getColorDivisa(id);

                datosGrafica.labels.push(this.getNombre(id));
                datosGrafica.datasets[0].data.push(precio);
                datosGrafica.datasets[0].backgroundColor.push(color);
                datosGrafica.datasets[0].hoverBorderColor.push(color);
                datosGrafica.datasets[0].hoverBackgroundColor.push(color);
                datosGrafica.datasets[0].ids.push(id);

            });

            return datosGrafica;
        }
    }
}
</script>

<style scoped lang="sass">

.grafico
  margin-top: $margen
  overflow: hidden

.altura
  height: 200px
  z-index: 3

.descripcion
  text-align: center
  margin-top: $margen

.relativo
  position: relative

  &:not(.hover-)
    cursor: pointer

.imagen-divisa
  top: 50%
  left: 50%
  position: absolute
  transform: translate(-50%,-50%)
  z-index: 1

</style>