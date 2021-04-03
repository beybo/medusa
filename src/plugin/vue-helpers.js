const vueHelpers = {
    cargarTema() {

    },
    mostrarHeaderInicial(name) {
        return ["Login", "Registro", "404"].indexOf(name) === -1;
    }
}

const vueFiltros = {
    fecha(fecha) {
        let f = new Intl.DateTimeFormat('default',{
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false,
        });
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