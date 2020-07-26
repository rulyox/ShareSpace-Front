import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        token: null,

        userAccess: null,
        userEmail: null,
        userName: null,

        postLoadingNumber: 0,

        userLoadingNumber: 0
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

        postLoadingNumber: state => {
            return state.postLoadingNumber;
        },

        userLoadingNumber: state => {
            return state.userLoadingNumber;
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
            state.userName = name;
        },
        deleteName(state) {
            state.userName = null;
        },

        increasePostLoadingNumber(state) {
            state.postLoadingNumber += 1;
        },
        decreasePostLoadingNumber(state) {
            state.postLoadingNumber -= 1;
        },
        resetPostLoadingNumber(state) {
            state.postLoadingNumber = 0;
        },

        increaseUserLoadingNumber(state) {
            state.userLoadingNumber += 1;
        },
        decreaseUserLoadingNumber(state) {
            state.userLoadingNumber -= 1;
        },
        resetUserLoadingNumber(state) {
            state.userLoadingNumber = 0;
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
