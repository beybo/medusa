export let actions = {

    // Tema

    setTema(context,tema){
        context.commit("CAMBIAR_TEMA",tema);
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

        context.commit("CAMBIAR_TEMA",tema);

        document.body.dataset.tema = tema;

    },

    // Usuario

    setConectado(context,conectado){
        context.commit("SET_CONECTADO",conectado)
    },

    // Divisas

    nuevaTransaccion(context,transaccion){

        context.commit("SET_CARGANDO",true);

        return new Promise((resolve,reject) => {

            this._vm.$socket.emit("TRANSACCION",transaccion,(error,datos)=>{

                context.commit("SET_CARGANDO",false);

                if(error){
                    reject(datos);
                }else{
                    context.commit("NUEVA_TRANSACCION",datos);
                    resolve("La transaccion se ha completado con éxito");
                }

            });

        });



    }

}