<template>
    <div class="login-container">

        <div class="login-dialog">

            <a class="dialog-title">ShareSpace</a>

            <el-input class="dialog-input"
                      placeholder="Enter email"
                      v-model="email"
                      v-on:keydown.native.enter="clickLogin" />

            <el-input class="dialog-input"
                      placeholder="Enter password"
                      v-model="password"
                      show-password
                      v-on:keydown.native.enter="clickLogin" />

            <div class="dialog-button">
                <el-button v-on:click.prevent="clickLogin">Login</el-button>
                <el-button>Sign Up</el-button>
            </div>

        </div>

    </div>
</template>

<script>
    import * as request from '../../requests';

    async function clickLogin() {

        if(this.email === '' || this.password === '') {
            alert('Empty email or password!');
            return;
        }

        try {

            const getToken = await request.getToken(this.email, this.password);

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

    export default {
        data() {
            return {
                email: '',
                password: ''
            };
        },

        methods: {
            clickLogin
        }
    }
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

    .login-dialog {
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

    .dialog-title {
        font-size: 30px;
        font-weight: bolder;
        color: #FAFAFA;
        margin-bottom: 30px;
    }

    .dialog-input {
        width: 400px;
        margin-bottom: 30px;
    }

    .dialog-button {
        display: flex;
        flex-direction: row;
    }
</style>
