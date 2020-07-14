import Vue from 'vue';
import ElementUI from 'element-ui';
import './theme/index.css';
import App from './App';
import router from './router';
import store from './store';

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app');
