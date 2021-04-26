<template>
    <div id="app" :class="mostrarHeader ? 'columna' : 'columna centrar'">
        <transition name="ocultar-corto" v-if="mostrarHeader" mode="out-in">
            <Header/>
        </transition>

        <vue-element-loading :active="!getConectado && this.mostrarHeaderInicial()" color="#fc651f" v-bind:text="mensaje"/>

        <transition name="ocultar-corto" mode="out-in">
            <router-view @mostrar-header="cambiarMostrarHeader" @cerrar-sesion="cerrarSesion"/>
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
        return {
            mostrarHeader: this.mostrarHeaderInicial(),
            mensaje: ""
        }
    },
    created() {
        this.cargarTema();

        if (localStorage.getItem("token")) {
            this.$socket.connect();
        } else if (["Login", "Politica", "Condiciones"].indexOf(this.$router.history.current.name) === -1) {
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

        ...mapActions(['cargarTema','setConectado']),

        mostrarHeaderInicial(){
            let nombre = this.$router.currentRoute.name;
            return this.$helpers.mostrarHeaderInicial(nombre);
        },

        cambiarMostrarHeader(valor) {
            this.mostrarHeader = valor;
        },

        cerrarSesion() {
            this.setConectado(false);
            this.mostrarHeader = false;
            this.$socket.disconnect();
            localStorage.removeItem("token");
            this.$router.replace({name: "Login"});
        }
    },
    watch: {
        $route(to) {
            this.mostrarHeader = this.$helpers.mostrarHeaderInicial(to.name)
        }
    },
    sockets: {
        desconectar() {
            this.cerrarSesion();
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


@media (max-width: $mobile)
  #app
    overflow-x: hidden
    height: calc(100vh - #{$nav-mobile-height})
    padding-bottom: $nav-mobile-height
</style>