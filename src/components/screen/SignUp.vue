<template>
    <div class="signup-container">

        <div class="signup-dialog">

            <a class="signup__dialog__title">Sign Up</a>

            <el-input class="signup__dialog__input"
                      placeholder="Enter name"
                      v-model="name"
                      v-on:keydown.native.enter="clickSignUp" />

            <el-input class="signup__dialog__input"
                      placeholder="Enter email"
                      v-model="email"
                      v-on:keydown.native.enter="clickSignUp" />

            <el-input class="signup__dialog__input"
                      placeholder="Enter password"
                      v-model="password"
                      show-password
                      v-on:keydown.native.enter="clickSignUp" />

            <div class="signup__dialog__button-container">
                <el-button v-on:click.prevent="clickBack">Back To Login</el-button>
                <el-button v-on:click.prevent="clickSignUp">Sign Up</el-button>
            </div>

        </div>

    </div>
</template>

<script>
    import request from '../../requests';

    function clickBack() {

        const path = '/login';
        if(this.$router.currentRoute.path !== path) this.$router.push(path);

    }

    async function clickSignUp() {

        if(this.name === '' || this.email === '' || this.password === '') {
            alert('Empty name or email or password!');
            return;
        }

        try {

            const signUp = await request.user.signUp(this.name, this.email, this.password);

            if(signUp.code === 101) {

                // go to home
                await this.$router.push('/');

            } else if(signUp.code === 201) alert('Sign Up failed. Email exists.');
            else console.log(signUp);

        } catch(error) { console.log(error); }

    }

    export default {
        data() {
            return {
                name: '',
                email: '',
                password: ''
            };
        },

        methods: {
            clickBack,
            clickSignUp
        }
    };
</script>

<style scoped>
    .signup-container {
        height: 100%;
        width: 100%;
        background-color: #FAFAFA;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .signup-dialog {
        width: 500px;
        height: 400px;
        background-color: #253B80;
        border-radius: 30px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    }

    .signup__dialog__title {
        font-size: 30px;
        font-weight: bolder;
        color: #FAFAFA;
        margin-bottom: 30px;
    }

    .signup__dialog__input {
        width: 400px;
        margin-bottom: 30px;
    }

    .signup__dialog__button-container {
        display: flex;
        flex-direction: row;
    }
</style>
