<template>
    <form v-if="mostrar" @submit.prevent="registrar" class="columna caja">

        <imagen-perfil class="caja" v-bind:nombre-usuario="nombre"/>

        <p class="margen-inf">Por favor escribe un nombre de usuario:</p>
        <input required class="margen-inf" pattern="[a-zA-Z0-9-]+" v-model="nombre" minlength="4" type="text"
               placeholder="Nombre de usuario">

        <button :disabled="nombreValido" class="btn margen-top">Continuar</button>

    </form>
</template>

<script>
import ImagenPerfil from "@/components/ImagenPerfil";

let urlLogin = process.env.VUE_APP_MEDUSA_SERVIDOR_URL + "/login";

export default {
    name: "Registro",
    components: {ImagenPerfil},
    mounted() {
        this.token = this.$route.params.token;

        if(localStorage.getItem("token")){
            this.mostrar = false;
        }

    },
    data() {
        return {
            mostrar: true,
            token:"",
            nombre:""
        };
    },
    sockets:{
        inicio(){
            this.$router.replace({name: "Inicio"});
        }
    },
    computed:{
        nombreValido(){
            return this.nombre.trim().length < 4;
        }
    },
    methods:{
        finalizar(token) {
            this.mostrar = false;
            this.$toast.success("¡Se ha registrado con éxito!");
            localStorage.setItem("token", token);
            this.$socket.io.opts.query = {token: token};
            this.$socket.connect();
        },
        async registrar() {

            let nombre = this.nombre.trim();

            let respuesta;
            this.mostrar = false;

            try {

                respuesta = await this.$http.post(urlLogin + "/registro", {token: this.token, nombre: nombre});

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