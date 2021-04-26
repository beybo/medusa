<template>
    <div class="columna grid" v-if="getConectado">
        <div class="area-grafico caja">
            <grafico-divisa class="altura" :id-divisa="idDivisa"/>
        </div>
        <div class="area-selector caja">
            <h2 class="texto">Divisa</h2>
            <v-select class="select margen" :options="getIdsDivisa" v-model="idDivisa" :clearable="false" :searchable="false" :calculate-position="posicionamiento" append-to-body>
                <template v-slot:option="option" class="fila">
                    <imagen-divisa :id-divisa="option.label" tam="35" />
                    {{ getNombre(option.label) }}
                </template>
                <template v-slot:selected-option="option" class="fila">
                    <imagen-divisa :id-divisa="option.label" tam="35"/>
                    {{ getNombre(option.label) }}
                </template>
            </v-select>
            <div class="columna">
                <router-link :to="{name:'Cartera',params:{id:idDivisa}}" class="enlace-transparente" :style="estiloEnlace">Crear Transacción</router-link>
            </div>
        </div>

        <precio-divisa class="area-precio" :id-divisa="idDivisa" />

        <transition name="ocultar-corto" mode="out-in">
            <div class="caja area-info columna" :key="idDivisa">

                <h2 class="texto">Información sobre {{getNombre(idDivisa)}}</h2>

                <div class="descripcion margen">{{getDivisa(idDivisa).descripcion}}</div>

                <a class="enlace-transparente margen" target="_blank" rel="noopener noreferrer" :href="getEnlaces.wikipedia" :style="estiloEnlace">Seguir Leyendo en Wikipedia</a>

                <h4 class="texto margen-inf">Enlaces Relevantes</h4>

                <div class="fila margen enlaces">
                    <a target="_blank" rel="noopener noreferrer" :href="getEnlaces.pagina" class="btn-icon">
                        <font-awesome-icon :icon="['fas','home']" size="2x"/>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" :href="'https://twitter.com/'+getEnlaces.twitter" class="btn-icon">
                        <font-awesome-icon :icon="['fab','twitter']" size="2x"/>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" :href="getEnlaces.reddit" class="btn-icon">
                        <font-awesome-icon :icon="['fab','reddit']" size="3x"/>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" :href="getEnlaces.github" class="btn-icon">
                        <font-awesome-icon :icon="['fab','github']" size="3x"/>
                    </a>
                </div>

            </div>
        </transition>

    </div>
</template>

<script>

import {mapGetters} from 'vuex'
import GraficoDivisa from "@/components/graficos/GraficoDivisa";
import ImagenDivisa from "@/components/ImagenDivisa";
import PrecioDivisa from "@/components/cartera/PrecioDivisa";
import { createPopper } from '@popperjs/core';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faGithub,faWikipediaW,faTwitter,faReddit} from '@fortawesome/free-brands-svg-icons'
import {faHome} from '@fortawesome/free-solid-svg-icons'

library.add(faGithub,faWikipediaW,faTwitter,faReddit,faHome);

export default {
    name: 'Inicio',
    components: {PrecioDivisa, ImagenDivisa, GraficoDivisa},
    data() {
        return {
            idDivisa: "bitcoin"
        }
    },
    computed: {
        ...mapGetters(['getConectado','getPrecioValor','getIdsDivisa','getNombre',"getDivisa",'getColorDivisa']),
        getEnlaces(){
            return this.getDivisa(this.idDivisa).enlaces;
        },
        estiloEnlace(){
            let color = this.getColorDivisa(this.idDivisa)
            return {
                color
            }
        }
    },
    methods: {
        posicionamiento(dropdownList, component, {width}){
            dropdownList.style.width = width;

            const popper = createPopper(component.$refs.toggle, dropdownList, {
                placement: 'bottom',
                modifiers: [
                    {
                        name: 'offset', options: {
                            offset: [0, -1]
                        }
                    },
                    {
                        name: 'toggleClass',
                        enabled: true,
                        phase: 'write',
                        fn ({state}) {
                            component.$el.classList.toggle('drop-up', state.placement === 'top')
                        },
                    }]
            });

            return () => popper.destroy();
        },
        siguiente() {
            let divisas = this.getIdsDivisa;

            let indice = divisas.indexOf(this.idDivisa);

            indice++;

            if (indice >= divisas.length) {
                indice = 0;
            }

            this.idDivisa = divisas[indice];

        }
    }
}
</script>

<style scoped lang="sass">

.grid
  display: grid
  grid-template-columns: repeat(2, 1fr)
  grid-template-rows: auto 1fr auto
  gap: 0 0
  grid-template-areas: "grafico grafico" "selector precio" "info info"

  @include grid-areas(["grafico","selector","precio","info"])

.area-selector,.area-precio
  height: 150px

.ul
  text-decoration: underline
  cursor: pointer

.area-grafico .altura
  height: 250px
  max-width: 500px
  width: 100%

.area-info

  .descripcion
    @include scroll-bar
    max-width: 500px
    white-space: pre-line
    text-align: justify
    text-justify: inter-word
    max-height: 200px
    overflow-y: scroll
    padding: 10px
    box-shadow: var(--sombra-interior)
    border-radius: $radio-borde 0 0 $radio-borde

  .btn-icon
    display: flex
    justify-content: center
    align-items: center
    margin: 0 $margen

.enlace-transparente
  margin-bottom: $margen * 2
  font-weight: bold
  padding: 10px 15px
  text-decoration: none
  border: 2px solid
  transition: transform $tiempo-transicion-c linear
  border-radius: $radio-borde-boton

  &:hover
    transform: scale(0.9)



@media (max-width: $mobile)
  .grid
    grid-template-columns: repeat(1, 1fr)
    grid-template-rows: auto 1fr 1fr
    grid-template-areas: "grafico" "precio" "selector" "info"

  .area-grafico .altura
    max-width: 70vw
    height: 200px

  .area-info
    width: calc(100vw - #{$margen*4})

  .enlaces
    flex-flow: row wrap

    a
      margin: $margen !important

</style>
