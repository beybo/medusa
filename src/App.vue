<template>
    <div id="app" :class="mostrarHeader ? 'columna' : 'columna centrar'">
        <transition name="ocultar-corto" v-if="mostrarHeader" mode="out-in">
            <Header/>
        </transition>

        <vue-element-loading :active="!getConectado && !this.$helpers.mostrarHeaderInicial" color="#fc651f" v-bind:text="mensaje"/>

        <transition name="ocultar-corto" mode="out-in">
            <router-view v-on:mostrar-header="cambiarMostrarHeader"/>
        </transition>
    </div>
</template>

<script>

import Header from "@/components/Header"
import {mapActions, mapGetters} from "vuex";


export default {
    name: 'App',
    components: {
        Header
    },
    data() {
        let nombre = this.$router.currentRoute.name;
        return {
            mostrarHeader: this.$helpers.mostrarHeaderInicial(nombre),
            mensaje: ""
        }
    },
    mounted() {
        this.cargarTema();

        if (localStorage.getItem("token")) {
            this.$socket.connect();
        } else if (this.$router.history.current.name !== "Login") {
            this.$router.replace({name: "Login"});
        }

        setTimeout(()=>{
            if(!this.getConectado){
                this.mensaje = "Vaya, hay un problema con la conexión...";
            }
        },5000)

    },
    computed:{
        ...mapGetters(['getTema','getConectado'])
    },
    methods: {
        ...mapActions(['cargarTema']),
        cambiarMostrarHeader(valor) {
            this.mostrarHeader = valor;
        }
    },
    watch: {
        $route(to) {
            this.mostrarHeader = this.$helpers.mostrarHeaderInicial(to.name)
        }
    },
    sockets: {
        desconectar() {
            this.$socket.disconnect();
            localStorage.removeItem("token");
            this.$router.replace({name: "Login"});
        }
    }
}
</script>
<style lang="sass">

@import "assets/sass/main"

#app
  justify-content: flex-start

#app.centrar
  justify-content: center

</style>