<template>
    <div class="comment-container"
         v-bind:id="`user-${userAccess}`"
         v-on:click="clickUser">

        <div class="comment__header">

            <img class="comment__header__image"
                 v-bind:src="userImage"
                 alt="user image">

            <span class="comment__header__name">
                {{userName}}
            </span>

            <span class="comment__header__time">
                {{commentTime}}
            </span>

            <i class="el-icon-delete-solid comment__header__delete"
               v-if="userAccess === accountUserAccess"
               v-on:click="clickDelete" />

        </div>

        <span>
            {{commentText}}
        </span>

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

    async function clickDelete() {

        try {

            const deleteComment = await request.deleteComment(this.token, this.commentAccess);

            if(deleteComment.code === 101) {

                this.$emit('delete');

            } else console.log(deleteComment);

        } catch(error) { console.log(error); }

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
            commentAccess: String,
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
            element() { return document.getElementById(`user-${this.userAccess}`); },
            token() { return this.$store.getters.token; },
            accountUserData() { return this.$store.getters.userData; },
            accountUserAccess() { return this.accountUserData.access }
        },

        mounted() {
            this.getUserData();
        },

        methods: {
            clickUser,
            clickDelete,
            getUserData,
            getProfileImage
        }
    };
</script>

<style scoped>
    .comment-container {
        padding: 15px;

        display: flex;
        flex-direction: column;
    }

    .comment__header {
        margin-bottom: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .comment__header__image {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin-right: 15px;
        background-color: black;
    }

    .comment__header__name {
        font-weight: 700;
    }

    .comment__header__time {
        text-align: right;
        font-size: 15px;
        margin-left: auto;
    }

    .comment__header__delete {
        margin-left: 20px;
    }
</style>
