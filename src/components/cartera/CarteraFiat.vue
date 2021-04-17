<template>
    <div class="grid" v-if="getConectado">

        <div class="caja columna area-balance">

            <h2 class="margen">Cartera de Euros</h2>

            <numero class="texto-grande" v-bind:valor="getCantidadFiat" negrita animar/>

        </div>

        <div class="caja columna area-numero">

            <h2 class="margen">Nº Transacciones</h2>

            <p class="texto-grande negrita">{{ getCartera('fiat').transacciones.length }}</p>

        </div>

        <transacciones class="area-transacciones" id-divisa="fiat"/>

    </div>
</template>

<script>
import Numero from "@/components/Numero";
import {mapGetters} from "vuex";
import Transacciones from "@/components/cartera/Transacciones";

export default {
    name: "CarteraFiat",
    components: {Transacciones, Numero},
    computed: {
        ...mapGetters(['getConectado','getCartera','getCantidadFiat'])
    },
    methods: {
        getCantidad(transaccion) {
            return transaccion.cantidad * (transaccion.tipo === "compra" ? 1 : -1);
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
  grid-template-areas: "balance numero" "transacciones transacciones"

  @include grid-areas(["balance","numero","transacciones"])

// Texto
h2
  font-size: 1.45em
  color: var(--letra-secundario)

.texto-grande
  margin-bottom: $margen
  font-size: 1.4em

p
  text-align: center

</style>