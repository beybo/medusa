<template>
    <div class="caja columna" v-if="mostrar">
        <h1>Error 404</h1>
        <p>Algo salió mal. Esta página no existe.</p>
        <button class="btn" v-on:click="inicio">Volver al Inicio</button>
    </div>
</template>

<script>
export default {
    name: "Error404",
    data() {
        return {
            mostrar: false
        }
    },
    created() {
        this.$emit("mostrar-header", false);

        setTimeout(() => {
            this.mostrar = true;
        }, 500)

    },
    methods: {
        inicio() {
            this.$router.replace({name: "Inicio"});
        }
    },
    sockets: {
        inicio() {
            console.log("INICIADO")
            this.mostrar = false;
        }
    }
}
</script>

<style lang="sass" scoped>

*
  text-align: center
  margin: $margen

</style>