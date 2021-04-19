<template>
  <div v-if="getConectado" class="columna">
      <div v-for="usuario in getRanking" :key="usuario.nombre" class="fila caja perfil fila">

          <div class="columna">
              <div class="contenedor-imagen columna">
                <imagen-perfil class="caja" v-bind:nombre-usuario="usuario.nombre"/>
              </div>
              <p class="margen">{{usuario.nombre}}</p>
          </div>

          <div class="columna margen datos">
              <div class="fila">
                  <h4 class="margen">Resets</h4>
                  <div>{{usuario.resets}}</div>
              </div>
              <div class="fila">
                  <h4 class="margen">Total</h4>
                  <numero :valor="usuario.total" negrita/>
              </div>
          </div>




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

.contenedor-imagen
  width: 76px
  height: 76px

.imagen-perfil
  transform: scale(0.6)

.datos .fila
  justify-content: flex-start

@media (max-width: $mobile)
  .perfil
    max-width: calc(100vw - #{($padding * 2) + $margen * 2})
</style>
