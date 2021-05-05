<template>
    <div class="grid" v-if="getConectado">

        <div class="caja fila area-info">
            <imagen-perfil class="caja area-imagen" v-bind:nombre-usuario="getNombreUsuario"/>

            <div class="columna area-etiquetas">
                <p>Nombre:</p>
                <p>Reseteos:</p>
                <p>Registro:</p>
            </div>

            <div class="columna area-datos">
                <b class="area-nombre">{{getNombreUsuario}}</b>
                <b>{{getResets}}</b>
                <b>{{getFechaRegistro | fecha}}</b>
            </div>

        </div>

        <div class="caja columna area-cerrar">
            <h4 class="margen-inf">Cerrar Sesión</h4>
            <button class="btn-icon sm" @click="cerrarSesion">
                <font-awesome-icon :icon="['fas','door-closed']"/>
            </button>
        </div>

        <div class="caja columna area-tema">
            <h4 class="margen-inf">Tema Oscuro</h4>
            <input @change="cambiarTema" :checked="esTemaOscuro" type="checkbox" id="tema">
            <label for="tema"/>
        </div>

        <div class="caja columna area-reset">
            <h4 class="margen-inf">Resetear <span class="texto-extra">Cuenta</span></h4>
            <button class="btn-icon sm" @click="resetearCuenta">
                <font-awesome-icon :icon="['fas','undo-alt']"/>
            </button>
        </div>

        <div class="caja columna area-borrar">
            <h4 class="margen-inf">Borrar <span class="texto-extra">Cuenta</span></h4>
            <button class="btn-icon sm area-bot-3" @click="borrarCuenta">
                <font-awesome-icon :icon="['fas','trash']"/>
            </button>
        </div>

        <div class="caja columna area-instalar" v-if="promptInstalar">
            <h4 class="margen-inf">Instalar Aplicación</h4>
            <button class="btn" @click="promptInstalar.prompt()">Instalar</button>
        </div>


    </div>
</template>

<script>

import ImagenPerfil from "@/components/ImagenPerfil";
import {mapActions, mapGetters} from "vuex";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faDoorClosed, faTrash, faUndoAlt} from '@fortawesome/free-solid-svg-icons'

library.add(faTrash,faUndoAlt,faDoorClosed);

export default {
    name: "Perfil",
    components: {ImagenPerfil},
    props:['promptInstalar'],
    computed:{
        ...mapGetters(['getConectado', 'getTema','getNombreUsuario','getResets','getFechaRegistro']),
        esTemaOscuro(){
            return this.getTema === 'oscuro';
        }
    },
    methods:{

        ...mapActions(['setTema']),

        cerrarSesion(){
            this.$emit("cerrar-sesion");
        },

        cambiarTema(){
            let nuevoTema = "oscuro";
            if(this.getTema === "oscuro"){
                nuevoTema = "claro";
            }
            this.setTema(nuevoTema);
        },

        async resetearCuenta(){
            let respuesta = await this.getSwalAccion('¿Quieres resetear la cuenta?','Resetear');

            if(respuesta.isConfirmed === true){
                this.$socket.emit('resetear');
                this.$toast.success("Cuenta reseteada con éxito!");
            }
        },

        async borrarCuenta(){

            let respuesta = await this.getSwalAccion('¿Quieres borrar la cuenta?','Borrar');

            if(respuesta.isConfirmed === true){
                this.$socket.emit('borrar-cuenta');
            }

        },

        async getSwalAccion(titulo,boton){

            let nombreUsuario = this.getNombreUsuario

            return await this.$swal({
                title: titulo,
                html: `<p>Para ${boton.toLowerCase()} la cuenta por favor escribe: '<b>${nombreUsuario}</b>'</p>`,
                input: 'text',
                showDenyButton:true,
                confirmButtonText: boton,
                denyButtonText: 'Cancelar',
                customClass: {
                    confirmButton: 'btn error',
                    denyButton: 'btn info'
                },
                inputAttributes:{
                    placeholder: `Escribir ${nombreUsuario}...`
                },
                inputValidator(inputValue) {
                    return inputValue !== nombreUsuario ? 'Tienes que escribir el nombre correctamente' : false;
                },
                onOpen: (s)=>{

                    let confirmButton = s.querySelector(".swal2-confirm"),
                        input = s.querySelector(".swal2-input");

                    confirmButton.disabled = true;

                    input.addEventListener("keyup",()=>{
                        confirmButton.disabled = input.value !== nombreUsuario;
                    })

                }
            });
        }

    }
}
</script>

<style scoped lang="sass">

.grid
  display: grid
  grid-template-columns: repeat(2,1fr)
  gap: 0 0
  grid-template-areas: "info info" "cerrar tema" "reset borrar" "instalar instalar"

  @include grid-areas(["info", "cerrar", "tema", "reset", "borrar", "instalar"])

.area-info

  .imagen-perfil
    margin: 0 $margen+5px 0 0

  .columna
    justify-content: space-around
    height: 100%
    align-items: flex-start

  p
    text-align: left
    margin-right: 5px

  b
    overflow: hidden
    text-overflow: ellipsis
    max-width: 180px

.btn-icon
  transform: scale(1.3,1.3)


@media (max-width: $mobile)
  .grid
    width: 100%

  .area-info
    display: grid
    grid-template-columns: repeat(3,1fr)
    gap: 0 0
    grid-template-areas: "imagen imagen imagen" "etiquetas datos datos"

    @include grid-areas(["imagen", "etiquetas", "datos"])

  .imagen-perfil
    justify-self: center

  .area-etiquetas,.area-datos
    margin-top: $margen*1.5

  .texto-extra
    display: none

  h4
    font-size: 0.86em
    text-align: center
</style>