<template>
    <div id="profile-container">

        <div id="profile-info-container">

            <img id="profile-info-image" v-bind:src="profileImage" alt="user image">

            <div id="profile-info-name">{{ profileName }}</div>

            <el-button class="profile-info-follow-button" type="primary" v-on:click="clickFollowing">Following {{followingList.length}}</el-button>
            <el-button class="profile-info-follow-button" type="primary" v-on:click="clickFollower">Followers {{followerList.length}}</el-button>

        </div>

        <div id="profile-post-container">

            <div id="profile-post-list">

                <Post v-for="post in this.postList" v-bind:key="post" v-bind:postAccess="post"></Post>

                <div v-if="isLoadingPost" class="loading-indicator"></div>

            </div>

        </div>

        <a id="add-button" v-on:click="showModal = true"><i class="el-icon-plus"></i></a>

        <WriteModal v-if="showModal" v-on:close="[showModal = false, getPosts()]" />

    </div>
</template>

<script>
    import Post from '../item/Post';
    import WriteModal from '../modal/WriteModal';
    import profileImage from '../../assets/profile.png';

    function clickFollowing() {

        console.log(this.followingList);

    }

    function clickFollower() {

        console.log(this.followerList);

    }

    async function getProfileInfo() {

        try {

            const profileResult = await this.$request.getProfile(this.profileAccess);

            // set profile name
            this.profileName = profileResult.name;

            // get profile image
            const profileImage = profileResult.image;
            if(profileImage !== null) await this.getProfileImage();

            //get following list
            const followingResult = await this.$request.getFollowing(this.profileAccess);
            this.followingList = followingResult.user;

            //get follower list
            const followerResult = await this.$request.getFollower(this.profileAccess);
            this.followerList = followerResult.user;

        } catch(error) { console.log(error); }

    }

    async function getProfileImage() {

        const image = await this.$request.getProfileImageFile(this.profileAccess);
        this.profileImage = this.$utility.imageToBase64(image);

    }

    async function getPosts() {

        // reset posts
        this.postTotal = 0;
        this.postNumber = 0;
        this.postList = [];

        this.isGettingPost = true;

        try {

            const postResult = await this.$request.getPostByUser(this.token, this.profileAccess, 0);

            if(postResult.result === 101) { // OK

                this.postTotal = postResult.total;
                this.postNumber += postResult.list.length;

                this.addToPostList(postResult.list);

            }

        } catch(error) { console.log(error); }

        this.isGettingPost = false;

    }

    async function getMorePosts() {

        // if all posts are loaded
        if(this.postTotal <= this.postNumber) return;

        this.isGettingPost = true;

        try {

            const postResult = await this.$request.getPostByUser(this.token, this.profileAccess, this.postNumber);

            if(postResult.result === 101) { // OK

                this.postNumber += postResult.list.length;

                this.addToPostList(postResult.list);

            }

        } catch(error) { console.log(error); }

        this.isGettingPost = false;

    }

    function addToPostList(postList) {

        for(const post of postList) {

            // post loading start
            this.$store.commit('increaseLoadingNumber'); // commit to store
            this.postList.push(post);

        }

    }

    function watchScroll(element) {

        element.onscroll = () => {

            let reachedBottom = element.scrollTop + element.offsetHeight === element.scrollHeight;

            if(reachedBottom && !this.isGettingPost) this.getMorePosts();

        };

    }

    export default {
        props: {
            profileAccess: String
        },

        data() {
            return {
                profileName: '',
                profileImage: profileImage,
                followingList: [],
                followerList: [],
                isGettingPost: false,
                postTotal: 0,
                postNumber: 0,
                postList: [],
                showModal: false
            };
        },

        computed: {
            token() { return this.$store.getters.token; },
            postListElement() { return document.getElementById('profile-post-container'); },
            isLoadingPost() { return (this.$store.getters.loadingPostNumber > 0); }
        },

        mounted() {
            this.getProfileInfo();
            this.getPosts();
            this.watchScroll(this.postListElement);
        },

        watch: {
            profileAccess() {
                this.getProfileInfo();
                this.getPosts();
            }
        },

        methods: {
            clickFollowing,
            clickFollower,
            getProfileInfo,
            getProfileImage,
            getPosts,
            getMorePosts,
            addToPostList,
            watchScroll
        },

        components: {
            Post,
            WriteModal
        }
    };
</script>

<style scoped>
    #profile-container {
        flex: 1;

        background-color: #F5F5F5;

        display: flex;
        flex-direction: row;
    }

    #profile-info-container {
        padding: 30px;
        background-color: #FAFAFA;

        display: flex;
        flex-direction: column;
        align-items: center;

        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }

    #profile-info-image {
        width: 300px;
        height: 300px;
        border-radius: 30px;
        margin-bottom: 30px;
    }

    #profile-info-name {
        font-size: 25px;
        font-weight: 700;

        margin-bottom: 30px;
    }

    .profile-info-follow-button {
        width: 200px;
        margin-left: 0;
        margin-bottom: 10px;
    }

    #profile-post-container {
        flex: 1;
        overflow: auto;
    }

    #profile-post-list {
        margin: 50px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #add-button {
        position: fixed;

        width: 60px;
        height: 60px;
        border-radius: 50%;

        bottom: 40px;
        right: 40px;

        background-color: #253B80;
        color: #FAFAFA;

        display: flex;
        align-items: center;
        justify-content: center;

        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }

    #add-button:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .loading-indicator:before,
    .loading-indicator:after,
    .loading-indicator {
        border-radius: 50%;
        animation-fill-mode: both;
        animation: loading-indicator 1.8s infinite ease-in-out;
    }

    .loading-indicator {
        position: relative;
        top: -2em;
        width: 2em;
        height: 2em;

        vertical-align: middle;
        pointer-events: none;

        color: #253B80;
        animation-delay: -0.16s;
    }

    .loading-indicator:before {
        right: 150%;
        animation-delay: -0.32s;
    }

    .loading-indicator:after {
        left: 150%;
    }

    .loading-indicator:before,
    .loading-indicator:after {
        content: '';
        display: block;
        position: absolute;
        width: inherit;
        height: inherit;
    }

    @keyframes loading-indicator {
        0%, 80%, 100% {
            box-shadow: 0 2em 0 -2em;
        }
        40% {
            box-shadow: 0 2em 0 -0.4em;
        }
    }
</style>
