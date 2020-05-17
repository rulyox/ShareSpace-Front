import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        token: null,
        userAccess: null,
        userEmail: null,
        userName: null,
        loadingPostNumber: 0
    },

    getters: {
        token: state => {
            return state.token;
        },
        userData: state => {
            return {
                access: state.userAccess,
                email: state.userEmail,
                name: state.userName
            };
        },
        loadingPostNumber: state => {
            return state.loadingPostNumber;
        }
    },

    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        deleteToken(state) {
            state.token = null;
        },
        setAccess(state, access) {
            state.userAccess = access;
        },
        deleteAccess(state) {
            state.userAccess = null;
        },
        setEmail(state, email) {
            state.userEmail = email;
        },
        deleteEmail(state) {
            state.userEmail = null;
        },
        setName(state, name) {
            state.userEmail = name;
        },
        deleteName(state) {
            state.userName = null;
        },
        increaseLoadingNumber(state) {
            state.loadingPostNumber += 1;
        },
        decreaseLoadingNumber(state) {
            state.loadingPostNumber -= 1;
        }
    },

    actions: {
        initialize(context, data) {
            context.commit('setToken', data.token);
            context.commit('setAccess', data.access);
            context.commit('setEmail', data.email);
            context.commit('setName', data.name);
        },
        reset(context) {
            context.commit('deleteToken');
            context.commit('deleteAccess');
            context.commit('deleteEmail');
            context.commit('deleteName');
        }
    }

});

export default store;
