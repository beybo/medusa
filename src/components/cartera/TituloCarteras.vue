<template>
    <div class="caja columna titulo-cartera">

        <div class="fila inicial">

            <font-awesome-icon class="icono-barra" :icon="['fas','chart-pie']" size="lg" @click="mostrarGrafico = !mostrarGrafico"/>

            <div class="columna">
                <h3>Total: <numero animar negrita v-bind:valor="getValorTodasCartera" /></h3>
                <transition name="ocultar-muy-corto" v-if="mostrarGrafico" mode="out-in">
                    <numero tipo="porcentaje" key="grafico" :valor="getPorcentajeTotal" negrita/>
                </transition>
            </div>

            <font-awesome-icon class="icono-barra" :icon="getIconoOrden" size="lg" @click="siguienteOrden"/>

        </div>

        <transition name="altura-corto" v-if="mostrarGrafico">

            <grafico-carteras/>

        </transition>

    </div>
</template>

<script>
import {mapGetters} from "vuex";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faChartPie,faSortAmountDown,faSortAmountUp,faSortAlphaDown,faSortAlphaUp} from '@fortawesome/free-solid-svg-icons';
import Numero from "@/components/Numero";
import GraficoCarteras from "@/components/graficos/GraficoCarteras";

library.add(faChartPie,faSortAmountDown,faSortAmountUp,faSortAlphaDown,faSortAlphaUp)

export default {
    name: "TituloCarteras",
    components: {GraficoCarteras, Numero},
    props:{
        orden:String
    },
    data(){
        return {
            mostrarGrafico:false
        }
    },
    methods:{
        siguienteOrden() {
            this.$emit("siguiente-orden");
        }
    },
    computed: {
        ...mapGetters(['getValorTodasCartera']),
        getPorcentajeTotal(){
            return (this.getValorTodasCartera - 10000) / 10000;
        },
        getIconoOrden(){
            switch (this.orden){
                case "precio":
                    return ['fas','sort-amount-down']
                case "precio-rev":
                    return ['fas','sort-amount-up']
                case "alfabetico":
                    return ['fas','sort-alpha-down']
                case "alfabetico-rev":
                    return ['fas','sort-alpha-up']
            }

            return [];
        }
    }
}
</script>

<style scoped lang="sass">
.inicial
  width: 100%
  justify-content: space-between
.icono-barra
  padding: 10px
  transition: box-shadow $tiempo-transicion-c linear
  border-radius: $radio-borde-boton
  box-shadow: var(--sombra)
  cursor: pointer

  &:active
    box-shadow: var(--sombra-interior)
@media (max-width: $mobile)
  .caja.titulo-cartera
    width: calc(100vw - #{$margen*5})
</style>