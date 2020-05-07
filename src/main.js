import Vue from 'vue';
import ElementUI from 'element-ui';
import './theme/index.css';
import App from './App';
import router from './router';
import store from './store';
import request from './request';
import utility from './utility';

Vue.use(ElementUI);
Vue.prototype.$request = request;
Vue.prototype.$utility = utility;
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app');
