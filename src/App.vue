<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <Header/>
        <router-view/>
    </div>
</template>

<script>

import Header from "@/components/Header";


export default {
    name: 'App',
    components: {
        Header
    },
    mounted() {

    }
}
</script>
<style lang="sass">

#app
  font-family: QuickSand, Helvetica, Arial, sans-serif !important
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px

</style>