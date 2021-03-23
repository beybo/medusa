<template>
    <nav v-if="mostrar" class="columna caja">
        <h1>Medusa</h1>
        <div class="fila">
            <router-link :to="{name:'Inicio'}">
                <font-awesome-icon :icon="['fas','home']" size="2x"/>
                <p>Inicio</p>
            </router-link>
            <router-link :to="{name:'Carteras'}">
                <font-awesome-icon :icon="['fas','wallet']" size="2x"/>
                <p>Carteras</p>
            </router-link>
            <router-link :to="{name:'Ranking'}">
                <font-awesome-icon :icon="['fas','trophy']" size="2x"/>
                <p>Ranking</p>
            </router-link>
            <router-link :to="{name:'Perfil'}">
                <font-awesome-icon :icon="['fas','user']" size="2x"/>
                <p>Perfil</p>
            </router-link>
            <span class="marcador"></span>
        </div>
    </nav>
</template>

<script>


import {library} from '@fortawesome/fontawesome-svg-core'
import {faHome, faWallet, faUser, faTrophy} from '@fortawesome/free-solid-svg-icons'

library.add(faHome, faWallet, faUser, faTrophy);

export default {
    name: "Header",
    props: ['mostrar']
}
</script>

<style scoped lang="sass">

.transparente
  background-color: transparent

h1
  margin-bottom: $margen
  color: var(--letra-secundario)

$margen-enlace: 8px
$tam-boton: 80px

a
  text-decoration: none
  text-align: center
  border-radius: 50%
  margin: $margen-enlace
  width: $tam-boton
  height: $tam-boton
  display: flex
  justify-content: center
  align-items: center
  flex-flow: column
  transition: opacity $tiempo-transicion-c linear

  p
    font-weight: bold
    color: var(--letra)
    transition: color $tiempo-transicion-c linear, opacity $tiempo-transicion-c linear

  svg
    color: var(--letra)
    transition: color $tiempo-transicion-c linear, opacity $tiempo-transicion-c linear

  &:not(.router-link-exact-active):hover
    opacity: 0.9

  &.router-link-exact-active
    cursor: initial

    p,svg
      color: var(--acento)
      opacity: var(--opacidad-seleccionado)

  $acu: $margen-enlace
  $cant: 4
  $ocultar: ""
  @for $i from 1 through $cant

    &:nth-child(#{$i}).router-link-exact-active ~ .marcador
        left: $acu

    $acu: $acu + $tam-boton + (2*$margen-enlace)
    $ocultar: $ocultar + "&:not(.router-link-exact-active) ~"

  #{$ocultar} .marcador
    display: none

.fila
  position: relative

.marcador
  position: absolute
  width: $tam-boton
  height: $tam-boton
  box-shadow: var(--sombra-interior)
  transition: left $tiempo-transicion cubic-bezier(0.645, 0.045, 0.355, 1)
  border-radius: $radio-borde-boton




</style>