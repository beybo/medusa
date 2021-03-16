import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import GAuth from 'vue-google-oauth2'

import Config from "../app-config"

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Divisas from './plugin/store-divisas'
import SocketIO from "socket.io-client";
import VueSocketIO from "vue-socket.io";
import VueToastMixin from "./plugin/vue-toast-notification-mixin";

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Divisas);
Vue.use(VueToastMixin);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false


const gauthOption = {
    clientId: Config.servidor.auth_id,
    scope: 'profile email',
    prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)

// Cargamos socket io
Vue.use(new VueSocketIO({
    debug: false,
    connection: SocketIO(
        'http://localhost:' + Config.servidor.puerto,
        {
            autoConnect:false,
            query: `token=${localStorage.getItem("token")}`
        }
    )
}));

new Vue({
    router: Router,
    render: h => h(App),
    mounted() {

        if(localStorage.getItem("token")){
            console.log(this.$socket.io.opts.query.token);
            this.$socket.connect();
        }else if(this.$router.history.current.name !== "Login"){
            this.$router.replace({name: "Login"});
        }

    },
    sockets:{
        inicio(datos){
            console.log("INICIOOO");

            let actual = this.$router.history.current.path;

            if(actual === "/" || actual === "/login"){

                this.$divisas = datos.divisas;

                this.$router.replace({name: "Inicio"});
            }

        },
        connect(){
            //this.$socket.emit("auth",localStorage.getItem("token"));
        },
        disconnect(){

        }
    }
}).$mount('#app');







