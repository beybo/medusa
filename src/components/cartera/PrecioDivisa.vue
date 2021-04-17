<template>
    <div class="caja columna">

        <h2 class="margen texto">Precio de {{ getDivisa(idDivisa).nombre }}</h2>

        <numero animar v-bind:valor="getPrecioValor(idDivisa)" :style="estilosTexto" negrita class="texto-grande"/>
        <p>Ult. 24h <numero v-bind:valor="getPrecioCambio(idDivisa)" negrita tipo="porcentaje"/></p>

    </div>
</template>

<script>
import {mapGetters} from "vuex";
import Numero from "@/components/Numero";

export default {
    name: "PrecioDivisa",
    components:{Numero},
    props:{
        idDivisa:{
            type: String,
            required: true
        }
    },
    computed:{
        ...mapGetters(['getDivisa','getPrecioValor','getPrecioCambio']),
        estilosTexto(){

            let color = this.$store.getters.getColorDivisa(this.idDivisa);

            return {
                color: color
            }

        }
    }
}
</script>

<style scoped>

</style>