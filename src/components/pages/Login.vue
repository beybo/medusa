<template>
    <div class="columna caja" :data-fondo="claseFondo" v-if="mostrar">
        <div class="columna">
            <img svg-inline src="../../assets/img/LogoMedusa.svg" class="logo-grande"/>
        </div>
        <transition name="ocultar" mode="out-in" v-on:after-leave="entradaAnimacion">
            <div v-if="estado === 0" key="on" class="columna elemento">

                <p class="margen-top">Bienvenido a Medusa, el simulador de criptodivisas más fácil de usar.</p>
                <p>Para continuar inicia sesión</p>
                <button class="btn margen" @click.prevent="loginGoogle">
                    <font-awesome-icon :icon="['fab','google']"/>
                    Iniciar Sesión con Google
                </button>

            </div>
            <form @submit.prevent="registrar" v-else key="off" class="columna elemento">

                <imagen-perfil class="caja" v-bind:nombre-usuario="nombre"/>

                <p class="margen-bottom">Por favor escribe un nombre de usuario:</p>
                <input required class="margen-bottom" pattern="[a-zA-Z0-9-]+" v-model="nombre" minlength="4" type="text"
                       placeholder="Nombre de usuario">

                <button :disabled="nombreValido" class="btn margen-top">Continuar</button>

            </form>
        </transition>
    </div>
</template>

<script>

import {library} from '@fortawesome/fontawesome-svg-core'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
import ImagenPerfil from "@/components/ImagenPerfil";

library.add(faGoogle);

let urlLogin = process.env.VUE_APP_MEDUSA_SERVIDOR_URL + "/login";

export default {
    name: "Login",
    components: {ImagenPerfil},
    data() {
        return {
            estado: 0,
            permitirRegistro: false,
            nombre: "",
            token: "",
            claseFondo: "",
            mostrar: true
        };
    },
    mounted() {
        this.$emit("mostrar-header", false);
    },
    computed:{
        nombreValido(){
            return this.nombre.trim().length < 4;
        }
    },
    methods: {
        entradaAnimacion() {
            this.claseFondo = "si"
        },
        finalizar(token) {
            this.mostrar = false;
            localStorage.setItem("token", token);
            this.$socket.io.opts.query = {token: token};
            this.$socket.connect();
        },
        loginGoogle() {

            this.$gAuth.signIn().then(async GoogleUser => {

                let respuesta = await this.$http.post(urlLogin + "/google", {google: GoogleUser});

                if (!respuesta.body.error) {

                    let token = respuesta.body.token;

                    if (respuesta.body.registrado) {
                        this.$toast.success("¡Bienvenido de nuevo!");
                        this.finalizar(token);
                    } else {
                        this.$toast.info("Es necesario que finalices el registro");
                        this.token = token;
                        this.estado++;
                        this.claseFondo = 'no';
                    }

                } else {
                    this.$toast.error(respuesta.body.mensaje);
                }

            }).catch(error => {
                console.log(error);
                if (error.error === "popup_closed_by_user") {
                    this.$toast.error("No se ha completado el inicio de sesión porque has cerrado el popup");
                }
            });

        },
        async registrar() {

            let nombre = this.nombre.trim();

            let respuesta;
            this.mostrar = false;

            try {

                respuesta = await this.$http.post(urlLogin + "/registro", {token: this.token, nombre: nombre});
                console.log(respuesta);

                if (!respuesta.body.error) {

                    this.finalizar(respuesta.body.token);

                } else {
                    this.mostrar = true;
                    this.$toast.error(respuesta.body.mensaje);
                }

            } catch (err) {
                console.log(err);
                this.$toast.error("Ha ocurrido un error");
            }

        }
    }
}
</script>

<style lang="sass" scoped>

h3
  margin-bottom: $margen
  text-align: center
  color: var(--letra)

.margen-top
  margin-top: $margen

.margen-bottom
  margin-bottom: $margen

.elemento
  height: 300px


p
  padding: 5px
  text-align: center
  font-weight: bold
  z-index: 10

.caja
  transition: background-color $tiempo-transicion-l linear

  &[data-fondo="no"]
    background-color: rgba(0, 0, 0, 0)

svg
  overflow: visible

.caja.imagen-perfil
  background-color: #E4EBF5

.cls-1
  fill: var(--letra-secundario)
  filter: drop-shadow(0.8rem 0.8rem 1.4rem var(--fondo-claro))

</style>
