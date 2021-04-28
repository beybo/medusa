<template>
    <div class="caja columna">

        <div class="fila inicial">
            <font-awesome-icon class="icono-barra" :icon="['fas','chart-pie']" size="lg" @click="mostrarGrafico = !mostrarGrafico"/>
            <h3>Total: <numero animar negrita v-bind:valor="getValorTodasCartera" /></h3>
            <font-awesome-icon class="icono-barra" :icon="['fas','sort-amount-down']" size="lg"/>
        </div>

        <transition name="altura-corto" v-if="mostrarGrafico">
            <grafico-carteras/>
        </transition>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import Numero from "@/components/Numero";
import GraficoCarteras from "@/components/graficos/GraficoCarteras";

export default {
    name: "TituloCarteras",
    components: {GraficoCarteras, Numero},
    data(){
        return {
            mostrarGrafico:false
        }
    },
    computed: {
        ...mapGetters(['getValorTodasCartera']),
    },
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
</style>