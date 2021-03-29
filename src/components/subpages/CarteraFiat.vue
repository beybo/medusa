<template>
    <div class="grid" v-if="conectado">

        <div class="caja columna area-balance">

            <h2 class="margen">Cartera de Euros</h2>

            <numero class="texto-grande" v-bind:valor="getCartera('fiat').cantidad" negrita animar/>

        </div>

        <div class="caja columna area-numero">

            <h2 class="margen">Nº Transacciones</h2>

            <p class="texto-grande negrita">{{getCartera('fiat').transacciones.length}}</p>

        </div>
        <div class="caja columna area-transacciones">

            <h2 class="margen">Transacciones</h2>

            <div class="listado">

                <div class="grid-transaccion" v-for="transaccion in getCartera('fiat').transacciones" v-bind:key="transaccion.fecha">
                    <p class="area-fecha">{{$helpers.formatearFecha(transaccion.fecha)}}</p>
                    <p class="area-cantidad"><numero class="colorear" v-bind:valor="getCantidad(transaccion)" negrita/></p>
                    <p class="area-info">{{transaccion.detalles}}</p>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
import Numero from "@/components/Numero";
import {mapGetters, mapState} from "vuex";

export default {
    name: "CarteraFiat",
    components: {Numero},
    computed:{
        ...mapState(['conectado']),
        ...mapGetters(['getCartera'])
    },
    methods:{
        getCantidad(transaccion){
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
  grid-template-rows: repeat(2, 1fr)
  gap: 0 0
  grid-template-areas: "balance numero" "transacciones transacciones"

  @include grid-areas(["balance","numero","transacciones"])

.grid-transaccion
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-template-rows: repeat(1, 1fr)
  gap: 0 0
  grid-template-areas: "fecha cantidad info"

  @include grid-areas(["fecha","cantidad","info"])

.listado
  width: 100%

// Texto
h2
  font-size: 17pt
  color: var(--letra-secundario)

.texto-grande
  margin-bottom: $margen
  font-size: 17pt
p
  text-align: center

</style>