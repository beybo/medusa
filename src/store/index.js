import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Importamos lo nuestro

import {state} from '@/store/state';
import {mutations} from "@/store/mutations";
import {actions} from "@/store/actions";
import {getters} from "@/store/getters";

export const index = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});