<template>
    <div class="caja columna">

        <h2 class="margen texto">Cartera de {{ getDivisa(idDivisa).nombre }}</h2>

        <numero class="texto-grande" negrita v-bind:valor="getCartera(idDivisa).cantidad" :style="estilosTexto" tipo="criptodivisa" v-bind:simbolo="getSimbolo(idDivisa)"/>

        <p>Valor
            <numero animar v-bind:valor="getValorCartera(idDivisa)" negrita/>
        </p>

    </div>
</template>

<script>
import Numero from "@/components/Numero";
import {mapGetters} from "vuex";

export default {
    name: "PrecioCartera",
    components:{Numero},
    props:{
        idDivisa:{
            type: String,
            required: true
        }
    },
    computed:{
        ...mapGetters(['getDivisa','getValorCartera','getCartera','getSimbolo']),
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