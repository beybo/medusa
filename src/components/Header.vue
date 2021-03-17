<template>
    <nav v-if="mostrar">
        <router-link to="/foo">Ir a foo</router-link>
        <router-link to="Inicio">Ir a inicio</router-link>
    </nav>
</template>

<script>
export default {
    name: "Header",
    props:['mostrar']
}
</script>

<style scoped lang="sass">

nav
    position: fixed
    top: 0
    left: 0
    width: 100%
    padding: 10px
    background: red
    display: none
</style>