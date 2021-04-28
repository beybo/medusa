<template>
    <div class="columna">
        <div class="caja columna" id="total">

            <h3>Total: <numero animar negrita v-bind:valor="getValorTodasCartera" /></h3>
        </div>

        <div class="caja columna">
            <div v-for="id in getIdsCartera" v-bind:key="id" class="divisa" v-on:click="abrirCartera(id)">
                <imagen-divisa :id-divisa="id" />
                <p>{{ getNombre(id) }} <br><numero v-if="id!=='fiat'" negrita class="letra-peque" v-bind:valor="getCantidadCartera(id)" v-bind:simbolo="getSimbolo(id)" tipo="criptodivisa"/></p>
                <div class="columna valor">
                    <numero v-bind:valor="getValorCartera(id)" negrita/>
                    <numero v-if="id!=='fiat'" class="letra-peque" negrita ocultar :valor="getPrecioCambio(id)" tipo="porcentaje" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import Numero from "@/components/Numero";
import ImagenDivisa from "@/components/ImagenDivisa";

export default {
    name: "Carteras",
    components: {ImagenDivisa, Numero},
    computed: {
        ...mapGetters(['getIdsCartera', 'getValorCartera', 'getValorTodasCartera', 'getSimbolo', 'getCantidadCartera','getNombre','getCartera']),
        getPrecioCambio:(state) => (id) => {

            let valorActual = state.getValorCartera(id);

            if(valorActual === 0){
                return 0;
            }

            let valorPasado = state.getCartera(id).transacciones.reduce((acu,transaccion) => {
                return acu + (((transaccion.cantidad * transaccion.precio)) * (transaccion.tipo === 'compra' ? 1 : -1));
            },0);

            console.log(valorPasado);

            return ((valorActual - valorPasado) / valorPasado);

        },
        getPorcentajeTotal(){
            return (this.getValorTodasCartera - 10000) / 10000;
        }
    },
    methods: {
        abrirCartera(id) {
            if (id === "fiat") {
                this.$router.push(`/cartera-fiat`);
            } else {
                this.$router.push(`/cartera/${id}`);
            }

        },
    }
}
</script>

<style lang="sass" scoped>

.caja
  width: 360px

.divisa
  display: grid
  padding: 10px
  width: 100%
  grid-gap: $margen
  align-items: center
  grid-template-columns: 1fr 8fr 1fr
  cursor: pointer
  transition: font-weight $tiempo-transicion-c linear

  &:hover
    font-weight: bold

    img
      transform: scale(1.2)

  img
    transition: transform $tiempo-transicion-c linear

  .valor
    align-items: flex-end

  .letra-peque
    font-size: 0.8rem

@media (max-width: $mobile)
  .caja
    width: calc(100% - #{$margen*4})


</style>
