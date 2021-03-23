<template>
    <div class="hello caja" v-if="conectado">
        <h1>Hola {{ getNombreUsuario }}, el <span class="ul" @click="siguiente">{{ divisa_actual }}</span> está a
            <dinero v-bind:valor="getPrecio(divisa_actual)"/>
        </h1>
        <h2>Tienes
            <dinero v-bind:valor="getValorCartera(divisa_actual)"/>
            , en tu cartera.
        </h2>
        <div class="grafico">
            <grafico :chart-data="datosGrafica"/>
        </div>
    </div>
</template>

<script>

import {mapGetters, mapState} from 'vuex'
import Dinero from "@/components/Dinero";
import Grafico from "@/components/Grafico";

export default {
    name: 'Inicio',
    components: {Grafico, Dinero},
    data() {
        return {
            divisa_actual: "bitcoin",
            datosGrafica:{
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
                datasets: [
                    {
                        label: 'Bitcoin',
                        borderColor: '#05CBE1',
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        pointBorderColor: 'white',
                        data: [40000, 39000, 10000, 40000, 39000, 80000, 40000]
                    },
                ]
            }
        }
    },
    computed: {
        ...mapState(['conectado']),
        ...mapGetters(['getNombreUsuario', 'getPrecio', 'getValorCartera'])
    },
    methods: {
        siguiente() {
            let divisas = Object.keys(this.$store.state.divisas);

            let indice = divisas.indexOf(this.divisa_actual);

            indice++;

            if (indice >= divisas.length) {
                indice = 0;
            }

            this.divisa_actual = divisas[indice];

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

.grafico
  height: 400px
  margin-top: $margen

</style>
