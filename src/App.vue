<template>
    <div id="app" :class="mostrarHeader ? 'columna' : 'columna centrar'">
        <transition :name="animacion" v-if="mostrarHeader" mode="out-in">
            <Header/>
        </transition>
        <transition :name="animacion" mode="out-in">
            <router-view v-on:mostrar-header="cambiarMostrarHeader"/>
        </transition>
    </div>
</template>

<script>

import Header from "@/components/Header"


export default {
    name: 'App',
    components: {
        Header
    },
    data() {
        let router = this.$router,
            helper = this.$helpers;
        return {
            mostrarHeader: helper.mostrarHeaderInicial(router),
            animacion:"sin-animacion"
        }
    },
    mounted() {
        this.$helpers.cargarTema();
    },
    methods:{
        cambiarMostrarHeader(valor){
            if(valor===false){
                this.animacion = "sin-animacion";
            }else{
                this.animacion = "ocultar-corto";
            }
            this.mostrarHeader = valor;
        }
    },
    watch: {
        $route(to) {
            this.mostrarHeader = to.name !== "Login";
            this.animacion = this.mostrarHeader ? "ocultar-corto" : "sin-animacion";
        }
    },
}
</script>
<style lang="sass">

@import "assets/sass/main"

#app
  justify-content: flex-start

#app.centrar
  justify-content: center

</style>