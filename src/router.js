import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginComponent from './components/screen/Login';
import HomeComponent from './components/screen/Home';
import FeedComponent from './components/screen/Feed';
import ProfileComponent from './components/screen/Profile';
import request from './request';
import store from './store';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            components: {
                'appContent': HomeComponent
            },
            children: [
                {
                    path: '/',
                    components: {
                        'homeContent': FeedComponent
                    },
                },
                {
                    path: '/profile/:profileAccess',
                    components: {
                        'homeContent': ProfileComponent
                    },
                    props: {
                        'homeContent': true
                    }
                }
            ]
        },
        {
            path: '/login',
            components: {
                'appContent': LoginComponent
            }
        }
    ]
});

// check token before each router call
router.beforeEach(async (to, from, next) => {

    const token = localStorage.getItem('token');

    if(token === undefined || token === null) { // no token

        if(to.path === '/login') next();
        else next( {path: '/login'} );

    } else {

        try {

            const loginResult = await request.login(token);

            // save data to vuex
            await store.dispatch('initialize', {
                token: token,
                access: loginResult.access,
                email: loginResult.email,
                name: loginResult.name
            });

            if(to.path === '/login') next( {path: '/'} );
            else next();

        } catch(error) {

            console.log(error);

            // delete all data in vuex
            await store.dispatch('reset');

            localStorage.removeItem('token');

            // go to login
            next( {path: '/login'} );

        }

    }

});

export default router;
