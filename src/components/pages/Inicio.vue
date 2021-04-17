<template>
    <div class="columna grid" v-if="getConectado">
        <div class="area-grafico caja">
            <grafico-divisa class="altura" :id-divisa="idDivisa"/>
        </div>
        <div class="area-selector caja">
            <h2 class="texto">Divisa</h2>
                <v-select class="select margen" :options="getIdsDivisa" v-model="idDivisa" :clearable="false" :searchable="false">
                    <template v-slot:option="option" class="fila">
                        <imagen-divisa :id-divisa="option.label" tam="35" />
                        {{ getNombre(option.label) }}
                    </template>
                    <template v-slot:selected-option="option" class="fila">
                        <imagen-divisa :id-divisa="option.label" tam="35"/>
                        {{ getNombre(option.label) }}
                    </template>
                </v-select>
        </div>

        <precio-divisa class="area-precio" :id-divisa="idDivisa" />

    </div>
</template>

<script>

import {mapGetters} from 'vuex'
import GraficoDivisa from "@/components/graficos/GraficoDivisa";
import ImagenDivisa from "@/components/ImagenDivisa";
import PrecioDivisa from "@/components/cartera/PrecioDivisa";

export default {
    name: 'Inicio',
    components: {PrecioDivisa, ImagenDivisa, GraficoDivisa},
    data() {
        return {
            idDivisa: "bitcoin"
        }
    },
    computed: {
        ...mapGetters(['getConectado','getPrecioValor','getIdsDivisa','getNombre']),
    },
    methods: {
        siguiente() {
            let divisas = this.getIdsDivisa;

            let indice = divisas.indexOf(this.idDivisa);

            indice++;

            if (indice >= divisas.length) {
                indice = 0;
            }

            this.idDivisa = divisas[indice];

        }
    }
}
</script>

<style scoped lang="sass">

.grid
  display: grid
  grid-template-columns: repeat(2, 1fr)
  grid-template-rows: auto 1fr 1fr
  gap: 0 0
  grid-template-areas: "grafico grafico" "selector precio"

  @include grid-areas(["grafico","selector","precio"])

.area-selector,.area-precio
  height: 110px

.ul
  text-decoration: underline
  cursor: pointer

.area-grafico .altura
  height: 250px
  max-width: 500px
  width: 100%

@media (max-width: $mobile)
  .grid
    grid-template-columns: repeat(1, 1fr)
    grid-template-rows: auto 1fr 1fr
    grid-template-areas: "grafico" "precio" "selector"

  .area-grafico .altura
    max-width: 70vw
    height: 200px

</style>
