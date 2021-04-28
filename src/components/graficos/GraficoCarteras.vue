<template>
    <div class="grafico">
        <grafico-tarta class="altura" :chart-data="getDatosGrafica"/>
        <p class="descripcion">Lo que aporta cada divisa</p>
    </div>
</template>

<script>
import GraficoTarta from "@/components/graficos/GraficoTarta";
import {mapGetters} from "vuex";
export default {
    name: "GraficoCarteras",
    components: {GraficoTarta},
    computed:{
        ...mapGetters(['getValorCartera','getIdsDivisa','getColorDivisa','getNombre']),
        getDatosGrafica() {

            let datosGrafica = {
                labels: [],
                datasets: [
                    {
                        data: [],
                        label: "Precio",
                        borderColor:"transparent",
                        backgroundColor:[]
                    },
                ]
            };

            this.getIdsDivisa.forEach(id=>{

                let precio = this.getValorCartera(id);

                if(precio===0)
                    return

                datosGrafica.labels.push(this.getNombre(id));
                datosGrafica.datasets[0].data.push(precio);
                datosGrafica.datasets[0].backgroundColor.push(this.getColorDivisa(id));

            });

            return datosGrafica;
        }
    }
}
</script>

<style scoped lang="sass">
.grafico
  margin-top: $margen
  overflow: hidden
.altura
  height: 200px
.descripcion
  text-align: center
  margin-top: $margen
</style>