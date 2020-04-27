<template>
    <div class="post-container" v-bind:id="'post-' + postId">

        <div class="post-header">
            <img class="post-user" v-bind:src="userProfile">
            {{userName}}
        </div>

        <img class="post-image" v-bind:src="imageList[0]">

        <div class="post-content">
            {{text}}
        </div>

    </div>
</template>

<script>
    import profileImage from '../assets/profile.png';

    async function getPostData(postId) {

        const thisElement = document.getElementById('post-' + postId);

        // hide element
        thisElement.style.display = 'none';

        try {

            const token = this.$store.getters.token;

            const postDataResult = await this.$request.getPostData(token, postId);

            if(postDataResult.result === 101) { // OK

                const postData = postDataResult.data;

                this.userId = postData.user;
                this.userName = postData.name;
                this.text = postData.text;

                // show element
                thisElement.style.display = 'block';

                // get profile image
                const profileImage = postData.profile;
                if(profileImage !== null) {

                    const image = await this.$request.getProfileImageFile(this.userId);

                    if(image instanceof ArrayBuffer) {

                        const imageBase64 = Buffer.from(image).toString('base64');
                        this.userProfile = 'data:image/png;base64, ' + imageBase64;

                    }

                }

                // get images
                const imageList = postData.image;
                for(let i = 0; i < imageList.length; i++) {

                    // save base64 image to list
                    const image = await this.$request.getImageFile(token, postId, imageList[i]);

                    if(image instanceof ArrayBuffer) {

                        const imageBase64 = Buffer.from(image).toString('base64');
                        this.imageList.push('data:image/png;base64, ' + imageBase64);

                    }

                }

                // show image
                if(this.imageList.length > 0) thisElement.getElementsByClassName('post-image')[0].style.display = 'block';

            }

        } catch(error) {

            console.log(error);

        }

    }

    export default {
        props: {
            postId: Number
        },

        data() {
            return {
                userId: 0,
                userName: '',
                userProfile: profileImage,
                text: '',
                imageList: []
            };
        },

        mounted() {
            this.getPostData(this.postId);
        },

        methods: {
            getPostData
        }
    }
</script>

<style scoped>
    .post-container {
        flex: 1;

        width: 500px;
        border-radius: 10px;
        margin-bottom: 50px;
        background-color: #FAFAFA;

        cursor: pointer;

        display: flex;
        flex-direction: column;

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

        display: none;
    }

    .post-content {
        padding: 15px;
    }
</style>
