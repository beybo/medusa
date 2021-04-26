<template>
    <span :class="clase">{{ !animar ? format(valor) : "" }}</span>
</template>

<script>

import {CountUp} from 'countup.js';

export default {
    name: "Numero",
    props: {
        valor: {
            type: Number,
            required: true
        },
        negrita: {
            type: Boolean,
            default: false
        },
        animar: {
            type: Boolean,
            default: false
        },
        ocultar: {
            type: Boolean,
            default: false
        },
        duracion: {
            type: Number,
            default: 2
        },
        tipo: {
            type: String,
            default: "dinero",
            validator: value => ['dinero', 'porcentaje', 'criptodivisa'].indexOf(value) >= 0
        },
        simbolo: {
            type: String,
            default:''
        }
    },
    data() {
        return {
            counter: null
        }
    },
    mounted() {

        if (this.animar) {
            this.counter = new CountUp(this.$el, this.valor, {
                formattingFn: this.format,
                duration: this.duracion,
                decimalPlaces: 2
            });
            this.counter.start();
        }
    },
    watch: {
        valor(valor) {
            if (this.animar) {
                this.counter.update(valor);
            }
        }
    },
    computed:{
        clase(){
            let clase = this.tipo;
            if (this.valor > 0) {
                clase += " positivo";
            } else if(this.valor !==0){
                clase += " negativo";
            }else{
                clase += this.ocultar ? " oculto" : "";
            }
            if(this.negrita){
                clase+=" negrita";
            }
            return clase;
        }
    },
    methods: {
        format(valor) {
            return this.$helpers.formatNumero(this.tipo,valor,this.simbolo);
        }
    }
}
</script>
<style lang="sass" scoped>

.porcentaje, .colorear

  &.positivo
    color: var(--exito)

  &.negativo
    color: var(--error)

  &.oculto
    display: none
</style>