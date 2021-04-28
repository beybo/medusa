<script>

import Chart from 'chart.js';

import {Line, mixins} from 'vue-chartjs';
import DownsamplePlugin from 'chartjs-plugin-downsample';

Chart.pluginService.register(DownsamplePlugin);



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
                    layout:{
                      padding: {
                          left: 5,
                          right: 5,
                          top: 0,
                          bottom: 0
                      }
                    },
                    animations:{
                        y:false
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false
                            },
                            display: false
                        }],
                        yAxes: [{
                            type: 'linear',
                            position: "right",
                            gridLines: {
                                display: false
                            },
                            display: false,
                            ticks: {
                                mirror: true,
                                fontColor: colorLetra,
                                fontSize: 18,
                                fontFamily: 'QuickSand',
                                fontWeight:'bold',
                                callback: formatearDinero
                            }
                        }]
                    },
                    tooltips: {
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
                    },
                    downsample: {
                        enabled: true,
                        threshold: 10
                    },
                };
            }
        }
    },
    mounted() {

        /*this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

        this.gradient.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
        this.gradient.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
        this.gradient.addColorStop(1, 'rgba(0, 231, 255, 0)');*/

        //console.log(this.gradient)

        this.addPlugin(DownsamplePlugin);

        this.renderChart(this.chartData, this.options);
    }
}
</script>