const vueHelpers = {
    cargarTema() {

    },
    mostrarHeaderInicial(router) {
        let paginasSinHeader = ["Login", "404"];
        return paginasSinHeader.indexOf(router.currentRoute.name) === -1;
    }
}

const vueFiltros = {
    fecha(fecha) {
        let f = new Intl.DateTimeFormat('es');
        return f.format(new Date(fecha));
    },
    capitalizar(value) {
        if (!value || value.length === 0) return ''
        return value.charAt(0).toUpperCase() + value.slice(1)
    }
}


export default {
    install(Vue) {
        Vue.prototype.$helpers = vueHelpers;

        Object.keys(vueFiltros).forEach(filtro => {
            Vue.filter(filtro, vueFiltros[filtro]);
        });

    }
}