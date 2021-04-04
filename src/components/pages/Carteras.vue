<template>
    <div class="columna">
        <div class="caja columna">
            <h3>Total: <numero animar negrita v-bind:valor="getValorTodasCartera" /></h3>
        </div>

        <div class="caja columna">
            <div v-for="id in getIdsCartera" v-bind:key="id" class="divisa" v-on:click="abrirCartera(id)">
                <img :src="getImagen(id)">
                <p>{{ getNombre(id) }}</p>
                <div class="columna valor">
                    <numero v-bind:valor="getValorCartera(id)" negrita></numero>
                    <numero v-if="id!=='fiat'" class="cantidad" v-bind:valor="getCantidadCartera(id)" v-bind:simbolo="getSimbolo(id)" tipo="criptodivisa"></numero>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import Numero from "@/components/Numero";

export default {
    name: "Carteras",
    components: {Numero},
    computed: {
        ...mapGetters(['getIdsCartera', 'getValorCartera', 'getValorTodasCartera', 'getSimbolo', 'getCantidadCartera']),
        getImagen: (context) => (id) => {
            if (id === "fiat") {
                return require("@/assets/img/logo-euro.png");
            }
            return context.$store.getters.getDivisa(id).imagen.peque;
        },
        getNombre: (context) => (id) => {
            if (id === "fiat") {
                return "Euros";
            }
            return context.$store.getters.getDivisa(id).nombre;
        }
    },
    methods: {
        abrirCartera(id) {
            if (id === "fiat") {
                this.$router.push(`/cartera-fiat`);
            } else {
                this.$router.push(`/cartera/${id}`);
            }

        }
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
    border-radius: $radio-borde
    background: #fff
    width: 25px
    height: 25px
    padding: 5px

  .valor
    align-items: flex-end

  .cantidad
    font-size: 0.8rem
    font-weight: normal !important

</style>
