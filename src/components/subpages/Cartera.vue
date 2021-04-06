<template>
    <div class="grid" v-if="getConectado">

        <div class="caja area-grafico">

            <grafico-divisa :id-divisa="idDivisa"/>

        </div>

        <div class="caja columna area-balance">

            <h2 class="margen">Cartera de {{ getDivisa(idDivisa).nombre }}</h2>

            <numero class="texto-grande" negrita v-bind:valor="getCartera(idDivisa).cantidad" :style="estilosTexto" tipo="criptodivisa" v-bind:simbolo="getSimbolo(idDivisa)"/>

            <p>Valor
                <numero animar v-bind:valor="getValorCartera(idDivisa)" negrita/>
            </p>

        </div>

        <div class="caja columna area-precio">

            <h2 class="margen">Precio de {{ getDivisa(idDivisa).nombre }}</h2>

            <numero animar v-bind:valor="getPrecioValor(idDivisa)" :style="estilosTexto" negrita class="texto-grande"/>

            <p>Ult. 24h <numero v-bind:valor="getPrecioCambio(idDivisa)" negrita tipo="porcentaje"/></p>

        </div>

        <crear-transaccion class="area-comprar" v-bind:id-divisa="idDivisa" modo="comprar"/>

        <crear-transaccion class="area-vender" v-bind:id-divisa="idDivisa" modo="vender"/>

        <transacciones class="area-transacciones" v-bind:id-divisa="idDivisa"/>

    </div>
</template>

<script>
import {mapGetters} from "vuex";
import Numero from "@/components/Numero";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheck, faExchangeAlt} from '@fortawesome/free-solid-svg-icons'
import CrearTransaccion from "@/components/CrearTransaccion";
import Transacciones from "@/components/Transacciones";
import GraficoDivisa from "@/components/GraficoDivisa";

library.add(faCheck, faExchangeAlt);

export default {
    name: "Cartera",
    components: {GraficoDivisa, Transacciones, CrearTransaccion, Numero},
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
        ...mapGetters(['getConectado','getCartera', 'getDivisa', 'getPrecioValor', 'getValorCartera', 'getPrecioCambio', 'getSimbolo']),

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

.area-grafico
  max-height: 300px

h2
  font-size: 1.4em
  color: var(--letra-secundario)

.texto-grande
  margin-bottom: $margen
  font-size: 1.3em
  color: var(--acento)

</style>
