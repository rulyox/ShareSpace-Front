<template>
    <div class="post-container"
         v-bind:id="`post-${postAccess}`">

        <div v-on:click="showModal = true">

            <div class="post-header">

                <img class="post-user"
                     v-bind:src="userImage"
                     alt="user image">

                <span>{{userName}}</span>

            </div>

            <img class="post-image"
                 v-bind:id="`post-${postAccess}-image`"
                 v-bind:src="image"
                 alt="post image">

            <div class="post-content" v-html="showText"></div>

            <div class="post-footer">
                <i class="el-icon-star-off" style="margin-right: 5px;"></i>
                <span style="margin-right: 15px;">{{likeList.length}}</span>
                <i class="el-icon-chat-line-square" style="margin-right: 5px;"></i>
                <span>{{commentList.length}}</span>
            </div>

        </div>

        <PostModal v-if="showModal"
                   v-on:close="showModal = false"
                   v-bind:postAccess="postAccess" />

    </div>
</template>

<script>
    import PostModal from '../modal/PostModal';
    import profileImage from '../../assets/profile.png';

    async function getPostData() {

        // hide element
        this.element.style.display = 'none';

        try {

            const postDataResult = await this.$request.getPostPreview(this.token, this.postAccess);

            if(postDataResult.code === 101) { // OK

                const result = postDataResult.result;

                this.userAccess = result.user;
                this.userName = result.name;
                this.text = result.text;

                // loading done
                this.element.style.display = 'block'; // show element
                this.$store.commit('decreasePostLoadingNumber');

                // get profile image
                if(result.profile !== null) await this.getProfileImage();

                // get images
                const image = result.image;
                if(image !== null) await this.getImage(image);

            }

            const likeResult = await this.$request.getLike(this.token, this.postAccess);

            if(likeResult.code === 101) { // OK

                const result = likeResult.result;

                this.likeList = result.user;

            }

            const commentResult = await this.$request.getComment(this.token, this.postAccess);

            if(commentResult.code === 101) { // OK

                const result = commentResult.result;

                this.commentList = result.comment;

            }

        } catch(error) { console.log(error); }

    }

    async function getProfileImage() {

        const image = await this.$request.getProfileImageFile(this.userAccess);
        this.userImage = this.$utility.imageToBase64(image);

    }

    async function getImage(imageName) {

        const imageFile = await this.$request.getImageFile(this.token, this.postAccess, imageName);
        this.image = this.$utility.imageToBase64(imageFile);

        // show image element
        this.imageElement.style.display = 'block';

    }

    export default {
        props: {
            postAccess: String
        },

        data() {
            return {
                userAccess: 0,
                userName: '',
                userImage: profileImage,
                text: '',
                image: '',
                likeList: [],
                commentList: [],
                showModal: false
            };
        },

        computed: {
            token() { return this.$store.getters.token; },
            showText() { return this.text.replace(/(?:\r\n|\r|\n)/g, '<br>'); },
            element() { return document.getElementById(`post-${this.postAccess}`); },
            imageElement() { return document.getElementById(`post-${this.postAccess}-image`) }
        },

        mounted() {
            this.getPostData();
        },

        methods: {
            getPostData,
            getProfileImage,
            getImage
        },

        components: {
            PostModal
        }
    }
</script>

<style scoped>
    .post-container {
        width: 500px;
        padding: 30px;
        border-radius: 10px;
        margin-bottom: 50px;
        background-color: #FAFAFA;

        cursor: pointer;

        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }

    .post-container:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .post-header {
        height: 40px;
        margin-bottom: 20px;

        font-weight: 700;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .post-user {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin-right: 15px;
        background-color: black;
    }

    .post-image {
        width: 500px;
        height: 500px;
        margin-bottom: 20px;
        background-color: black;
        border: 1px solid #DDDDDD;

        display: none;
    }

    .post-content {
        margin-bottom: 20px;
    }

    .post-footer {
        width: 500px;

        color: #253B80;

        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
</style>
