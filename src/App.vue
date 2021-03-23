<template>
    <div id="app" :class="mostrarHeader ? 'columna' : 'columna centrar'">
        <Header v-bind:mostrar="mostrarHeader"/>
        <transition name="ocultar-corto" mode="out-in">
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
        return {
            mostrarHeader: true
        }
    },
    mounted() {
        this.cargarTema();
    },
    methods:{
        cambiarMostrarHeader(valor){
            this.mostrarHeader = valor;
        },
        cargarTema(){
            let tema = "";

            if(localStorage.getItem("tema") === "oscuro"){
                tema = "oscuro";
            } else if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                tema = "oscuro";
            }

            document.documentElement.setAttribute("data-tema", tema);

        }
    },
    watch: {
        $route(to) {
            this.mostrarHeader = to.name !== "Login";
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