import VueRouter from "vue-router";
import Inicio from "@/components/Inicio";
import Login from "@/components/Login";


// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    {
        name: 'Inicio',
        path: '/inicio',
        component: Inicio,
    },
    {
        path: '/bar',
        component: Inicio,
    },
    {
        name:'Login',
        path: '/login',
        component: Login,
    }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.

export default new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

