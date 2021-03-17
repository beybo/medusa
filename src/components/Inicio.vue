<template>
    <div class="hello">
        <h1>Hola {{ getNombre }}, el <span class="ul" @click="siguiente">{{ divisa_actual }}</span> está a {{ getPrecio(divisa_actual) }}</h1>
        <h2>Tienes {{ getValorCartera(divisa_actual) }}, en tu cartera.</h2>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
    name: 'Inicio',
    data() {
        return {
            divisa_actual:"bitcoin"
        }
    },
    computed:{
        ...mapGetters(['getNombre','getPrecio','getValorCartera'])
    },
    mounted() {

    },
    methods:{
        siguiente(){
            let divisas = Object.keys(this.$store.state.divisas);

            let indice = divisas.indexOf(this.divisa_actual);

            indice++;

            if(indice>=divisas.length){
                indice = 0;
            }

            this.divisa_actual = divisas[indice];

        }
    },
    sockets: {
    }
}
</script>

<style scoped lang="sass">
h2
  text-align: center

.ul
  text-decoration: underline
  cursor: pointer

</style>
