import VueRouter from "vue-router";
import Inicio from "@/components/Inicio";
import Login from "@/components/Login";
import Cartera from "@/components/Cartera";
import Perfil from "@/components/Perfil";

const routes = [
    {
        name:'Login',
        path: '/login',
        component: Login,
    },
    {
        name: 'Inicio',
        path: '/inicio',
        component: Inicio,
    },
    {
        name: 'Cartera',
        path: '/cartera',
        component: Cartera,
    },
    {
        name: 'Perfil',
        path: '/Perfil',
        component: Perfil,
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})

