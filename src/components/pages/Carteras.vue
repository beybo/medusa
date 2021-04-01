<template>

    <div class="caja columna">
        <div v-for="id in getIdsCartera" v-bind:key="id" class="divisa" v-on:click="abrirCartera(id)">
            <img :src="getImagen(id)">
            <p>{{ getNombre(id) }}</p>
            <numero v-bind:valor="getValorCartera(id)" negrita></numero>
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
        ...mapGetters(['getIdsCartera', 'getCartera', 'getDivisa', 'getValorCartera']),
        getImagen: (state) => (id) => {
            if (id === "fiat") {
                return require("@/assets/img/logo-euro.png");
            }
            return state.$store.getters.getDivisa(id).imagen.mini;
        },
        getNombre: (state) => (id) => {
            if (id === "fiat") {
                return "Euros";
            }
            return state.$store.getters.getDivisa(id).nombre;
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
    padding: 5px

</style>