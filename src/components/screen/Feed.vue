<template>
    <div id="feed-container">

        <div id="feed-post-list-container">

            <div id="feed-post-list">

                <Post v-for="post in this.postList" v-bind:key="post" v-bind:postAccess="post"></Post>

                <div v-if="isLoadingPost" class="loading-indicator"></div>

            </div>

        </div>

    </div>
</template>

<script>
    import Post from '../item/Post';

    async function getFeed() {

        this.isGettingPost = true;

        try {

            const feedResult = await this.$request.getFeed(this.token, this.postNumber);

            this.postNumber += feedResult.post.length;

            this.addToPostList(feedResult.post);

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

            if(reachedBottom && !this.isGettingPost) this.getFeed();

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
            isLoadingPost() { return (this.$store.getters.loadingPostNumber > 0); }
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

    #feed-post-list {
        margin: 50px;

        display: flex;
        flex-direction: column;
        align-items: center;
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
