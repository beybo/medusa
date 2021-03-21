import VueRouter from "vue-router";
import Inicio from "@/components/pages/Inicio";
import Login from "@/components/pages/Login";
import Cartera from "@/components/pages/Cartera";
import Perfil from "@/components/pages/Perfil";

const routes = [
    {
        name: 'Login',
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

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;

