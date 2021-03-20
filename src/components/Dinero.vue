<template>
    <span :class="negrita ? 'negrita' : ''">{{format(valor)}}</span>
</template>

<script>
export default {
    name: "Dinero",
    props: {
        valor: {
            type:Number,
            required:true
        },
        negrita: {
            type:Boolean,
            default: false
        }
    },
    methods:{
        format(valor){
            return this.$helpers.formatearDinero(valor)
        }
    }
}
</script>