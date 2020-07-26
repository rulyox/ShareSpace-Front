<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <i id="post-modal__close" class="el-icon-close"
                       v-on:click="$emit('close')"></i>

                    <div id="post-modal__content">

                        <div id="post-modal__content-left">

                            <div id="post-modal__content__header">

                                <img id="post-modal__content__header__user"
                                     v-bind:src="userImage"
                                     alt="user image"
                                     v-on:click="clickHeader">

                                <span id="post-modal__content__header__name"
                                      v-on:click="clickHeader">
                                {{userName}}
                            </span>

                                <span id="post-modal__content__header__time">
                                {{time}}
                            </span>

                                <i id="post-modal__content__header__delete" class="el-icon-delete-solid"
                                   v-if="userAccess === accountUserData.access"
                                   v-on:click="clickDelete" />

                            </div>

                            <div id="post-modal__content__image-container">

                                <img id="post-modal__content__image"
                                     v-bind:src="currentImageFile"
                                     alt="post image">

                                <div>
                                    <el-button id="post-modal__content__image__shift-left"
                                               icon="el-icon-arrow-left" circle
                                               v-bind:disabled="currentImageIndex <= 0"
                                               v-on:click="clickImageShift(-1)" />
                                    <span id="post-modal__content__image__counter">{{currentImageIndex + 1}} / {{imageList.length}}</span>
                                    <el-button id="post-modal__content__image__shift-right"
                                               icon="el-icon-arrow-right" circle
                                               v-bind:disabled="currentImageIndex >= imageList.length-1"
                                               v-on:click="clickImageShift(1)" />
                                </div>

                            </div>

                            <div v-html="showText"></div>

                        </div>

                        <div id="post-modal__content-right">

                            <div id="post-modal__content__footer">

                                <el-button type="primary"
                                           style="margin-right: 15px;"
                                           v-bind:icon="userLiked?'el-icon-star-on':'el-icon-star-off'"
                                           v-on:click="clickLike">
                                    {{likeList.length}}
                                </el-button>

                                <i class="el-icon-chat-line-square" style="margin-right: 5px;"></i>
                                <span style="margin-right: 15px;">
                                {{commentList.length}}
                            </span>

                                <el-input placeholder="Write comment"
                                          v-model="commentText"
                                          v-on:keydown.native.enter="clickCommentWrite">
                                    <el-button slot="append" icon="el-icon-edit"
                                               v-on:click="clickCommentWrite" />
                                </el-input>

                            </div>

                            <div id="post-modal__content__comment-container">

                                <Comment v-for="comment in this.commentList"
                                         v-bind:key="comment.id"
                                         v-bind:commentAccess="comment.access"
                                         v-bind:userAccess="comment.user"
                                         v-bind:commentText="comment.comment"
                                         v-bind:commentTime="comment.time"
                                         v-on:delete="getPostComment" />

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Comment from '../item/Comment';
    import * as request from '../../requests';
    import * as utility from '../../utility';
    import profileImage from '../../assets/profile.png';

    async function getPostData() {

        try {

            const getPostData = await request.getPostData(this.token, this.postAccess);

            if(getPostData.code === 101) {

                const result = getPostData.result;

                this.userAccess = result.user;
                this.userName = result.name;
                this.text = result.text;
                this.time = result.time;

                // get profile image
                const profileImage = result.profile;
                if(profileImage !== null) await this.getProfileImage();

                // get images
                const imageList = result.image;
                await this.getImages(imageList);

            } else console.log(getPostData);

        } catch(error) { console.log(error); }

    }

    async function getPostLike() {

        try {

            const getLike = await request.getLike(this.token, this.postAccess);

            if(getLike.code === 101) {

                const result = getLike.result;

                this.likeList = result.user;

                // if account user has clicked like
                this.userLiked = this.likeList.includes(this.accountUserData.access);

            } else console.log(getLike);

        } catch(error) { console.log(error); }

    }

    async function getPostComment() {

        try {

            const getComment = await request.getComment(this.token, this.postAccess);

            if(getComment.code === 101) {

                const result = getComment.result;

                this.commentList = result.comment;

                if(this.commentList.length > 0) this.commentElement.style.display = 'block';

            } else console.log(getComment);

        } catch(error) { console.log(error); }

    }

    async function getProfileImage() {

        const image = await request.getProfileImageFile(this.userAccess);
        this.userImage = utility.imageToBase64(image);

    }

    async function getImages(imageList) {

        for(let i = 0; i < imageList.length; i++) {

            // save base64 image to list
            const image = await request.getImageFile(this.token, this.postAccess, imageList[i]);
            this.imageList.push(utility.imageToBase64(image));

        }

        // show image
        if(this.imageList.length > 0) this.imageElement.style.display = 'flex';

    }

    function clickImageShift(move) {

        const targetIndex = this.currentImageIndex + move;

        if(targetIndex >= 0 && targetIndex < this.imageList.length) this.currentImageIndex = targetIndex;

    }

    function clickHeader() {

        const path = '/profile/' + this.userAccess;
        if(this.$router.currentRoute.path !== path) this.$router.push(path);

    }

    async function clickLike() {

        try {

            if(this.userLiked) await request.likePost(this.token, this.postAccess, false);
            else await request.likePost(this.token, this.postAccess, true);

            await this.getPostLike();

        } catch(error) { console.log(error); }

    }

    async function clickCommentWrite() {

        const commentText = this.commentText;

        if(commentText === '') return;

        this.commentText = '';

        try {

            await request.writeComment(this.token, this.postAccess, commentText);

            await this.getPostComment();

        } catch(error) { console.log(error); }

    }

    async function clickDelete() {

        try {

            const deletePost = await request.deletePost(this.token, this.postAccess);

            if(deletePost.code === 101) {

                this.$emit('delete');

            } else console.log(deletePost);

        } catch(error) { console.log(error); }

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
                time: '',
                imageList: [],
                currentImageIndex: 0,
                likeList: [],
                userLiked: false,
                commentText: '',
                commentList: []
            }
        },

        computed: {
            token() { return this.$store.getters.token; },
            accountUserData() { return this.$store.getters.userData; },

            imageElement() { return document.getElementById('post-modal__content__image-container'); },
            commentElement() { return document.getElementById('post-modal__content__comment-container'); },

            showText() { return this.text.replace(/(?:\r\n|\r|\n)/g, '<br>'); },
            currentImageFile() { return this.imageList[this.currentImageIndex]; }
        },

        mounted() {
            this.getPostData();
            this.getPostLike();
            this.getPostComment();
        },

        methods: {
            getPostData,
            getPostLike,
            getPostComment,
            getProfileImage,
            getImages,

            clickImageShift,
            clickHeader,
            clickLike,
            clickCommentWrite,
            clickDelete
        },

        components: {
            Comment
        }
    };
</script>

<style scoped>
    #post-modal__close {
        position: absolute;
        top: 15px;
        right: 15px;

        font-size: 20px;
    }

    #post-modal__content {
        width: 1150px;

        display: flex;
        flex-direction: row;
    }

    #post-modal__content-left {
        width: 500px;
        margin: 50px 0 50px 50px;
    }

    #post-modal__content-right {
        width: 500px;
        margin: 50px;
    }

    #post-modal__content__header {
        height: 40px;
        margin-bottom: 30px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #post-modal__content__header__user {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin-right: 15px;
        background-color: black;
    }

    #post-modal__content__header__name {
        font-weight: 700;
    }

    #post-modal__content__header__time {
        margin-left: auto;
    }

    #post-modal__content__header__delete {
        font-size: 20px;
        margin-left: 20px;
    }

    #post-modal__content__image-container {
        align-self: center;
        margin-bottom: 30px;

        display: none;
        flex-direction: column;
        align-items: center;
    }

    #post-modal__content__image {
        width: 500px;
        height: 500px;
        margin-bottom: 15px;

        background-color: black;
        border: 1px solid #DDDDDD;
        border-radius: 10px;
    }

    #post-modal__content__image__counter {
        margin-left: 15px;
        margin-right: 15px;
    }

    #post-modal__content__footer {
        color: #253B80;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #post-modal__content__comment-container {
        display: none;

        margin-top: 30px;
        background-color: #EEEEEE;
        border-radius: 10px;
    }

    .modal-container {
        position: relative;

        width: 1150px;
        margin: 0 auto;
        max-height: 90vh;
        overflow-x: hidden;
        overflow-y: auto;

        background-color: #FAFAFA;
        border-radius: 20px;

        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
    }

    .modal-container::-webkit-scrollbar {
        width: 5px;
        background: none;
    }

    .modal-container::-webkit-scrollbar-thumb {
        background: #253B80;
    }

    .modal-container::-webkit-scrollbar-track {
        background: none;
    }
</style>
