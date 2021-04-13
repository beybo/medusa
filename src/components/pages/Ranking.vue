<template>
  <div class="caja" v-if="getConectado">
      <div v-for="usuario in getRanking" :key="usuario.nombre" class="fila">

          <imagen-perfil class="caja" v-bind:nombre-usuario="usuario.nombre"/>

          <p class="margen">{{usuario.nombre}}</p>

          <numero :valor="usuario.total" class="margen" animar negrita/>

      </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ImagenPerfil from "@/components/ImagenPerfil";
import Numero from "@/components/Numero";

export default {
    name: "Ranking",
    components: {Numero, ImagenPerfil},
    mounted() {
        this.actualizarRanking().catch(err=>{
            this.$toast.error(err);
        });
    },
    computed:{
        ...mapGetters(['getRanking','getConectado'])
    },
    methods:{
        ...mapActions(['actualizarRanking'])
    }

}
</script>

<style scoped lang="sass">
.imagen-perfil
  width: 45px !important
  height: 45px !important
</style>
