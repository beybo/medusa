import VueRouter from "vue-router";
import Inicio from "@/components/pages/Inicio";
import Login from "@/components/pages/Login";
import Perfil from "@/components/pages/Perfil";
import Error404 from "@/components/pages/Error404";
import Vue from "vue";
import Carteras from "@/components/pages/Carteras";
import Cartera from "@/components/subpages/Cartera";
import CarteraFiat from "@/components/subpages/CarteraFiat";

const TITULO = "Medusa";

const routes = [

    {
        name: 'Login',
        path: '/login',
        component: Login,
        meta: {
            title: `Login - ${TITULO}`
        }
    },

    {
        name: 'Inicio',
        path: '/inicio',
        component: Inicio,
        meta: {
            title: `Inicio - ${TITULO}`
        }
    },

    {
        name: 'Carteras',
        path: '/carteras',
        component: Carteras,
        meta: {
            title: `Cartera - ${TITULO}`
        }
    },
    {
        name: 'Cartera',
        path: '/cartera/:id',
        component: Cartera,
        meta: {
            title: `Cartera - ${TITULO}`
        }
    },
    {
        name: 'CarteraFiat',
        path: '/cartera-fiat',
        component: CarteraFiat,
        meta: {
            title: `Cartera - Fiat`
        }
    },

    {
        name: 'Perfil',
        path: '/perfil',
        component: Perfil,
        meta: {
            title: `Perfil - ${TITULO}`
        }
    },

    {
        name: "404",
        path: "*",
        component: Error404
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
});

router.afterEach((to) => {
    Vue.nextTick(() => {
        document.title = to.meta.title || TITULO;
    });
});

export default router;

