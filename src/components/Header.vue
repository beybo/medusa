<template>
    <nav v-if="mostrar" class="columna caja">
        <h1>Medusa</h1>
        <div class="fila">
            <router-link :to="{name:'Inicio'}">
                <font-awesome-icon :icon="['fas','home']" size="2x"/>
                <p>Inicio</p>
            </router-link>
            <router-link :to="{name:'Cartera'}">
                <font-awesome-icon :icon="['fas','wallet']" size="2x"/>
                <p>Cartera</p>
            </router-link>
            <router-link :to="{name:'Perfil'}">
                <font-awesome-icon :icon="['fas','user']" size="2x"/>
                <p>Perfil</p>
            </router-link>
        </div>
    </nav>
</template>

<script>


import {library} from '@fortawesome/fontawesome-svg-core'
import {faHome, faWallet, faUser} from '@fortawesome/free-solid-svg-icons'

library.add(faHome, faWallet, faUser);

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

a
  margin: 10px 30px
  text-decoration: none
  text-align: center
  border-radius: 50%
  transition: opacity $tiempo-transicion linear

  p
    font-weight: bold
    color: $color-letra-intermedia
    transition: border-bottom $tiempo-transicion linear
    border-bottom: 3px solid transparent

  svg
    color: $color-letra-intermedia

  &:not(.router-link-exact-active):hover
    opacity: 0.4

  &.router-link-exact-active
    cursor: initial

    p
      border-bottom: 3px solid $color-letra-intermedia


</style>