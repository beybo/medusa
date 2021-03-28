<template>
    <div class="grid" v-if="conectado">

        <div class="caja columna balance">

            <h2 class="margen">Cartera de {{ getDivisa(idDivisa).nombre }}</h2>

            <b class="texto-grande">{{getCartera(idDivisa).cantidad}} {{getDivisa(idDivisa).simbolo.toUpperCase()}}</b>
            <p>Valor <numero v-bind:valor="getValorCartera(idDivisa)" negrita/></p>

        </div>

        <div class="caja columna precio">

            <h2 class="margen">Precio de {{ getDivisa(idDivisa).nombre }}</h2>

            <numero v-bind:valor="getPrecioValor(idDivisa)" negrita class="texto-grande"/>

            <p>Ult. 24h <numero v-bind:valor="getPrecioCambio(idDivisa)" negrita tipo="porcentaje"/></p>

        </div>

        <div class="caja columna comprar">


            <div class="fila">
                <input type="number" placeholder="Comprar">
                <button class="btn">Comprar</button>
            </div>
        </div>

        <div class="caja columna vender">


            <div class="fila">
                <input type="number" placeholder="Comprar">
                <button class="btn">Vender</button>
            </div>
        </div>

        <div class="caja columna transacciones">

            <h3 class="margen">Transacciones Realizadas</h3>


        </div>

    </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import Numero from "@/components/Numero";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faExchangeAlt} from '@fortawesome/free-solid-svg-icons'

library.add(faExchangeAlt);

export default {
    name: "Cartera",
    components: {Numero},
    data(){
        return {
            idDivisa: this.$route.params.id,
            modoComprar: true
        }
    },
    mounted() {
        if(!this.$store.getters.getDivisa(this.idDivisa)){
            this.$router.replace({name:"404"});
        }
    },
    computed:{
        ...mapState(['conectado']),
        ...mapGetters(['getCartera','getDivisa','getPrecioValor','getValorCartera','getPrecioCambio'])
    }
}
</script>

<style lang="sass" scoped>

// Posicionamiento

.grid
  display: grid
  grid-template-columns: repeat(2, 1fr)
  grid-template-rows: repeat(3, 1fr)
  gap: 0 0
  grid-template-areas: "balance precio" "comprar vender" "transacciones transacciones"

.balance
  grid-area: balance
.precio
  grid-area: precio
.comprar
  grid-area: comprar
.vender
  grid-area: vender
.transacciones
  grid-area: transacciones

// Para la parte del balance

h2
  font-size: 17pt
  color: var(--letra-secundario)

.texto-grande
  margin-bottom: $margen
  font-size: 17pt

// Para la parte de comprar y vender

$w-tab: 80px
$h-tab: 40px
$m-tab: 5px

.comprar,.vender

  input
    width: 50px




</style>