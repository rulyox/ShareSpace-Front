<template>
    <div id="feed-container">

        <div id="feed-post-list-container">

            <div id="feed-post-list">

                <Post v-for="post in this.postList" v-bind:key="post" v-bind:postAccess="post"></Post>

            </div>

        </div>

    </div>
</template>

<script>
    import Post from '../item/Post';

    async function getFeed() {

        try {

            const feedResult = await this.$request.getFeed(this.token, this.postNumber);

            this.postNumber += feedResult.post.length;
            for(const post of feedResult.post) this.postList.push(post);

        } catch(error) { console.log(error); }

    }

    function watchScroll(element) {

        element.onscroll = () => {

            let reachedBottom = element.scrollTop + element.offsetHeight === element.scrollHeight;

            if(reachedBottom) this.getFeed();

        };

    }

    export default {
        data() {
            return {
                postNumber: 0,
                postList: []
            };
        },

        computed: {
            token() { return this.$store.getters.token; },
            postListElement() { return document.getElementById('feed-post-list-container'); }
        },

        mounted() {
            this.getFeed();
            this.watchScroll(this.postListElement);
        },

        methods: {
            getFeed,
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
</style>
