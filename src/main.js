import Config from "../app-config"

import Vue from 'vue'
import App from './App.vue'
import Router from './router'

// Plugins
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter);
Vue.use(VueResource);

import VueToastMixin from "./plugin/vue-toast-notification-mixin";

Vue.use(VueToastMixin);

import {store} from './plugin/store-datos'

import GAuth from 'vue-google-oauth2'
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

Vue.use(GAuth, {
    clientId: Config.servidor.auth_id,
    scope: 'profile email',
    prompt: 'select_account'
})

Vue.use(new VueSocketIO({
    debug: false,
    connection: SocketIO(
        'http://localhost:' + Config.servidor.puerto,
        {
            autoConnect:false,
            query: `token=${localStorage.getItem("token")}`
        }
    ),
    vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_"
    }
}));




// Componentes

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueElementLoading from "vue-element-loading";

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component("VueElementLoading", VueElementLoading);

// Iniciamos la App

Vue.config.productionTip = process.env.NODE_ENV === 'production'

new Vue({
    store,
    router: Router,
    render: h => h(App),
    mounted() {

        if(localStorage.getItem("token")){
            this.$socket.connect();
        }else if(this.$router.history.current.name !== "Login"){
            this.$router.replace({name: "Login"});
        }

    },
    sockets:{
        inicio(){

            let actual = this.$router.history.current.path;

            if(actual === "/" || actual === "/login"){
                this.$router.replace({name: "Inicio"});
            }

        },
        desconectar(){
            this.$socket.disconnect();
            localStorage.removeItem("token");
            this.$router.replace({name: "Login"});
        },
    }
}).$mount('#app');







