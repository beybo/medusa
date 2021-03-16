<template>
    <div id="app" class="columna">
        <Header v-bind:mostrar="mostrarHeader"/>
        <router-view/>
    </div>
</template>

<script>

import Header from "@/components/Header"


export default {
    name: 'App',
    components: {
        Header
    },
    data(){
        return {
            mostrarHeader: true
        }
    },
    mounted() {
        if(this.$router.history.current.name === "Login"){
            this.mostrarHeader = false;
        }
    },
    watch:{
        $route (to){
            this.mostrarHeader = to.name !== "Login";
        }
    },
}
</script>
<style lang="sass">

@import "assets/sass/main"

</style>