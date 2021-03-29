<template>
    <div class="grid" v-if="conectado">

        <div class="caja columna area-balance">

            <h2 class="margen">Cartera de {{ getDivisa(idDivisa).nombre }}</h2>

            <b class="texto-grande">{{getCartera(idDivisa).cantidad}} {{getSimbolo(idDivisa)}}</b>
            <p>Valor <numero animar v-bind:valor="getValorCartera(idDivisa)" negrita/></p>

        </div>

        <div class="caja columna area-precio">

            <h2 class="margen">Precio de {{ getDivisa(idDivisa).nombre }}</h2>

            <numero animar v-bind:valor="getPrecioValor(idDivisa)" negrita class="texto-grande"/>

            <p>Ult. 24h <numero v-bind:valor="getPrecioCambio(idDivisa)" negrita tipo="porcentaje"/></p>

        </div>

        <div class="caja columna area-comprar">


            <div class="fila">
                <input type="number" placeholder="Comprar">
                <button class="btn">Comprar</button>
            </div>
        </div>

        <div class="caja columna area-vender">


            <div class="fila">
                <input type="number" placeholder="Comprar">
                <button class="btn">Vender</button>
            </div>
        </div>

        <div class="caja columna area-transacciones">

            <h2 class="margen">Transacciones Realizadas</h2>

            <div class="listado">

                <div class="grid-transaccion" v-for="transaccion in getCartera('fiat').transacciones" v-bind:key="transaccion.fecha">
                    <p class="area-fecha">{{$helpers.formatearFecha(transaccion.fecha)}}</p>
                    <p class="area-cantidad">
                        <numero v-bind:valor="transaccion.cantidad" tipo="criptodivisa"/>
                        {{getSimbolo(idDivisa)}}
                    </p>
                    <numero class="colorear area-precio" v-bind:valor="transaccion.cantidad * transaccion.precio" negrita/>
                    <p class="area-info">{{transaccion.detalles}}</p>
                </div>

            </div>

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
        ...mapGetters(['getCartera','getDivisa','getPrecioValor','getValorCartera','getPrecioCambio','getSimbolo'])
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

  @include grid-areas(["balance","precio","comprar","vender","transacciones"])

.listado
  width: 100%

  p
    text-align: center

.grid-transaccion
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-template-rows: repeat(1, 1fr)
  gap: 0 0
  grid-template-areas: "fecha cantidad precio info"

  @include grid-areas(["fecha","cantidad","precio","info"])

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