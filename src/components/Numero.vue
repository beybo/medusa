<template>
    <span :class="negrita ? 'negrita '+clase : clase">{{!animar ? format(valor) : ""}}</span>
</template>

<script>

import { CountUp } from 'countup.js';

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
        duracion: {
            type:Number,
            default: 2
        },
        decimales:{
            type: Number,
            default: 2
        },
        tipo: {
            type: String,
            default: "dinero",
            validator: value => ['dinero', 'porcentaje', 'criptodivisa'].indexOf(value) >= 0
        }
    },
    data(){
        return {
            clase: this.tipo,
            counter: null
        }
    },
    mounted() {
        if(this.valor>0){
            this.clase+=" positivo";
        }else{
            this.clase+=" negativo";
        }
        if(this.animar){
            this.counter = new CountUp(this.$el,this.valor,{
                formattingFn:this.format,
                duration:this.duracion,
                decimalPlaces: this.decimales
            });
            this.counter.start();
        }
    },
    watch:{
        valor(valor){
            if(this.animar){
                this.counter.update(valor);
            }
        }
    },
    methods: {
        format(valor) {

            let opciones = {
                style: 'currency',
                currency: 'EUR'
            };

            if(this.tipo === "porcentaje"){
                opciones = {
                    style: 'percent',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            }else if(this.tipo === "criptodivisa"){
                opciones = {
                    style: "decimal"
                }
            }

            let formatter = new Intl.NumberFormat('es-ES', opciones);

            return formatter.format(valor);
        }
    }
}
</script>
<style lang="sass" scoped>

.porcentaje,.colorear

  &.positivo
    color: var(--exito)

  &.negativo
    color: var(--error)

</style>