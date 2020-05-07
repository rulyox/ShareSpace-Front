<template>
    <div class="post-container" v-bind:id="'post-' + postAccess">

        <div v-on:click="showModal = true">

            <div class="post-header">
                <img class="post-user" v-bind:src="userImage" alt="user image">
                {{userName}}
            </div>

            <img class="post-image" v-bind:src="imageList[0]" alt="post image">

            <div class="post-content" v-html="showText"></div>

        </div>

        <PostModal v-if="showModal" v-on:close="showModal = false" v-bind:postAccess="postAccess" />

    </div>
</template>

<script>
    import PostModal from '../modal/PostModal';
    import profileImage from '../../assets/profile.png';

    async function getPostData() {

        // hide element
        this.element.style.display = 'none';

        try {

            const postDataResult = await this.$request.getPostData(this.token, this.postAccess);

            if(postDataResult.result === 101) { // OK

                const postData = postDataResult.data;

                this.userAccess = postData.user;
                this.userName = postData.name;
                this.text = postData.text;

                // show element
                this.element.style.display = 'block';

                // get profile image
                const profileImage = postData.profile;
                if(profileImage !== null) await this.getProfileImage();

                // get images
                const imageList = postData.image;
                await this.getImages(imageList);

            }

        } catch(error) { console.log(error); }

    }

    async function getProfileImage() {

        const image = await this.$request.getProfileImageFile(this.userAccess);
        this.userImage = this.$utility.imageToBase64(image);

    }

    async function getImages(imageList) {

        for(let i = 0; i < imageList.length; i++) {

            // save base64 image to list
            const image = await this.$request.getImageFile(this.token, this.postAccess, imageList[i]);
            this.imageList.push(this.$utility.imageToBase64(image));

        }

        // show image element
        if(this.imageList.length > 0) this.element.getElementsByClassName('post-image')[0].style.display = 'block';

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
                imageList: [],
                showModal: false
            };
        },

        computed: {
            token() { return this.$store.getters.token; },
            showText() { return this.text.replace(/(?:\r\n|\r|\n)/g, '<br>'); },
            element() { return document.getElementById('post-' + this.postAccess); }
        },

        mounted() {
            this.getPostData();
        },

        methods: {
            getPostData,
            getProfileImage,
            getImages
        },

        components: {
            PostModal
        }
    }
</script>

<style scoped>
    .post-container {
        width: 500px;
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
        padding: 15px;

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
        background-color: black;
        border-top: 1px solid #DDDDDD;
        border-bottom: 1px solid #DDDDDD;

        display: none;
    }

    .post-content {
        padding: 15px;
    }
</style>
