<template>
    <div class="grid" v-if="getConectado">

        <div class="caja area-grafico">

            <grafico-divisa :id-divisa="idDivisa"/>

        </div>

        <precio-cartera class="area-balance" :id-divisa="idDivisa"/>

        <precio-divisa class="area-precio" :id-divisa="idDivisa"/>

        <crear-transaccion class="area-comprar" v-bind:id-divisa="idDivisa" modo="comprar"/>

        <crear-transaccion class="area-vender" v-bind:id-divisa="idDivisa" modo="vender"/>

        <transacciones class="area-transacciones" v-bind:id-divisa="idDivisa"/>

    </div>
</template>

<script>
import {mapGetters} from "vuex";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheck, faExchangeAlt} from '@fortawesome/free-solid-svg-icons'
import CrearTransaccion from "@/components/cartera/CrearTransaccion";
import Transacciones from "@/components/cartera/Transacciones";
import GraficoDivisa from "@/components/graficos/GraficoDivisa";
import PrecioDivisa from "@/components/cartera/PrecioDivisa";
import PrecioCartera from "@/components/cartera/PrecioCartera";

library.add(faCheck, faExchangeAlt);

export default {
    name: "Cartera",
    components: {PrecioCartera, PrecioDivisa, GraficoDivisa, Transacciones, CrearTransaccion},
    data() {
        return {
            idDivisa: this.$route.params.id,
            modoComprar: true
        }
    },
    mounted() {
        if (!this.$store.getters.getDivisa(this.idDivisa)) {
            this.$router.replace({name: "404"});
        }
    },
    computed: {
        ...mapGetters(['getConectado','getCartera', 'getDivisa', 'getValorCartera', 'getSimbolo']),

        estilosTexto(){

            let color = this.$store.getters.getColorDivisa(this.idDivisa);

            return {
                color: color
            }

        }
    }
}
</script>

<style lang="sass" scoped>

// Posicionamiento

.grid
  display: grid
  grid-template-columns: repeat(2, 1fr)
  gap: 0 0
  grid-template-areas: "grafico grafico" "balance precio" "comprar vender" "transacciones transacciones"

  @include grid-areas(["grafico","balance","precio","comprar","vender","transacciones"])

// Para la parte del balance
$margen-grafico: 20px

.area-grafico
  max-height: 300px + $margen-grafico*2

.grafico
  height: calc(100% - #{$margen-grafico * 2})
  margin: $margen-grafico


@media (max-width: $mobile)

  .grid
    display: flex
    flex-flow: column


  .area-grafico
    width: calc(100vw - #{$margen*4})

</style>
