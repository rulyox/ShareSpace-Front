<template>
    <div class="header-container">

        <a id="header-title" v-on:click="clickHome">ShareSpace</a>

        <el-dropdown id="header-profile" trigger="click">

            <img class="el-dropdown-link" id="header-profile-image" v-bind:src="profileImage" alt="profile image">

            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user" v-on:click.native="clickProfile">My Profile</el-dropdown-item>
                <el-dropdown-item icon="el-icon-switch-button" v-on:click.native="clickLogout">Logout</el-dropdown-item>
            </el-dropdown-menu>

        </el-dropdown>

    </div>
</template>

<script>
    import profileImage from '../../assets/profile.png';

    function clickHome() {

        const path = '/';
        if(this.$router.currentRoute.path !== path) this.$router.push(path);

    }

    function clickProfile() {

        const path = '/profile/' + this.userId;
        if(this.$router.currentRoute.path !== path) this.$router.push(path);

    }

    function clickLogout() {

        localStorage.removeItem('token');

        const path = '/login';
        if(this.$router.currentRoute.path !== path) this.$router.push(path);

    }

    async function getUserData() {

        try {

            // get profile image
            const image = await this.$request.getProfileImageFile(this.userId);

            if(image instanceof ArrayBuffer) {

                const imageBase64 = Buffer.from(image).toString('base64');
                this.profileImage = 'data:image/png;base64, ' + imageBase64;

            }

        } catch(error) {

            console.log(error);

        }

    }

    export default {
        data() {
            return {
                profileImage: profileImage
            }
        },

        computed: {
            userData() { return this.$store.getters.userData; },
            userId() { return this.userData.id }
        },

        mounted() {
            this.getUserData();
        },

        methods: {
            clickHome,
            clickProfile,
            getUserData,
            clickLogout
        }
    };
</script>

<style scoped>
    .header-container {
        width: 100%;
        height: 70px;
        background-color: #253B80;
        z-index: 1;

        display: flex;
        flex-direction: row;
        align-items: center;

        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }

    #header-title {
        font-size: 20px;
        font-weight: 700;
        text-decoration: none;
        color: #FAFAFA;

        cursor: pointer;

        margin-left: 30px;
    }

    #header-profile {
        font-size: 15px;

        cursor: pointer;

        margin-left: auto;
        margin-right: 30px;
    }

    #header-profile-image {
        width: 50px;
        height: 50px;
        background-color: black;
        border-radius: 25px;
    }
</style>
