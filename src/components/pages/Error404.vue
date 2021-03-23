<template>
    <div class="caja columna">
        <h1>Error 404</h1>
        <p>Algo salió mal. Esta página no existe.</p>
        <button class="btn" v-on:click="inicio">Volver al Inicio</button>
    </div>
</template>

<script>
export default {
    name: "Error404",
    created() {
        this.$emit("mostrar-header",false);
    },
    methods:{
        inicio(){
            this.$router.replace({name:"Inicio"});
        }
    }
}
</script>

<style lang="sass" scoped>

*
  text-align: center
  margin: $margen

</style>