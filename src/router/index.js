import VueRouter from "vue-router";
import Inicio from "@/components/pages/Inicio";
import Login from "@/components/pages/Login";
import Perfil from "@/components/pages/Perfil";
import Error404 from "@/components/pages/Error404";
import Vue from "vue";
import Carteras from "@/components/pages/Carteras";
import Cartera from "@/components/cartera/Cartera";
import CarteraFiat from "@/components/cartera/CarteraFiat";
import Ranking from "@/components/pages/Ranking";
import Registro from "@/components/pages/Registro";
import PoliticaCondiciones from "@/components/pages/PoliticaCondiciones";

const TITULO = "Medusa";

const routes = [

    {
        path: "/",
        redirect: () => {
            if(localStorage.getItem("token")){
                return "/inicio";
            }
            return "/login"
        }
    },

    {
        name: 'Login',
        path: '/login',
        component: Login,
        meta: {
            title: `Login - ${TITULO}`
        }
    },
    {
        name: 'Registro',
        path: '/registro',
        component: Registro,
        meta: {
            title: `Registro - ${TITULO}`
        },
        props: true
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
        name: 'Ranking',
        path: '/ranking',
        component: Ranking,
        meta: {
            title: `Ranking - ${TITULO}`
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
        name: "Politica",
        path:'/politica',
        component: PoliticaCondiciones,
        meta: {
            title: `Política de Privacidad - ${TITULO}`
        }
    },

    {
        name: "Condiciones",
        path:'/condiciones',
        component: PoliticaCondiciones,
        props: {
            modo:'condiciones'
        },
        meta: {
            title: `Condiciones de Servicio - ${TITULO}`
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

