<template>
    <div class="caja grid" v-if="getConectado">

        <imagen-perfil class="caja area-imagen" v-bind:nombre-usuario="getNombreUsuario"/>

        <div class="area-info grid-info">
            <p class="area-titulo-1">Nombre:</p>
            <b class="area-nombre">{{getNombreUsuario}}</b>
            <p class="area-titulo-2">Reseteos:</p>
            <b class="area-resets">{{getResets}}</b>
            <p class="area-titulo-3">Registro:</p>
            <b class="area-registro">{{getFechaRegistro | fecha}}</b>
        </div>

        <div class="area-ajustes grid-ajustes">

            <b class="margen-inf area-lab-1">Resetear Cartera</b>
            <b class="margen-inf area-lab-2">Tema Oscuro</b>
            <b class="margen-inf area-lab-3">Borrar Cuenta</b>

            <div class="area-bot-1 columna">
                <button class="btn-icon sm">
                    <font-awesome-icon :icon="['fas','undo-alt']"/>
                </button>
            </div>

            <div class="area-bot-2 columna">
                <input @change="cambiarTema" :checked="esTemaOscuro" type="checkbox" id="tema">
                <label for="tema"/>
            </div>

            <div class="area-bot-3 columna">
                <button class="btn-icon sm area-bot-3">
                    <font-awesome-icon :icon="['fas','trash']"/>
                </button>
            </div>

        </div>

    </div>
</template>

<script>

import ImagenPerfil from "@/components/ImagenPerfil";
import {mapActions, mapGetters} from "vuex";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrash,faUndoAlt} from '@fortawesome/free-solid-svg-icons'

library.add(faTrash,faUndoAlt);

export default {
    name: "Perfil",
    components: {ImagenPerfil},
    methods:{
        ...mapActions(['setTema']),
        cambiarTema(){
            let nuevoTema = "oscuro";
            if(this.getTema === "oscuro"){
                nuevoTema = "claro";
            }
            this.setTema(nuevoTema);
        }
    },
    computed:{
        ...mapGetters(['getConectado', 'getTema','getNombreUsuario','getResets','getFechaRegistro']),
        esTemaOscuro(){
            return this.getTema === 'oscuro';
        }
    }
}
</script>

<style scoped lang="sass">

.grid
  display: grid
  gap: 0 0
  grid-template-areas: "imagen info" "ajustes ajustes"

  @include grid-areas(["imagen", "info", "ajustes"])

.grid-info
  margin-left: $margen/2
  margin-top: $margen + $padding
  margin-bottom: $margen
  display: grid
  grid-template-rows: repeat(3, 1fr)
  gap: 0 0
  grid-template-areas: "area-titulo-1 nombre" "area-titulo-2 resets" "area-titulo-3 registro"

  p
    margin-right: 5px

  b
    overflow: hidden
    text-overflow: ellipsis
    max-width: 180px


  @include grid-areas(["area-titulo-1", "nombre","area-titulo-2","resets","area-titulo-3","registro"])


.grid-ajustes
  display: grid
  gap: 0 0
  grid-template-columns: repeat(3,1fr)
  grid-template-areas: "lab-1 lab-2 lab-3" "bot-1 bot-2 bot-3"
  align-items: center

  b
    text-align: center

  @include grid-areas(["lab-1","lab-2","lab-3","bot-1","bot-2","bot-3"])

</style>