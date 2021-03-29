const vueHelpers = {
    cargarTema() {
        let tema = "";

        if(localStorage.getItem("tema")){
            tema = localStorage.getItem("tema");
        } else if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            tema = "oscuro";
        }

        document.documentElement.setAttribute("data-tema", tema);
    },
    mostrarHeaderInicial(router){
        let paginasSinHeader = ["Login","404"];
        return paginasSinHeader.indexOf(router.currentRoute.name) === -1;
    },
    formatearFecha(fecha) {
        let f = new Intl.DateTimeFormat('es');
        return f.format(new Date(fecha));
    }
}

export default {
    install(Vue) {
        Vue.prototype.$helpers = vueHelpers;
    }
}