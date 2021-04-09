<template>
    <div class="caja columna">

        <h2 class="margen-inf texto">{{ modo | capitalizar }}</h2>

        <div :data-simbolo="simboloDivisaMostrar" :class="claseExtra">
            <input type="number" placeholder="Cantidad..." v-model="valor" @keypress="esNumero($event)">
        </div>

        <div class="fila">

            <button class="btn-icon sm margen" @click="operarEnFiat = !operarEnFiat">
                <font-awesome-icon :icon="['fas','exchange-alt']"/>
            </button>

            <button class="btn-icon sm margen" @click="maximo" :disabled="deshabilitarBotonMax">MÁX</button>

        </div>

        <div class="margen-inf columna estimacion">
            <numero negrita v-bind:valor="valorConvertido" v-bind:simbolo="getSimbolo(idDivisa)" v-bind:tipo="operarEnFiat ? 'criptodivisa' : 'dinero'"/>
        </div>

        <button class="btn" @click="crearOperacion" :disabled="deshabilitarBotonOperar">{{ modo | capitalizar }}</button>

        <vue-element-loading :active="getCargando" color="#fc651f"/>

    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Numero from "@/components/Numero";
import VueElementLoading from "vue-element-loading";

export default {
    name: "CrearTransaccion",
    components: {Numero,VueElementLoading},
    props: {
        modo: {
            type: String,
            required: true,
            validator: value => ['comprar', 'vender'].indexOf(value) >= 0
        },
        idDivisa: {
            type: String,
            required: true
        },
    },
    data() {

        let simbolo = this.$store.getters.getSimbolo(this.idDivisa).toUpperCase();

        return {
            operarEnFiat: false,
            simboloDivisa: simbolo,
            valor:0,
        }
    },
    methods: {
        ...mapActions(['nuevaTransaccion']),

        crearOperacion(){

            this.cargando = true;

            let precioActual = this.getPrecioValor(this.idDivisa);

            let cantidad = this.operarEnFiat ? this.valorConvertido : this.valor;

            let transaccion = {
                tipo:this.modo,
                cantidad:parseFloat(cantidad),
                divisa:this.idDivisa,
                precio:precioActual
            };

            this.nuevaTransaccion(transaccion).then(msg => {
                this.valor = 0;
                this.cargando = false;
                this.$toast.success(msg);
            }).catch(err => {
                this.$toast.error(err);
            });

        },
        esNumero(evt){

            if(evt.key === ',' || evt.key === '.' || isFinite(evt.key))
                return true

            evt.preventDefault();

        },
        maximo(){

            if(this.modo === "comprar"){

                if(this.operarEnFiat){
                    this.valor = this.getCantidadFiat;
                }else{
                    this.valor = this.getCantidadFiat / this.getPrecioValor(this.idDivisa);
                }

            }else{

                if(this.operarEnFiat){
                    this.valor = this.getPrecioValor(this.idDivisa) * this.getCantidadCartera(this.idDivisa);
                }else{
                    this.valor = this.getCantidadCartera(this.idDivisa);
                }

            }

        }
    },
    computed: {
        ...mapGetters(['getPrecioValor','getSimbolo','getCantidadFiat','getCantidadCartera','getValorCartera','getCargando']),

        simboloDivisaMostrar() {
            return this.operarEnFiat ? "EUR" : this.simboloDivisa;
        },

        claseExtra() {
            return this.simboloDivisaMostrar.length > 3 ? 'menos-width' : '';
        },

        deshabilitarBotonMax(){
            if(this.modo === 'comprar'){
                return this.getCantidadFiat === 0;
            }

            return this.getCantidadCartera(this.idDivisa) === 0;
        },

        deshabilitarBotonOperar(){

            if(this.valor<=0 || isNaN(this.valor))
                return true;

            let valorEuros = this.operarEnFiat ? this.valor : this.valorConvertido,
                valorCripto = this.operarEnFiat ? this.valorConvertido : this.valor;

            if(this.modo === 'comprar'){
                return valorEuros > this.getCantidadFiat;
            }

            return valorCripto > this.getCantidadCartera(this.idDivisa);

        },

        valorConvertido() {
            if (this.operarEnFiat) {
                return this.valor / this.getPrecioValor(this.idDivisa);
            }
            return this.getPrecioValor(this.idDivisa) * this.valor;
        }

    },
    sockets:{
        TRANSACCION(datos){
            console.log(datos);
            console.log("funciona")
        }
    }
}
</script>

<style scoped lang="sass">

input[type="number"]
  width: 98px
  padding-right: 52px

.menos-width
  input[type="number"]
    width: 95px
    padding-right: 55px

[data-simbolo]
  position: relative

  &:after
    content: attr(data-simbolo)
    position: absolute
    top: 50%
    transform: translateY(-50%)
    right: $margen
    font-weight: bold

.btn-icon
  padding: 0
  width: 42px
  height: 42px
  margin-left: $margen

</style>