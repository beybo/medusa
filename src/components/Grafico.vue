<script>

import { Line, mixins } from 'vue-chartjs';

export default {
    extends:Line,
    name: "Grafico",
    mixins:[mixins.reactiveProp],
    props:{
        options:{
            default(){
                return {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display:false
                            },
                            ticks: {
                                fontColor: "#000",
                                fontFamily:'QuickSand'
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display:false
                            },
                            ticks: {
                                fontColor: "#000",
                                fontFamily:'QuickSand'
                            }
                        }]
                    }
                };
            }
        }
    },
    mounted(){

        this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

        this.gradient.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
        this.gradient.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
        this.gradient.addColorStop(1, 'rgba(0, 231, 255, 0)');

        console.log(this.gradient)

        this.chartData.datasets[0].backgroundColor = this.gradient;

        this.renderChart(this.chartData,this.options);
    }
}
</script>

<style scoped>

</style>