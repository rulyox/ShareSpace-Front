<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <i id="post-modal-close" class="el-icon-close" v-on:click="$emit('close')"></i>

                    <div id="post-modal-content">

                        <div id="post-modal-header" v-on:click="clickHeader">
                            <img id="post-modal-user" v-bind:src="userImage" alt="user image">
                            <span>{{userName}}</span>
                        </div>

                        <div id="post-modal-image-container">
                            <img id="post-modal-image" v-bind:src="currentImageFile" alt="post image">
                            <div>
                                <el-button id="post-modal-image-shift-left" icon="el-icon-arrow-left" circle v-bind:disabled="currentImageIndex <= 0" v-on:click="clickImageShift(-1)"></el-button>
                                <span id="post-modal-image-counter">{{currentImageIndex + 1}} / {{imageList.length}}</span>
                                <el-button id="post-modal-image-shift-right" icon="el-icon-arrow-right" circle v-bind:disabled="currentImageIndex >= imageList.length-1" v-on:click="clickImageShift(1)"></el-button>
                            </div>
                        </div>

                        <div id="post-modal-text" v-html="showText"></div>

                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import profileImage from '../../assets/profile.png';

    function clickImageShift(move) {

        const targetIndex = this.currentImageIndex + move;

        if(targetIndex >= 0 && targetIndex < this.imageList.length) this.currentImageIndex = targetIndex;

    }

    function clickHeader() {

        const path = '/profile/' + this.userAccess;
        if(this.$router.currentRoute.path !== path) this.$router.push(path);

    }

    async function getPostData() {

        try {

            const postDataResult = await this.$request.getPostData(this.token, this.postAccess);

            if(postDataResult.result === 101) { // OK

                const postData = postDataResult.data;

                this.userAccess = postData.user;
                this.userName = postData.name;
                this.text = postData.text;

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

        // show image
        if(this.imageList.length > 0) this.imageElement.style.display = 'flex';

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
                currentImageIndex: 0
            }
        },

        computed: {
            token() { return this.$store.getters.token; },
            showText() { return this.text.replace(/(?:\r\n|\r|\n)/g, '<br>'); },
            imageElement() { return document.getElementById('post-modal-image-container'); },
            currentImageFile() { return this.imageList[this.currentImageIndex]; }
        },

        mounted() {
            this.getPostData();
        },

        methods: {
            getPostData,
            getProfileImage,
            getImages,
            clickImageShift,
            clickHeader
        }
    };
</script>

<style scoped>
    #post-modal-close {
        position: absolute;
        top: 15px;
        right: 15px;

        font-size: 20px;
    }

    #post-modal-content {
        padding: 50px 50px;

        display: flex;
        flex-direction: column;
    }

    #post-modal-header {
        height: 40px;
        padding: 15px;

        font-weight: 700;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #post-modal-user {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin-right: 15px;
        background-color: black;
    }

    #post-modal-image-container {
        align-self: center;
        margin-top: 30px;
        margin-bottom: 30px;

        display: none;
        flex-direction: column;
        align-items: center;
    }

    #post-modal-image {
        width: 500px;
        height: 500px;
        margin-bottom: 15px;

        background-color: black;
        border: 1px solid #DDDDDD;
        border-radius: 10px;
    }

    #post-modal-image-counter {
        margin-left: 15px;
        margin-right: 15px;
    }

    #post-modal-text {
        margin-left: 15px;
        margin-right: 15px;
    }

    .modal-container {
        position: relative;

        width: 700px;
        margin: 0 auto;

        background-color: #FAFAFA;
        border-radius: 20px;

        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
    }

    /* Below are default settings */

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
