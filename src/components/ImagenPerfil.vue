<template>
    <img ref="imagen" class="imagen-perfil" :alt="'Imagen de perfil de '+nombreUsuario">
</template>

<script>
import {alea} from 'seedrandom';

export default {
    name: "ImagenPerfil",
    props: {
        ancho: {
            type: Number,
            default: 90
        },
        nombreUsuario: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            canvas: null,
            ctx: null
        }
    },
    mounted() {

        let {canvas,ctx} = this.prepararCanvas();

        this.canvas = canvas;
        this.ctx = ctx;

        this.pintarPerfil(ctx);

        this.cargarImagen(canvas);

    },
    watch:{
        nombreUsuario(){

            this.pintarPerfil(this.ctx);

            this.cargarImagen(this.canvas);

        }
    },
    methods: {
        prepararCanvas() {
            let canvas = document.createElement("canvas");

            canvas.width = Math.round(devicePixelRatio * this.ancho);
            canvas.height = Math.round(devicePixelRatio * this.ancho);

            let ctx = canvas.getContext("2d");
            ctx.scale(devicePixelRatio,devicePixelRatio);

            return {canvas,ctx};
        },
        pintarPerfil(ctx) {

            ctx.clearRect(0,0,this.ancho,this.ancho);

            const CUADRADOS = 6,
                  TAM = this.ancho / CUADRADOS,
                  MIN_CUADRADOS = 8;

            let arng = new alea(this.nombreUsuario);

            let colores = [];
            for(let i = 0; i < 3; i++){
                let c = Math.floor(arng() * (255 + 1));
                colores.push(c)
            }

            ctx.fillStyle = `rgb(${colores.join(',')})`;

            let pos = [],
                total = 0;

            for(let y = 0; y < CUADRADOS; y++){

                for(let x = 0; x < CUADRADOS; x++){

                    if(!pos[(y*10) + x] && Math.round(arng())===1){
                        ctx.fillRect(x*TAM,y*TAM,TAM,TAM);
                        pos[(y*10) + x] = true;
                        total++;
                    }

                }

                if(y === CUADRADOS-1 && total < MIN_CUADRADOS){
                    y = 0;
                }

            }



        },
        cargarImagen(canvas) {

            this.$refs.imagen.style.width = this.ancho + "px";
            this.$refs.imagen.style.height = this.ancho + "px";

            this.$refs.imagen.src = canvas.toDataURL();

        }
    }
}
</script>
<style scoped lang="sass">

.imagen-perfil
  background: #E4EBF5

</style>
