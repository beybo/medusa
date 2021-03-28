<template>
    <span :class="negrita ? 'negrita '+clase : clase">{{ format(valor) }}</span>
</template>

<script>
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
        tipo: {
            type: String,
            default: "dinero",
            validator: value => ['dinero', 'porcentaje'].indexOf(value) >= 0
        }
    },
    data(){
        return {
            clase: this.tipo
        }
    },
    mounted() {
        if(this.valor>0){
            this.clase+=" positivo";
        }else{
            this.clase+=" negativo";
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
            }

            let formatter = new Intl.NumberFormat('es-ES', opciones);

            return formatter.format(valor);
        }
    }
}
</script>
<style lang="sass" scoped>

.porcentaje

  &.positivo
    color: #4cd964

  &.negativo
    color: #ff3b30

</style>