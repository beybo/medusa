
const vueHelpers = {
    formatearDinero(valor){
        let formatter = new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        });

        return formatter.format(valor);
    }
}

export default {
    install(Vue){
        Vue.helpers = vueHelpers;
        Vue.prototype.$helpers = vueHelpers;
    }
}