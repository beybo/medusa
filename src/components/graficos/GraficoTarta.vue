<script>

import {Doughnut, mixins} from 'vue-chartjs';

export default {
    extends: Doughnut,
    name: "GraficoTarta",
    mixins: [mixins.reactiveProp],
    props: {
        options: {
            default() {

                let ids = this.chartData.datasets[0].ids;

                let self = this;

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
                    tooltips: {
                        enabled: false
                    },
                    hover: {
                        onHover: function (e, item) {
                            if (item.length) {
                                let id = ids[item[0]._index];
                                self.$emit("hover",id);
                            }else{
                                self.$emit("hover","");
                            }
                        }
                    },
                    onClick: (e,item)=>{
                        if (item.length) {
                            let id = ids[item[0]._index];
                            self.$emit("click",id);
                        }else{
                            self.$emit("click","");
                        }
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
<style scoped lang="sass">
canvas
    position: relative
    z-index: 3
</style>