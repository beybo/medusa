<template>
    <img :src="getRuta()" :width="tam" :height="tam"/>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "ImagenDivisa",
    props:{
        tema:{
            type:String,
            default:'auto'
        },
        idDivisa:{
            type:String,
            required:true
        },
        tam:{
            type: String,
            default: '40'
        }
    },
    computed:{
        ...mapGetters(['getDivisa','getSimbolo']),
        /*getRuta(){

            let simbolo =  this.idDivisa === 'fiat' ? 'eur' : this.getSimbolo(this.idDivisa);
            let tema = 'color';
            return `../assets/img/crypto-icons/${tema}/${simbolo.toLowerCase()}.svg`
        }*/
    },
    mounted() {
    },
    methods:{
        getRuta(){
            let simbolo =  this.idDivisa === 'fiat' ? 'eur' : this.getSimbolo(this.idDivisa);
            let tema = 'color';
            return require(`../assets/img/crypto-icons/${tema}/${simbolo.toLowerCase()}.svg`);
        }
    }
}
</script>

<style scoped>

</style>