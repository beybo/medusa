<template>
    <div class="caja columna">
        <h3 class="margen">Cartera de {{ getDivisa(this.idDivisa).name }}</h3>


        <div class="fila margen caja">
            <div class="columna margen">
                <p>Balance</p>
                <strong>{{getCartera(idDivisa).cantidad}} {{getDivisa(idDivisa).symbol}}</strong>
            </div>
            <p class="margen">a</p>
            <div class="columna margen">
                <p>Precio</p>
                <dinero v-bind:valor="getPrecio(idDivisa)" negrita/>
            </div>
            <p class="margen">=</p>
            <div class="columna margen">
                <p>Valor</p>
                <dinero v-bind:valor="getValorCartera(idDivisa)" negrita/>
            </div>
        </div>
        <div class="fila margen">
            <input type="number" placeholder="Comprar">
            <button class="btn">Comprar</button>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import Dinero from "@/components/Dinero";

export default {
    name: "Cartera",
    components: {Dinero},
    data(){
        return {
            idDivisa:this.$route.params.id
        }
    },
    mounted() {
        if(!this.$store.getters.getDivisa(this.idDivisa)){
            this.$router.replace({name:"404"});
        }
    },
    computed:{
        ...mapGetters(['getCartera','getDivisa','getPrecio','getValorCartera'])
    }
}
</script>

<style lang="sass" scoped>
.dinero
  min-width: 60px
  text-align: center
.fila
  flex-flow: row wrap
</style>