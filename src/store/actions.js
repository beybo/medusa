export let actions = {

    // Tema

    setTema(context,tema){
        context.commit("cambiar_tema",tema);
        localStorage.setItem("tema",tema);
        document.body.dataset.tema = tema;
    },

    cargarTema(context) {

        let tema = "claro";

        if (localStorage.getItem("tema")) {
            tema = localStorage.getItem("tema");
        } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            tema = "oscuro";
        }

        context.commit("cambiar_tema",tema);

        document.body.dataset.tema = tema;

    },

    // Usuario

    setConectado(context,conectado){
        context.commit("set_conectado",conectado)
    },

    // Divisas

    nuevaTransaccion(context,transaccion){

        context.commit("set_cargando",true);

        return new Promise((resolve,reject) => {

            this._vm.$socket.emit("transaccion",transaccion,(error,datos)=>{

                context.commit("set_cargando",false);

                if(error){
                    reject(datos);
                }else{
                    context.commit("nueva_transaccion",datos);
                    resolve("La transaccion se ha completado con éxito");
                }

            });

        });



    }

}