<template>
    <img ref="imagen" class="imagen-perfil" :alt="'Imagen de perfil de '+nombreUsuario">
</template>

<script>
import {alea} from 'seedrandom';

export default {
    name: "ImagenPerfil",
    props: {
        tam: {
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

            canvas.width = Math.round(4 * this.tam);
            canvas.height = Math.round(4 * this.tam);

            let ctx = canvas.getContext("2d");
            ctx.scale(4,4);

            return {canvas,ctx};
        },
        pintarPerfil(ctx) {

            ctx.clearRect(0,0,this.tam,this.tam);

            const CUADRADOS = 6,
                  TAM = this.tam / CUADRADOS,
                  MIN_CUADRADOS = 8;

            let arng = new alea(this.nombreUsuario);

            // Convertimos el color calculado a la Y de YIQ
            // Es decir a blanco y negro y comprobamos si es muy clara
            let r,g,b,contraste;
            do{
                r = Math.floor(arng() * (255 + 1));
                g = Math.floor(arng() * (255 + 1));
                b = Math.floor(arng() * (255 + 1));
                contraste = ((r*299)+(g*587)+(b*114))/1000;
            }while (contraste>200);

            ctx.fillStyle = `rgb(${r},${g},${b})`;

            let pos = [],
                total = 0;

            for(let y = 0; y < CUADRADOS; y++){

                for(let x = 0; x < CUADRADOS; x++){

                    if(!pos[(y*10) + x] && Math.round(arng())===1){
                        ctx.fillRect(x*TAM ,y*TAM,TAM,TAM);
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

            this.$refs.imagen.style.width = this.tam + "px";
            this.$refs.imagen.style.height = this.tam + "px";

            this.$refs.imagen.src = canvas.toDataURL();

        }
    }
}
</script>
<style scoped lang="sass">

.imagen-perfil
  background: #E4EBF5

</style>
