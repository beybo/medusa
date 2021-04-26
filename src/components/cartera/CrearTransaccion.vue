<template>
    <div class="caja columna">

        <h2 class="margen-inf texto">{{ modo | capitalizar }}</h2>

        <div :data-simbolo="simboloDivisaMostrar" :class="claseExtra">
            <input step="any" type="number" placeholder="Cantidad..." v-model="inputValor" @keypress="esNumero($event)">
        </div>



        <p class="balance">Balance: <numero negrita :valor="modo === 'vender' ? getCantidadCartera(idDivisa) : getCantidadFiat" :simbolo="getSimbolo(idDivisa)" :tipo="modo === 'vender' ? 'criptodivisa' : 'dinero'"/></p>

        <div class="fila">

            <button class="btn-icon sm margen" @click="operarEnFiat = !operarEnFiat">
                <font-awesome-icon :icon="['fas','exchange-alt']"/>
            </button>

            <button class="btn-icon sm margen" @click="maximo" :disabled="deshabilitarBotonMax">MÁX</button>

        </div>

        <div class="margen-inf columna estimacion">
            <numero negrita v-bind:valor="valorConvertido" :simbolo="getSimbolo(idDivisa)" :tipo="operarEnFiat ? 'criptodivisa' : 'dinero'"/>
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
            operarEnFiat: true,
            simboloDivisa: simbolo,
            inputValor:"0",
        }
    },
    methods: {
        ...mapActions(['nuevaTransaccion']),

        async crearOperacion(){

            let precioActual = this.getPrecioValor(this.idDivisa);

            let cantidad = this.operarEnFiat ? this.valorConvertido : this.valor;

            let total = precioActual * parseFloat(cantidad);

            let comision = (total * 0.01) * (this.modo==="comprar" ? 1 : -1);

            let cantidadFormateada = this.$helpers.formatNumero("criptodivisa",cantidad,this.simboloDivisa),
                precioUnidadFormateado = this.$helpers.formatNumero("dinero",precioActual),
                comisionFormateado = this.$helpers.formatNumero("dinero",comision),
                totalFormateado = this.$helpers.formatNumero("dinero",(comision + total));

            let textoBoton = this.$options.filters.capitalizar(this.modo);

            let respuesta = await this.$swal({
                title: '¿Quieres confirmar la transacción?',
                html: `
                    <div class="columna">
                        <div class="caja columna">
                            <p class="margen">
                                <b>${cantidadFormateada}</b> a <b>${precioUnidadFormateado}</b>
                            </p>
                            <p>Comisión: <b>${comisionFormateado}</b></p>
                            <hr class="margen" style="width: 120px">
                            <p>Total: <b>${totalFormateado}</b></p>
                        </div>
                    </div>
                `,
                showDenyButton:true,
                confirmButtonText: textoBoton,
                denyButtonText: 'Cancelar',
                customClass: {
                    confirmButton: 'btn info',
                    denyButton: 'btn error'
                },
                timer:30000
            });

            if(respuesta.isConfirmed === true){

                let transaccion = {
                    tipo:this.modo,
                    cantidad:parseFloat(cantidad),
                    divisa:this.idDivisa,
                    precio:precioActual
                };

                this.nuevaTransaccion(transaccion).then(msg => {
                    this.valor = 0;
                    this.$toast.success(msg);
                }).catch(() => {
                    this.$toast.error('Ha ocurrido un error al procesar la transacción');
                });

            }else if(respuesta.isDismissed && respuesta.dismiss==="timer"){
                this.$swal({
                    title:"Operación Cancelada",
                    html:"Confirma la operación antes de 30 segundos para poder realizarla.",
                    confirmButtonText:"Cerrar",
                    customClass: {
                        confirmButton: 'btn error'
                    }
                })
            }

        },
        esNumero(evt){

            if(evt.key === ',' || evt.key === '.' || isFinite(evt.key))
                return true

            evt.preventDefault();

        },
        maximo(){

            if(this.modo === "comprar"){

                if(this.operarEnFiat){
                    this.valor = this.getCantidadFiat ;
                    this.valor = this.$helpers.truncarDecimales(this.valor - this.comision)
                }else{
                    this.valor = this.getCantidadFiat / this.getPrecioValor(this.idDivisa);
                }

            }else{

                if(this.operarEnFiat){
                    this.valor = this.getPrecioValor(this.idDivisa) * this.getCantidadCartera(this.idDivisa);
                    this.valor = this.$helpers.truncarDecimales(this.valor);
                }else{
                    this.valor = this.getCantidadCartera(this.idDivisa);
                }

            }

        }
    },
    computed: {
        ...mapGetters(['getPrecioValor','getSimbolo','getCantidadFiat','getCantidadCartera','getValorCartera','getCargando','getNombre']),

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

        comision(){
            return (this.operarEnFiat ? this.valor : this.valorConvertido) * 0.01;
        },

        deshabilitarBotonOperar(){

            if(this.valor<=0 || isNaN(this.valor))
                return true;

            let valorEuros = this.operarEnFiat ? this.valor : this.valorConvertido,
                valorCripto = this.operarEnFiat ? this.valorConvertido : this.valor;

            if(this.modo === 'comprar'){
                console.log((valorEuros + this.comision))
                return (valorEuros + this.comision) > this.getCantidadFiat;
            }

            return valorCripto > this.getCantidadCartera(this.idDivisa);

        },

        valorConvertido() {
            if (this.operarEnFiat) {
                return this.valor / this.getPrecioValor(this.idDivisa);
            }
            return this.getPrecioValor(this.idDivisa) * this.valor;
        },

        valor: {

            get(){
                if(this.inputValor)
                    return parseFloat(this.inputValor.toString().replace(",","."))
                else
                    return 0
            },

            set(newValue){
                this.inputValor = newValue
            }



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

.balance
  margin-top: $margen


@media (max-width: $mobile)
  input[type="number"]
    width: 123px
    padding-right: 52px

  .menos-width
    input[type="number"]
      width: 120px
      padding-right: 55px
</style>