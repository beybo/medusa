import Vue from 'vue'
import App from './App.vue'
import Router from './router/index'

// Plugins
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import GAuth from 'vue-google-oauth2'

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.use(GAuth, {
    clientId: process.env.VUE_APP_G_AUTH_ID,
    scope: 'profile email',
    prompt: 'select_account'
})


// Propios

import VueToastMixin from "./plugin/vue-toast-notification-mixin";
import VueHelper from '@/plugin/vue-helpers'

Vue.use(VueToastMixin);
Vue.use(VueHelper);

import {index} from './store'

// Socket y alertas
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(new VueSocketIO({
    debug: false,
    connection: SocketIO(
        process.env.VUE_APP_MEDUSA_SERVIDOR_URL,
        {
            autoConnect: false,
            query: `token=${localStorage.getItem("token")}`
        }
    ),
    vuex: {
        store: index,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_"
    }
}));

Vue.use(VueSweetalert2,{
    customClass:{
        confirmButton: 'btn info',
        cancelButton: 'btn error',
        denyButton: 'btn error'
    },
    buttonsStyling: false,
    reverseButtons: true
});

// Componentes

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import VueElementLoading from "vue-element-loading";
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component("VueElementLoading", VueElementLoading);
Vue.component('v-select', vSelect)

// Iniciamos la App

Vue.config.productionTip = process.env.NODE_ENV === 'production'

new Vue({
    store: index,
    router: Router,
    render: h => h(App)
}).$mount('#app');
