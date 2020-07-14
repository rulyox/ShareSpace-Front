<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div id="modal-title-container">Write New Post</div>

                    <div id="modal-image-container">

                        <input id="input-image"
                               type="file"
                               accept="image/png, image/jpeg"
                               v-on:change="uploadImage"
                               ref="image">

                        <el-button id="button-image"
                                   type="primary"
                                   icon="el-icon-picture" circle
                                   v-on:click="clickUpload"></el-button>

                        <img class="image-preview"
                             v-for="(image, index) in this.imagePreviewList"
                             v-bind:key="index"
                             v-bind:src="imagePreviewList[index]"
                             alt="image-preview">

                    </div>

                    <el-input type="textarea" autosize placeholder="Enter text" v-model="text"></el-input>

                    <div id="modal-button-container">
                        <el-button type="success"
                                   v-on:click="clickWrite"
                        >Post</el-button>
                        <el-button type="danger"
                                   v-on:click="$emit('close')"
                        >Close</el-button>
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import * as request from '../../requests';
    import * as utility from '../../utility';

    function clickUpload() {

        document.getElementById('input-image').click()

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

            await request.writePost(this.token, this.text, this.imageList);

            // close modal
            this.$emit('close');

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
            token() { return this.$store.getters.token; }
        },

        methods: {
            clickUpload,
            uploadImage,
            clickWrite
        }
    };
</script>

<style scoped>
    #modal-title-container {
        font-size: 20px;
        font-weight: 700;

        margin-bottom: 30px;
    }

    #modal-image-container {
        width: 100%;
        margin-left: 15px;
        margin-right: 15px;
        margin-bottom: 15px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #input-image {
        display: none;
    }

    #button-image {
        margin-right: 15px;
    }

    .image-preview {
        width: 100px;
        height: 100px;
        margin-right: 15px;

        background-color: black;
        border: 1px solid #DDDDDD;
    }

    #modal-button-container {
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
