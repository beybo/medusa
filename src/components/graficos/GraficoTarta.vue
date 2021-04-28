<script>

import {Pie, mixins} from 'vue-chartjs';

export default {
    extends: Pie,
    name: "GraficoTarta",
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
                    tooltips: {
                        yPadding: 10,
                        xPadding: 10,
                        position: 'nearest',
                        caretSize: 10,
                        callbacks: {
                            label: function(t,d) {
                                return formatearDinero(d.datasets[0].data[t.index]);
                            },
                            footer(t,d){
                                return d.labels[t[0].index];
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
                        footerFontStyle: 'bold',
                        displayColors: false
                    }
                };
            }
        }
    },
    mounted() {
        this.renderChart(this.chartData,this.options);
    }
}
</script>