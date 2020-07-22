<template>
    <div id="feed-container">

        <div id="feed-post-list-container">

            <div id="feed-post-list">

                <Post v-for="post in this.postList"
                      v-bind:key="post"
                      v-bind:postAccess="post" />

                <div v-if="isLoadingPost" class="loading-indicator" />

            </div>

        </div>

    </div>
</template>

<script>
    import Post from '../item/Post';
    import * as request from '../../requests';

    async function getFeed() {

        this.$store.commit('resetPostLoadingNumber');

        this.isGettingPost = true;

        try {

            const getFeed = await request.getFeed(this.token, this.postNumber);

            if(getFeed.code === 101) {

                const result = getFeed.result;

                this.postNumber += result.post.length;

                // post loading start
                this.addToPostList(result.post);

            } else console.log(getFeed);

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

            if(reachedBottom && !this.isGettingPost && !this.isLoadingPost) this.getFeed();

        };

    }

    export default {
        data() {
            return {
                isGettingPost: false,
                postNumber: 0,
                postList: []
            };
        },

        computed: {
            token() { return this.$store.getters.token; },
            postListElement() { return document.getElementById('feed-post-list-container'); },
            isLoadingPost() { return (this.$store.getters.postLoadingNumber > 0); }
        },

        mounted() {
            this.getFeed();
            this.watchScroll(this.postListElement);
        },

        methods: {
            getFeed,
            addToPostList,
            watchScroll
        },

        components: {
            Post
        }
    };
</script>

<style scoped>
    #feed-container{
        flex: 1;

        background-color: #F5F5F5;

        display: flex;
        flex-direction: column;
    }

    #feed-post-list-container {
        flex: 1;
        overflow: auto;
    }

    #feed-post-list-container::-webkit-scrollbar {
        width: 10px;
        background: none;
    }

    #feed-post-list-container::-webkit-scrollbar-thumb {
        background: #253B80;
    }

    #feed-post-list-container::-webkit-scrollbar-track {
        background: none;
    }

    #feed-post-list {
        margin: 50px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
