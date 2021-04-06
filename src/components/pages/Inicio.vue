<template>
    <div class="columna" v-if="getConectado" @click="siguiente">
        <div class="grafico-divisa caja">
            <grafico-divisa class="altura" :id-divisa="idDivisa"/>
        </div>
        <div class="caja">
            <h3>Precio de {{idDivisa}}
                <numero v-bind:valor="getPrecioValor(idDivisa)"/>
            </h3>
        </div>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'
import Numero from "@/components/Numero";
import GraficoDivisa from "@/components/GraficoDivisa";

export default {
    name: 'Inicio',
    components: {GraficoDivisa, Numero},
    data() {
        return {
            idDivisa: "bitcoin"
        }
    },
    computed: {
        ...mapGetters(['getConectado','getPrecioValor']),
    },
    methods: {
        siguiente() {
            let divisas = Object.keys(this.$store.state.divisas);

            let indice = divisas.indexOf(this.idDivisa);

            indice++;

            if (indice >= divisas.length) {
                indice = 0;
            }

            this.idDivisa = divisas[indice];

        }
    },
    sockets: {}
}
</script>

<style scoped lang="sass">

h2
  text-align: center

.ul
  text-decoration: underline
  cursor: pointer

.grafico-divisa
  width: 100%
  max-width: 500px

  .altura
    height: 300px

</style>
