<template>

    <div class="caja columna">
        <div v-for="id in getIdsCartera" v-bind:key="id" class="divisa" v-on:click="abrirCartera(id)">
            <img :src="getImagen(id)">
            <p>{{ getNombre(id) }}</p>
            <dinero v-bind:valor="getValorCartera(id)" negrita></dinero>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import Dinero from "@/components/Dinero";

export default {
    name: "Carteras",
    components: {Dinero},
    computed: {
        ...mapGetters(['getIdsCartera', 'getCartera', 'getDivisa', "getValorCartera"]),
        getImagen: (state) => (id) => {
            if (id === "euros") {
                return require("@/assets/img/logo-euro.png");
            }
            return state.$store.getters.getDivisa(id).image.thumb;
        },
        getNombre: (state) => (id) => {
            if (id === "euros") {
                return "Euros";
            }
            return state.$store.getters.getDivisa(id).name;
        }
    },
    methods:{
        abrirCartera(id){
            this.$router.push(`/cartera/${id}`);
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