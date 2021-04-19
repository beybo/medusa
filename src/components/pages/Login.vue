<template>
    <div class="columna caja" v-if="mostrar">
        <div class="columna">
            <img svg-inline src="../../assets/img/LogoMedusa.svg" class="logo-grande"/>
        </div>
        <div class="columna">
            <p class="margen-top">Bienvenido a Medusa, el simulador de criptodivisas más fácil de usar.</p>
            <p>Para continuar inicia sesión</p>
            <button class="btn margen" @click.prevent="loginGoogle">
                <font-awesome-icon :icon="['fab','google']"/>
                Iniciar Sesión con Google
            </button>

        </div>
    </div>
</template>

<script>

import axios from 'axios'

import {library} from '@fortawesome/fontawesome-svg-core'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'

library.add(faGoogle);



let urlLogin = process.env.VUE_APP_MEDUSA_SERVIDOR_URL + "/login";

export default {
    name: "Login",
    data() {
        return {
            mostrar: true,
        };
    },
    mounted() {
        this.$emit("mostrar-header", false);

        if(localStorage.getItem("token")){
            this.mostrar = false;
            this.$router.replace({name: "Inicio"});
        }

    },
    sockets:{
        INICIO(){
            this.$router.replace({name: "Inicio"});
        }
    },
    methods: {
        finalizar(token) {
            this.mostrar = false;
            this.$toast.success("¡Bienvenido de nuevo!");
            localStorage.setItem("token", token);
            this.$socket.io.opts.query = {token: token};
            this.$socket.connect();
        },
        async loginGoogle() {

            this.$gAuth.signIn().then(async GoogleUser => {

                let respuesta = await axios({
                    method:'post',
                    url:urlLogin + "/google",
                    data:{google:GoogleUser},
                    options:{
                        headers:[]
                    }
                });


                if (respuesta.data.error) {
                    this.$toast.error(respuesta.data.mensaje);
                    return;
                }

                let token = respuesta.data.token;

                if (respuesta.data.registrado) {
                    this.finalizar(token);
                } else {
                    this.$toast.info("Es necesario que finalices el registro");

                    await this.$router.push({name:'Registro',params:{token:token}});

                }

            }).catch(error => {
                console.log(error);
                if (error.error === "popup_closed_by_user") {
                    this.$toast.error("No se ha completado el inicio de sesión porque has cerrado el popup");
                }
            });

        },

    }
}
</script>

<style lang="sass" scoped>

.margen-top
  margin-top: $margen

p
  padding: 5px
  text-align: center
  font-weight: bold

svg
  overflow: visible

.cls-1
  fill: var(--letra-secundario)
  filter: drop-shadow(0.8rem 0.8rem 1.4rem var(--fondo-claro))

</style>
