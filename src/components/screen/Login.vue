<template>
    <div class="login-container">

        <div class="login__dialog">

            <a class="login__dialog__title">ShareSpace</a>

            <el-input class="login__dialog__input"
                      placeholder="Enter email"
                      v-model="email"
                      v-on:keydown.native.enter="clickLogin" />

            <el-input class="login__dialog__input"
                      placeholder="Enter password"
                      v-model="password"
                      show-password
                      v-on:keydown.native.enter="clickLogin" />

            <div class="login__dialog__button-container">
                <el-button v-on:click.prevent="clickLogin">Login</el-button>
                <el-button v-on:click.prevent="clickSignUp">Sign Up</el-button>
            </div>

        </div>

    </div>
</template>

<script>
    import request from '../../requests';

    async function clickLogin() {

        if(this.email === '' || this.password === '') {
            alert('Empty email or password!');
            return;
        }

        try {

            const getToken = await request.user.getToken(this.email, this.password);

            if(getToken.code === 101) {

                const result = getToken.result;

                // save token
                const token = result.token;
                localStorage.setItem('token', token);

                // go to home
                await this.$router.push('/');

            } else if(getToken.code === 201) alert('Login failed. Wrong email.');
            else if(getToken.code === 202) alert('Login failed. Wrong password.');
            else console.log(getToken);

        } catch(error) { console.log(error); }

    }

    function clickSignUp() {

        const path = '/signup';
        if(this.$router.currentRoute.path !== path) this.$router.push(path);

    }

    export default {
        data() {
            return {
                email: '',
                password: ''
            };
        },

        methods: {
            clickLogin,
            clickSignUp
        }
    };
</script>

<style scoped>
    .login-container {
        height: 100%;
        width: 100%;
        background-color: #FAFAFA;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .login__dialog {
        width: 500px;
        height: 350px;
        background-color: #253B80;
        border-radius: 30px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    }

    .login__dialog__title {
        font-size: 30px;
        font-weight: bolder;
        color: #FAFAFA;
        margin-bottom: 30px;
    }

    .login__dialog__input {
        width: 400px;
        margin-bottom: 30px;
    }

    .login__dialog__button-container {
        display: flex;
        flex-direction: row;
    }
</style>
