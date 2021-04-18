<template>
    <nav class="columna caja">
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
    name: "Header"
}
</script>

<style scoped lang="sass">

.transparente
  background-color: transparent

h1
  font-size: 1.7em
  color: var(--letra-secundario)

$margen-enlace: 8px
$tam-boton: 80px

a
  @include marcador-enlace($margen-enlace, $tam-boton, 4, ".router-link-exact-active")

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

    p, svg
      color: var(--acento)
      opacity: var(--opacidad-seleccionado)


.fila
  position: relative

.marcador
  @include marcador($tam-boton, $tam-boton)

@media (max-width: $mobile)
  nav.caja
    height: $nav-mobile-height
    position: fixed
    bottom: 0
    z-index: 100
    left: 0
    margin: 0
    border-radius: 0
    padding: 0
    width: 100%

  .fila
    height: 100%
    width: 100%

  h1
    display: none

  .marcador
    display: none

  a
    width: 60px
    height: 60px

    p
      font-size: 0.9em
    svg
      font-size: 1.5em

</style>