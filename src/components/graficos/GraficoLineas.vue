<script>
import {Line, mixins} from 'vue-chartjs';

export default {
    extends: Line,
    name: "GraficoLineas",
    mixins: [mixins.reactiveProp],
    props: {
        options: {
            default() {
                let estilos = getComputedStyle(document.body);

                let colorLetra = estilos.getPropertyValue('--letra-boton'),
                    colorFondo = estilos.getPropertyValue('--fondo-claro');

                let formatearDinero = (numero)=>{
                    return this.$helpers.formatNumero("dinero",numero)
                }

                return {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    parsing:false,
                    normalized: true,
                    layout:{
                      padding: {
                          left: 5,
                          right: 5,
                          top: 1,
                          bottom: 1
                      }
                    },
                    animations:{
                        y:false
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: true
                            },
                            display: false
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            },
                            display: false
                        }]
                    },
                    tooltips: {
                        mode:'x-axis',
                        yPadding: 10,
                        xPadding: 10,
                        position: 'nearest',
                        caretSize: 10,
                        callbacks: {
                            label: function(t) {
                                return formatearDinero(t.yLabel)
                            },
                            footer(t){
                                return t[0].xLabel;
                            },
                            title(){}
                        },
                        bodyFontSize: 14,
                        backgroundColor: colorFondo,
                        bodyFontColor: colorLetra,
                        bodyFontStyle: 'bold',
                        bodyFontFamily: 'QuickSand',
                        bodyAlign: 'center',
                        footerFontColor: colorLetra,
                        footerFontFamily: 'QuickSand',
                        footerFontStyle: 'normal',
                        displayColors: false
                    }
                };
            }
        }
    },
    mounted() {

        this.renderChart(this.chartData, this.options);

    }
}
</script>