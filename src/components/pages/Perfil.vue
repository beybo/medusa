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
        <div class="area-botones fila">
            <button class="btn">Resetear Cartera</button>
            <button class="btn aviso">Borrar Cuenta</button>
        </div>
    </div>
</template>

<script>
import ImagenPerfil from "@/components/ImagenPerfil";
import {mapGetters} from "vuex";

export default {
    name: "Perfil",
    components: {ImagenPerfil},
    computed:{
        ...mapGetters(['getConectado','getNombreUsuario','getResets','getFechaRegistro'])
    }
}
</script>

<style scoped lang="sass">

.grid
  display: grid
  gap: 0 0
  grid-template-areas: "imagen info" "botones botones"

  @include grid-areas(["imagen", "info", "botones"])

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

.area-botones
  margin-top: $margen
  justify-content: space-between
</style>