<template>
    <div id="app" :class="mostrarHeader ? 'columna' : 'columna centrar'">
        <transition name="ocultar-corto" v-if="mostrarHeader" mode="out-in">
            <Header/>
        </transition>

        <vue-element-loading :active="!getConectado && this.mostrarHeaderInicial()" color="#fc651f" v-bind:text="mensaje"/>

        <transition name="ocultar-corto" mode="out-in">
            <router-view @mostrar-header="cambiarMostrarHeader" @cerrar-sesion="cerrarSesion" :promptInstalar="promptInstalar"/>
        </transition>


        <div class="instalar caja columna" v-if="mostrarInstalar">
            <b class="margen-inf">¿Quieres instalar Medusa en tu dispositivo?</b>
            <div>
                <button class="btn-transparente btn-cancelar" @click="cancelarInstalacion">Cancelar</button>
                <button class="btn-transparente btn-instalar" @click="instalar">Instalar</button>
            </div>
        </div>
        <div class="instalar-fondo" v-if="mostrarInstalar" />


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
            mensaje: "",
            promptInstalar: null
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

        if (this.$workbox) {
            this.$workbox.addEventListener("waiting", () => {
                this.$swal({
                    title:"Nueva versión",
                    html:"Se ha detectado una nueva versión de la página. Es necesario refrescar la página",
                    confirmButtonText: "Continuar",
                    customClass: {
                        confirmButton: 'btn info'
                    },
                    timer:30000
                }).then(()=>{
                    this.$workbox.messageSW({ type: "SKIP_WAITING" });
                })
            });
        }

        window.addEventListener("beforeinstallprompt", e => {
            e.preventDefault();
            // Stash the event so it can be triggered later.
            this.promptInstalar = e;
        });

    },
    computed:{
        ...mapGetters(['getTema','getConectado']),
        mostrarInstalar(){

            if(this.promptInstalar){

                let stringFecha = localStorage.getItem("fecha_no_instalar");

                if(stringFecha){

                    let antigua = new Date(stringFecha),
                        ahora = new Date();

                    const utc1 = Date.UTC(antigua.getFullYear(), antigua.getMonth(), antigua.getDate());
                    const utc2 = Date.UTC(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());

                    let diferenciaDias =  Math.floor((utc2 - utc1) / 1000 * 60 * 60 * 24);

                    return diferenciaDias > 10;
                }

                return true;

            }

            return false;
        }
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
        },

        async cancelarInstalacion() {
            localStorage.setItem("fecha_no_instalar",new Date().toString())
            this.promptInstalar = null;
        },
        async instalar() {
            this.promptInstalar.prompt();
            this.promptInstalar = null;
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

.instalar
  position: fixed
  z-index: 1001
  top: 10px
  right: 10px

  .btn-cancelar
    color: #ff3b30
    transition: all $tiempo-transicion-c linear
    margin-right: $margen

    &:hover
      background-color: #ff3b30
      color: var(--fondo)
      border: 2px solid #ff3b30

  .btn-instalar
    color: #4cd964
    transition: all $tiempo-transicion-c linear

    &:hover
      background-color: #4cd964
      color: var(--fondo)
      border: 2px solid #4cd964

.instalar-fondo
  display: none

@media (max-width: $mobile)
  #app
    overflow-x: hidden
    height: calc(100vh - #{$nav-mobile-height})
    padding-bottom: $nav-mobile-height

  .instalar
    right: auto
    left: 50%
    transform: translate(-50%,-50%)
    max-width: calc(100vw - #{$margen * 6})
    width: 340px
    box-shadow: none
    top: 50%
    text-align: center
    margin: 0


  .instalar-fondo
    display: block
    position: fixed
    top: 0
    left: 0
    height: 100vh
    width: 100vw
    z-index: 1000
    background: rgba(0,0,0,0.4)
</style>