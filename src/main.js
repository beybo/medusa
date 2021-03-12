import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import Router from './router'
import Session from "./session"
import VueRouter from 'vue-router'

import SocketIO from 'socket.io-client'

import Config from "../app-config"

Vue.use(VueRouter)

Vue.config.productionTip = false

const app = new Vue({
    router:Router,
    render: h => h(App),
}).$mount('#app');

if(Session.getSession()){
    Vue.use(new VueSocketIO({
        debug: true,
        connection: SocketIO('127.0.0.1:' + Config.servidor.puerto)
    }));
}else if(app.$router.history.current.path!=="/login"){
    app.$router.push({path:"/login"});
}





