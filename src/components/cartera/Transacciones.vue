<template>
    <div class="caja columna">

        <h2 class="margen-inf">Transacciones Realizadas</h2>

        <div class="listado">

            <div class="grid-transaccion" :class="esFiat ? 'fiat' : ''"
                 v-for="transaccion in getCartera(idDivisa).transacciones" v-bind:key="transaccion.fecha">

                <p class="area-fecha">{{ transaccion.fecha | fecha }}</p>

                <p v-if="!esFiat" class="area-cantidad">
                    <numero v-bind:valor="transaccion.cantidad" tipo="criptodivisa"/>
                    {{ getSimbolo(idDivisa) }}
                </p>

                <numero class="colorear area-precio" v-bind:valor="precioTransaccion(transaccion)" negrita/>

                <p class="area-info">{{ transaccion.detalles }}</p>

            </div>

            <div v-if="getCartera(idDivisa).transacciones.length === 0">

                <p>No hay ninguna transacción.</p>

            </div>

        </div>

    </div>
</template>

<script>
import {mapGetters} from "vuex";
import Numero from "@/components/Numero";

export default {
    name: "Transacciones",
    components: {Numero},
    props: {
        idDivisa: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            esFiat: this.idDivisa === 'fiat'
        }
    },
    methods:{
        precioTransaccion(transaccion){
            let mult = transaccion.tipo === 'compra' ? 1 : -1;
            return mult * transaccion.cantidad * transaccion.precio;
        }
    },
    computed: {
        ...mapGetters(['getSimbolo', 'getCartera'])
    }
}
</script>

<style scoped lang="sass">
.caja
  //height: 100%
  max-height: 500px
  //overflow-y: scroll
  justify-content: flex-start

.grid-transaccion
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-template-rows: repeat(1, 1fr)
  gap: 0 0
  grid-template-areas: "fecha cantidad precio info"

  &.fiat
    grid-template-areas: "fecha precio info"

  @include grid-areas(["fecha","cantidad","precio","info"])

.listado
  width: 100%
  margin-top: $margen

  p, span
    text-align: center

</style>