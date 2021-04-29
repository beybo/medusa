<template>
    <div class="columna">

        <titulo-carteras :orden="orden" @siguiente-orden="siguienteOrden"/>

        <div class="caja columna">
            <div v-for="id in getListadoDivisas" v-bind:key="id" class="divisa" v-on:click="abrirCartera(id)">
                <imagen-divisa :id-divisa="id" />
                <p>{{ getNombre(id) }} <br><numero v-if="id!=='fiat'" negrita class="letra-peque" v-bind:valor="getCantidadCartera(id)" v-bind:simbolo="getSimbolo(id)" tipo="criptodivisa"/></p>
                <div class="columna valor">
                    <numero v-bind:valor="getValorCartera(id)" negrita/>
                    <numero v-if="id!=='fiat'" class="letra-peque" negrita ocultar :valor="getPrecioCambio(id)" tipo="porcentaje" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import Numero from "@/components/Numero";
import ImagenDivisa from "@/components/ImagenDivisa";
import TituloCarteras from "@/components/cartera/TituloCarteras";

export default {
    name: "Carteras",
    components: {TituloCarteras, ImagenDivisa, Numero},
    data(){
        return {
            orden: this.getOrdenStorage()
        }
    },
    methods: {
        getOrdenStorage(){
            let valor = localStorage.getItem("orden");
            return valor ? valor : "precio";
        },
        abrirCartera(id) {
            if (id === "fiat") {
                this.$router.push(`/cartera-fiat`);
            } else {
                this.$router.push(`/cartera/${id}`);
            }

        },
        siguienteOrden(){

            let valores = ["precio","precio-rev","alfabetico","alfabetico-rev"];

            let pos = valores.indexOf(this.orden);

            pos++

            if(pos >= valores.length){
                pos = 0;
            }

            this.orden = valores[pos];

            localStorage.setItem("orden",this.orden);
        }
    },
    computed: {
        ...mapGetters(['getIdsCartera', 'getValorCartera', 'getSimbolo', 'getCantidadCartera','getNombre','getCartera']),
        getPrecioCambio:(state) => (id) => {

            let valorActual = state.getValorCartera(id);

            if(valorActual === 0){
                return 0;
            }

            let valorPasado = state.getCartera(id).transacciones.reduce((acu,transaccion) => {
                return acu + (((transaccion.cantidad * transaccion.precio)) * (transaccion.tipo === 'compra' ? 1 : -1));
            },0);

            return ((valorActual - valorPasado) / valorPasado);

        },
        getListadoDivisas(){

            let ids = this.getIdsCartera;

            switch (this.orden){
                case "alfabetico-rev":
                case "alfabetico":
                    ids.sort()
                    break;
                case "precio-rev":
                case "precio":

                    ids = ids.map((id)=>{
                        return {
                            valor:this.getValorCartera(id),
                            id:id
                        }
                    })

                    ids.sort((a,b)=>{
                        return b.valor - a.valor;
                    })

                    ids = ids.map((obj)=>{
                        return obj.id;
                    })

                    break;
            }

            if(this.orden.includes("-rev")){
                ids = ids.reverse();
            }

            return ids;
        }
    }
}
</script>

<style lang="sass" scoped>

.caja
  width: 360px

#total
  justify-content: space-between

.divisa
  display: grid
  padding: 10px
  width: 100%
  grid-gap: $margen
  align-items: center
  grid-template-columns: 1fr 8fr 1fr
  cursor: pointer
  transition: font-weight $tiempo-transicion-c linear

  &:hover
    font-weight: bold

    img
      transform: scale(1.2)

  img
    transition: transform $tiempo-transicion-c linear

  .valor
    align-items: flex-end

  .letra-peque
    font-size: 0.8rem

@media (max-width: $mobile)
  .caja
    width: calc(100% - #{$margen*4})


</style>
