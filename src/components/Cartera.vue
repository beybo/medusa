<template>

    <div class="caja columna">
        <div v-for="id in getIdsCartera" v-bind:key="id" class="divisa">
            <img :src="getImagen(id)">
            <p>{{getNombre(id)}}</p>
            <dinero v-bind:valor="getValorCartera(id)"></dinero>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import Dinero from "@/components/Dinero";

export default {
    name: "Cartera",
    components: {Dinero},
    computed:{
        ...mapGetters(['getIdsCartera','getCartera','getDivisa',"getValorCartera"]),
        getImagen:(state)=>(id)  => {
            if(id==="euros"){
                return require("@/assets/img/logo-euro.png");
            }
            return state.$store.getters.getDivisa(id).image.thumb;
        },
        getNombre:(state) =>(id)  => {
            if(id==="euros"){
                return "Euros";
            }
            return state.$store.getters.getDivisa(id).name;
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
    transition: transform $tiempo-transicion linear

    &:hover
      transform: scale(1.05)

    img
      border-radius: $radio-borde
      background: #fff
      padding: 5px

</style>