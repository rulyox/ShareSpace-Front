<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div id="write-modal__title">
                        Write New Post
                    </div>

                    <div id="write-modal__image-container">

                        <input id="write-modal__image-input"
                               type="file"
                               accept="image/png, image/jpeg"
                               v-on:change="uploadImage"
                               ref="image">

                        <el-button id="write-modal__image-button"
                                   type="primary"
                                   icon="el-icon-picture" circle
                                   v-on:click="clickUpload" />

                        <img class="write-modal__image-preview"
                             v-for="(image, index) in this.imagePreviewList"
                             v-bind:key="index"
                             v-bind:src="imagePreviewList[index]"
                             alt="image-preview">

                    </div>

                    <el-input type="textarea" autosize placeholder="Enter text" v-model="text" />

                    <div id="write-modal__button-container">
                        <el-button type="primary"
                                   v-on:click="clickWrite">
                            Post
                        </el-button>
                        <el-button v-on:click="$emit('close')">
                            Close
                        </el-button>
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import request from '../../requests';
    import * as utility from '../../utility';

    function clickUpload() {

        this.imageInputElement.click()

    }

    async function uploadImage() {

        try {

            // add to list
            const imageFile = this.$refs.image.files[0];
            this.imageList.push(imageFile);

            // add to preview
            const imageBase64 = await utility.fileToBase64(imageFile);
            this.imagePreviewList.push(imageBase64);

        } catch(error) { console.log(error); }

    }

    async function clickWrite() {

        try {

            await request.post.write(this.token, this.text, this.imageList);

            // close modal
            this.$emit('close');
            this.$emit('write');

        } catch(error) { console.log(error); }

    }

    export default {
        data() {
            return {
                text: '',
                imageList: [],
                imagePreviewList: []
            };
        },

        computed: {
            token() { return this.$store.getters.token; },

            imageInputElement() { return document.getElementById('write-modal__image-input'); }
        },

        methods: {
            clickUpload,
            uploadImage,
            clickWrite
        }
    };
</script>

<style scoped>
    #write-modal__title {
        font-size: 20px;
        font-weight: 700;

        margin-bottom: 30px;
    }

    #write-modal__image-container {
        width: 100%;
        margin-left: 15px;
        margin-right: 15px;
        margin-bottom: 15px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #write-modal__image-input {
        display: none;
    }

    #write-modal__image-button {
        margin-right: 15px;
    }

    .write-modal__image-preview {
        width: 100px;
        height: 100px;
        margin-right: 15px;

        background-color: black;
        border: 1px solid #DDDDDD;
    }

    #write-modal__button-container {
        margin-top: 30px;
    }

    .modal-container {
        width: 700px;
        margin: 0 auto;
        padding: 50px 50px;

        background-color: #FAFAFA;
        border-radius: 20px;

        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;

        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
