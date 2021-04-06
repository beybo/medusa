<script>

import Chart from 'chart.js';

import {Line, mixins} from 'vue-chartjs';
import DownsamplePlugin from 'chartjs-plugin-downsample';

Chart.pluginService.register(DownsamplePlugin);

function formatearDinero(valor){
    let formatter = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    });
    return formatter.format(valor);
}

export default {
    extends: Line,
    name: "Grafico",
    mixins: [mixins.reactiveProp],
    props: {
        options: {
            default() {
                let colorLetra = getComputedStyle(document.documentElement).getPropertyValue('--letra');

                return {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    layout:{
                      padding: 5
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
                        fontFamily: 'QuickSand',
                        callbacks: {
                            label: function(t) {
                                return formatearDinero(t.yLabel);
                            }
                        }
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