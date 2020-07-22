<template>
    <div class="comment-container"
         v-bind:id="`user-${userAccess}`"
         v-on:click="clickUser">

        <div class="comment-header">

            <img class="comment-image"
                 v-bind:src="userImage"
                 alt="user image">

            <div class="comment-name">{{userName}}</div>

            <div class="comment-time">{{commentTime}}</div>

        </div>

        <span>{{commentText}}</span>

        <div class="comment-divider" />

    </div>
</template>

<script>
    import profileImage from '../../assets/profile.png';
    import * as request from '../../requests';
    import * as utility from '../../utility';

    function clickUser() {

        const path = '/profile/' + this.userAccess;
        if(this.$router.currentRoute.path !== path) this.$router.push(path);

    }

    async function getUserData() {

        // hide element
        this.element.style.display = 'none';

        try {

            const getProfile = await request.getProfile(this.userAccess);

            if(getProfile.code === 101) {

                const result = getProfile.result;

                // set profile name
                this.userName = result.name;

                // show element
                this.element.style.display = 'flex';

                // get profile image
                if(result.image !== null) await this.getProfileImage();

            } else console.log(getProfile);

        } catch(error) { console.log(error); }

    }

    async function getProfileImage() {

        const image = await request.getProfileImageFile(this.userAccess);
        this.userImage = utility.imageToBase64(image);

    }

    export default {
        props: {
            commentId: Number,
            userAccess: String,
            commentText: String,
            commentTime: String
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
    .comment-container {
        padding: 15px 15px 0 15px;

        display: flex;
        flex-direction: column;
    }

    .comment-header {
        margin-bottom: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .comment-image {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin-right: 15px;
        background-color: black;
    }

    .comment-name {
        font-weight: 700;
    }

    .comment-time {
        flex: 1;
        text-align: right;
        font-size: 15px;
    }

    .comment-divider {
        width: 100%;
        height: 1px;
        margin-top: 15px;
        align-self: center;
        background-color: #DDDDDD;
    }
</style>
