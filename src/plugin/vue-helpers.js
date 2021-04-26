const vueHelpers = {
    mostrarHeaderInicial(name) {
        return ["Login", "Registro", "404", "Politica", "Condiciones"].indexOf(name) === -1;
    },
    formatNumero(tipo,valor,simbolo){
        let opciones = {
            style: 'currency',
            currency: 'EUR'
        };

        if (tipo === "porcentaje") {
            opciones = {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        } else if (tipo === "criptodivisa") {
            opciones = {
                style: 'currency',
                currency: "MED",
                currencyDisplay: 'symbol',
                maximumFractionDigits: 8,
                minimumFractionDigits: 0
            }
        }

        let formatter = new Intl.NumberFormat('es-ES', opciones);

        return formatter.format(valor).replace("MED",simbolo);
    },
    truncarDecimales(numero, dec = 2) {
        const decimales = Math.pow(10, dec);
        return Math.trunc(numero * decimales)/decimales;
    }
}

const vueFiltros = {
    fecha(fecha) {
        let f = new Intl.DateTimeFormat('default',{
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit',
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