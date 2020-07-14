<template>
    <div class="user-container"
         v-bind:id="`user-${userAccess}`"
         v-on:click="clickUser">

        <img class="user-image"
             v-bind:src="userImage"
             alt="user image">

        <div class="user-name">{{userName}}</div>

    </div>
</template>

<script>
    import profileImage from '../../assets/profile.png';

    function clickUser() {

        const path = '/profile/' + this.userAccess;
        if(this.$router.currentRoute.path !== path) this.$router.push(path);

    }

    async function getUserData() {

        // hide element
        this.element.style.display = 'none';

        try {

            const userResult = (await this.$request.getProfile(this.userAccess)).result;

            // set profile name
            this.userName = userResult.name;

            // loading done
            this.element.style.display = 'flex'; // show element
            this.$store.commit('decreaseUserLoadingNumber');

            // get profile image
            if(userResult.image !== null) await this.getProfileImage();

        } catch(error) { console.log(error); }

    }

    async function getProfileImage() {

        const image = await this.$request.getProfileImageFile(this.userAccess);
        this.userImage = this.$utility.imageToBase64(image);

    }

    export default {
        props: {
            userAccess: String
        },

        data() {
            return {
                userName: '',
                userImage: profileImage
            };
        },

        computed: {
            element() { return document.getElementById(`user-${this.userAccess}`); }
        },

        mounted() {
            this.getUserData();
        },

        methods: {
            clickUser,
            getUserData,
            getProfileImage
        }
    };
</script>

<style scoped>
    .user-container {
        padding: 15px;

        cursor: pointer;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .user-image {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin-right: 15px;
        background-color: black;
    }

    .user-name {
        font-weight: 700;
    }
</style>
