<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <i id="modal-close" class="el-icon-close" v-on:click="$emit('close')"></i>

                    <div class="modal-content">

                        <div class="post-header">
                            <img class="post-user" v-bind:src="userImage" alt="user image">
                            {{userName}}
                        </div>

                        <div class="post-content" v-html="showText"></div>

                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import profileImage from '../../assets/profile.png';

    async function getPostData(postAccess) {

        try {

            const postDataResult = await this.$request.getPostData(this.token, postAccess);

            if(postDataResult.result === 101) { // OK

                const postData = postDataResult.data;

                this.userAccess = postData.user;
                this.userName = postData.name;
                this.text = postData.text;

                // get profile image
                const profileImage = postData.profile;
                if(profileImage !== null) {

                    const image = await this.$request.getProfileImageFile(this.userAccess);

                    if(image instanceof ArrayBuffer) {

                        const imageBase64 = Buffer.from(image).toString('base64');
                        this.userImage = 'data:image/png;base64, ' + imageBase64;

                    }

                }

                // get images
                const imageList = postData.image;
                for(let i = 0; i < imageList.length; i++) {

                    // save base64 image to list
                    const image = await this.$request.getImageFile(this.token, postAccess, imageList[i]);

                    if(image instanceof ArrayBuffer) {

                        const imageBase64 = Buffer.from(image).toString('base64');
                        this.imageList.push('data:image/png;base64, ' + imageBase64);

                    }

                }

            }

        } catch(error) {

            console.log(error);

        }

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
                imageList: []
            }
        },

        computed: {
            token() { return this.$store.getters.token; },
            showText() { return this.text.replace(/(?:\r\n|\r|\n)/g, '<br>'); }
        },

        mounted() {
            this.getPostData(this.postAccess);
        },

        methods: {
            getPostData
        }
    };
</script>

<style scoped>
    #modal-close {
        position: absolute;
        top: 15px;
        right: 15px;

        font-size: 20px;
    }

    .modal-content {
        padding: 50px 50px;

        display: flex;
        flex-direction: column;
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
