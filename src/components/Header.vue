<template>
    <nav>
        <router-link to="/foo">Ir a foo</router-link>
        <router-link to="/bar">Ir a bar</router-link>
    </nav>
</template>

<script>
export default {
    name: "Header"
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

</style>