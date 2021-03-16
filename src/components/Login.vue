<template>
    <transition name="bounce" mode="out-in">
        <div v-if="estado === 0" key="on" class="caja columna">

            <h2>Medusa</h2>

            <p class="margen-top">Bienvenido a Medusa, el simulador de criptodivisas más fácil de usar.</p>
            <p class="margen-bottom">Para continuar inicia sesión</p>
            <button @click.prevent="loginGoogle"><font-awesome-icon :icon="['fab','google']"/> Iniciar Sesión con Google</button>

        </div>
        <form @submit.prevent="registrar" v-else key="off" class="caja columna">

            <h2>Medusa</h2>

            <p>Por favor escribe un nombre de usuario:</p>
            <input pattern="[a-zA-Z0-9-]+" v-model="nombre" minlength="4" type="text" placeholder="Nombre de usuario">
            <button>Continuar</button>

        </form>
    </transition>

</template>

<script>

import Config from '@/../app-config'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

library.add(faGoogle);

let urlLogin = Config.servidor.url + ":" + Config.servidor.puerto + "/login";

export default {
    name: "Login",
    data() {
        return {
            estado:0,
            permitirRegistro:false,
            nombre:""
        };
    },
    methods: {
        finalizar(token){
            localStorage.setItem("token",token);
            this.$socket.io.opts.query = {token:token};
            this.$socket.connect();
        },
        loginGoogle() {

            this.$gAuth.signIn().then(async GoogleUser => {

                let respuesta = await this.$http.post(urlLogin+"/google", {google: GoogleUser});

                console.log(respuesta.body);

                if (!respuesta.body.error) {

                    let token = respuesta.body.token;

                    if(respuesta.body.registrado){
                        this.$toast.success("¡Bienvenido de nuevo!");
                        this.finalizar(token);
                    }else{
                        this.$toast.info("Es necesario que finalices el registro");
                        this.token = token;
                        this.estado++;
                    }

                } else {
                    this.$toast.error(respuesta.body.mensaje);
                }

            }).catch(error => {
                console.log(error);
                if(error.error === "popup_closed_by_user"){
                    this.$toast.error("No se ha completado el inicio de sesión porque has cerrado el popup");
                }
            });

        },
        async registrar(){
            //todo implementar
            //https://github.com/biigpongsatorn/vue-element-loading
            let nombre = this.nombre.trim();

            let respuesta;

            try{
                respuesta = await this.$http.post(urlLogin+"/registro",{token:this.token,nombre:nombre});

                console.log(respuesta.body);

                if (!respuesta.body.error) {

                    this.finalizar(respuesta.body.token);

                } else {
                    this.$toast.error(respuesta.body.mensaje);
                }

            }catch (err){
                console.log(err);
                this.$toast.error("Ha ocurrido un error");
            }

        }
    }
}
</script>

<style lang="sass" scoped>

    h2
        margin-bottom: $margen
        text-align: center
        color: $color-acento

    .margen-top
        margin-top: $margen

    .margen-bottom
        margin-bottom: $margen

</style>