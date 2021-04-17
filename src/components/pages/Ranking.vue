<template>
  <div v-if="getConectado">
      <div v-for="usuario in getRanking" :key="usuario.nombre" class="fila caja perfil">

          <imagen-perfil class="caja" v-bind:nombre-usuario="usuario.nombre"/>

          <div>

          </div>
          <p class="margen">{{usuario.nombre}}</p>

          <numero :valor="usuario.total" class="margen" negrita/>

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

.perfil
  width: 100%
  max-width: 300px

.imagen-perfil
  width: 45px !important
  height: 45px !important

@media (max-width: $mobile)
  .perfil
    max-width: calc(100vw - #{($padding * 2) + $margen * 2})
</style>
