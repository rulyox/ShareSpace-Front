import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './components/screen/Login';
import SignUp from './components/screen/SignUp';
import Home from './components/screen/Home';
import Feed from './components/screen/Feed';
import Profile from './components/screen/Profile';
import Search from './components/screen/Search';
import Settings from './components/screen/Settings';
import request from './requests';
import store from './store';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            components: {
                'appContent': Home
            },
            children: [
                {
                    path: '/',
                    components: {
                        'homeContent': Feed
                    }
                },
                {
                    path: '/profile/:profileAccess',
                    components: {
                        'homeContent': Profile
                    },
                    props: {
                        'homeContent': true
                    }
                },
                {
                    path: '/search/:query',
                    components: {
                        'homeContent': Search
                    },
                    props: {
                        'homeContent': true
                    }
                },
                {
                    path: '/settings',
                    components: {
                        'homeContent': Settings
                    }
                }
            ]
        },
        {
            path: '/login',
            components: {
                'appContent': Login
            }
        },
        {
            path: '/signup',
            components: {
                'appContent': SignUp
            }
        }
    ]
});

// check token before each router call
router.beforeEach(async (to, from, next) => {

    const token = localStorage.getItem('token');

    if(token === undefined || token === null) { // no token

        if(to.path === '/login' || to.path === '/signup') next();
        else next( {path: '/login'} );

    } else {

        try {

            const loginResult = await request.user.login(token);

            const result = loginResult.result;

            // save data to vuex
            await store.dispatch('initialize', {
                token: token,
                access: result.access,
                email: result.email,
                name: result.name
            });

            if(to.path === '/login' || to.path === '/signup') next( {path: '/'} );
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
