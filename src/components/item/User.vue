<template>
    <div class="user-container"
         v-bind:id="`user-${userAccess}`"
         v-on:click="clickUser">

        <img class="user__image"
             v-bind:src="userImage"
             alt="user image">

        <div class="user__name">
            {{userName}}
        </div>

    </div>
</template>

<script>
    import request from '../../requests';
    import * as utility from '../../utility';
    import profileImage from '../../assets/profile.png';

    async function getUserData() {

        // hide element
        this.element.style.display = 'none';

        try {

            const getProfile = await request.user.getProfile(this.userAccess);

            if(getProfile.code === 101) {

                const result = getProfile.result;

                // set profile name
                this.userName = result.name;

                // loading done
                this.element.style.display = 'flex'; // show element
                this.$store.commit('decreaseUserLoadingNumber');

                // get profile image
                if(result.image !== null) await this.getProfileImage();

            } else console.log(getProfile);

        } catch(error) { console.log(error); }

    }

    async function getProfileImage() {

        const image = await request.user.getProfileImage(this.userAccess);
        this.userImage = utility.imageToBase64(image);

    }

    function clickUser() {

        const path = '/profile/' + this.userAccess;
        if(this.$router.currentRoute.path !== path) this.$router.push(path);

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
            getUserData,
            getProfileImage,

            clickUser
        }
    };
</script>

<style scoped>
    .user-container {
        width: 500px;
        padding: 15px;
        margin-bottom: 15px;

        cursor: pointer;

        display: flex;
        flex-direction: row;
        align-items: center;

        border-radius: 10px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }

    .user-container:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .user__image {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin-right: 15px;
        background-color: black;
    }

    .user__name {
        font-weight: 700;
    }
</style>
