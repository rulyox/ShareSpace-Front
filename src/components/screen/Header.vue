<template>
    <div class="header-container">

        <a id="header__title" v-on:click="clickHome">ShareSpace</a>

        <el-input class="header__search" placeholder="Search user"
                  v-model="searchText"
                  v-on:keydown.native.enter="clickSearch">
            <el-button slot="append" icon="el-icon-search"
                       v-on:click="clickSearch" />
        </el-input>

        <el-dropdown id="header__profile" trigger="click">

            <img class="el-dropdown-link" id="header__profile__image"
                 v-bind:src="profileImage"
                 alt="profile image">

            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user"
                                  v-on:click.native="clickProfile">
                    My Profile
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-switch-button"
                                  v-on:click.native="clickLogout">
                    Logout
                </el-dropdown-item>
            </el-dropdown-menu>

        </el-dropdown>

    </div>
</template>

<script>
    import * as request from '../../requests';
    import * as utility from '../../utility';
    import profileImage from '../../assets/profile.png';

    function clickHome() {

        const path = '/';
        if(this.$router.currentRoute.path !== path) this.$router.push(path);

    }

    function clickSearch() {

        const path = '/search/' + this.searchText;
        if(this.$router.currentRoute.path !== path) this.$router.push(path);

    }

    function clickProfile() {

        const path = '/profile/' + this.userAccess;
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
            const image = await request.getProfileImageFile(this.userAccess);
            this.profileImage = utility.imageToBase64(image);

        } catch(error) { console.log(error); }

    }

    export default {
        data() {
            return {
                profileImage: profileImage,
                searchText: ''
            }
        },

        computed: {
            userData() { return this.$store.getters.userData; },
            userAccess() { return this.userData.access }
        },

        mounted() {
            this.getUserData();
        },

        methods: {
            clickHome,
            clickSearch,
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

    #header__title {
        font-size: 20px;
        font-weight: 700;
        text-decoration: none;
        color: #FAFAFA;

        cursor: pointer;

        margin-left: 30px;
    }

    .header__search {
        width: 300px;
        margin-left: 30px;
    }

    #header__profile {
        font-size: 15px;

        cursor: pointer;

        margin-left: auto;
        margin-right: 30px;
    }

    #header__profile__image {
        width: 50px;
        height: 50px;
        background-color: black;
        border-radius: 25px;
    }
</style>
