<template>
    <div id="profile-container">

        <div id="profile-info-container">

            <img id="profile-info-image"
                 v-bind:src="profileImage"
                 alt="user image">

            <div id="profile-info-name">{{ profileName }}</div>

            <el-button class="profile-info-follow-button"
                       type="primary"
                       v-on:click="[showFollowModal = true, followModalList = followingList]"
            >Following {{followingList.length}}</el-button>

            <el-button class="profile-info-follow-button"
                       type="primary"
                       v-on:click="[showFollowModal = true, followModalList = followerList]"
            >Followers {{followerList.length}}</el-button>

        </div>

        <div id="profile-post-container">

            <div id="profile-post-list">

                <Post v-for="post in this.postList"
                      v-bind:key="post"
                      v-bind:postAccess="post"></Post>

                <div v-if="isLoadingPost" class="loading-indicator"></div>

            </div>

        </div>

        <a id="add-button"
           v-on:click="showWriteModal = true"
        ><i class="el-icon-plus"></i></a>

        <WriteModal v-if="showWriteModal"
                    v-on:close="[showWriteModal = false, getPosts()]" />

        <FollowModal v-if="showFollowModal"
                     v-on:close="showFollowModal = false"
                     v-bind:list="followModalList" />

    </div>
</template>

<script>
    import Post from '../item/Post';
    import WriteModal from '../modal/WriteModal';
    import FollowModal from '../modal/FollowModal';
    import profileImage from '../../assets/profile.png';

    async function getProfileInfo() {

        try {

            const profileResult = (await this.$request.getProfile(this.profileAccess)).result;

            // set profile name
            this.profileName = profileResult.name;

            // get profile image
            if(profileResult.image !== null) await this.getProfileImage();

            //get following list
            const followingResult = (await this.$request.getFollowing(this.profileAccess)).result;
            this.followingList = followingResult.user;

            //get follower list
            const followerResult = (await this.$request.getFollower(this.profileAccess)).result;
            this.followerList = followerResult.user;

        } catch(error) { console.log(error); }

    }

    async function getProfileImage() {

        const image = await this.$request.getProfileImageFile(this.profileAccess);
        this.profileImage = this.$utility.imageToBase64(image);

    }

    async function getPosts() {

        // if all posts are loaded
        if(this.postTotal <= this.postNumber) return;

        this.$store.commit('resetPostLoadingNumber');

        this.isGettingPost = true;

        try {

            const postResult = await this.$request.getPostByUser(this.token, this.profileAccess, this.postNumber);

            if(postResult.code === 101) { // OK

                const result = postResult.result;

                this.postTotal = result.total;
                this.postNumber += result.list.length;

                // post loading start
                this.addToPostList(result.list);

            }

        } catch(error) { console.log(error); }

        this.isGettingPost = false;

    }

    function addToPostList(postList) {

        for(const post of postList) {

            this.$store.commit('increasePostLoadingNumber');
            this.postList.push(post);

        }

    }

    function watchScroll(element) {

        element.onscroll = () => {

            const reachedBottom = element.scrollTop + element.offsetHeight === element.scrollHeight;

            if(reachedBottom && !this.isGettingPost && !this.isLoadingPost) this.getPosts();

        };

    }

    function reset() {

        // reset all data
        Object.assign(this.$data, this.$options.data());

        this.getProfileInfo();
        this.getPosts();

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
                followModalList: [],
                isGettingPost: false,
                postTotal: 1, // to be bigger than postNumber
                postNumber: 0,
                postList: [],
                showWriteModal: false,
                showFollowModal: false
            };
        },

        computed: {
            token() { return this.$store.getters.token; },
            postListElement() { return document.getElementById('profile-post-container'); },
            isLoadingPost() { return (this.$store.getters.postLoadingNumber > 0); }
        },

        mounted() {
            this.getProfileInfo();
            this.getPosts();
            this.watchScroll(this.postListElement);
        },

        watch: {
            profileAccess() { this.reset(); }
        },

        methods: {
            getProfileInfo,
            getProfileImage,
            getPosts,
            addToPostList,
            watchScroll,
            reset
        },

        components: {
            Post,
            WriteModal,
            FollowModal
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

    #profile-post-container::-webkit-scrollbar {
        width: 10px;
        background: none;
    }

    #profile-post-container::-webkit-scrollbar-thumb {
        background: #253B80;
    }

    #profile-post-container::-webkit-scrollbar-track {
        background: none;
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
</style>
