<template>
    <div id="settings-container">

        <div id="settings__list">

            <img id="settings__list__image"
                 v-bind:src="userImage"
                 alt="user image">

            <input id="settings__list__image-input"
                   type="file"
                   accept="image/png, image/jpeg"
                   v-on:change="uploadImage"
                   ref="image">

            <el-button class="settings__list__button"
                       type="primary"
                       v-on:click="clickUpload">
                Change Image
            </el-button>

            <el-input class="settings__list__input"
                      v-model="userName">
                <template slot="prepend">Name</template>
            </el-input>

            <el-input class="settings__list__input"
                      v-model="userPassword"
                      show-password>
                <template slot="prepend">Password</template>
            </el-input>

            <el-button class="settings__list__button"
                       type="primary"
                       v-on:click="clickSave">
                Save Changes
            </el-button>

        </div>

    </div>
</template>

<script>
    import * as request from '../../requests';
    import * as utility from '../../utility';
    import profileImage from '../../assets/profile.png';

    async function getProfileInfo() {

        this.userName = this.userData.name;

        try {

            const getProfile = await request.getProfile(this.userData.access);

            if(getProfile.code === 101) {

                const result = getProfile.result;

                // get profile image
                if(result.image !== null) await this.getProfileImage();

            } else console.log(getProfile);

        } catch(error) { console.log(error); }

    }

    async function getProfileImage() {

        const image = await request.getProfileImageFile(this.userData.access);
        this.userImage = utility.imageToBase64(image);

    }

    function clickUpload() {

        this.imageInputElement.click();

    }

    async function uploadImage() {

        try {

            const imageFile = this.$refs.image.files[0];
            this.imageFile = imageFile;

            // add to preview
            this.userImage = await utility.fileToBase64(imageFile);

        } catch(error) { console.log(error); }

    }

    async function clickSave() {

        try {

            await request.uploadProfileImage(this.token, this.imageFile);

            await request.edit(this.token, this.userName, this.userPassword);

            // reload page
            this.$router.go(0);

        } catch(error) { console.log(error); }

    }

    export default {
        data() {
            return {
                userImage: profileImage,
                imageFile: null,
                userName: '',
                userPassword: ''
            };
        },

        computed: {
            token() { return this.$store.getters.token; },
            userData() { return this.$store.getters.userData; },

            imageInputElement() { return document.getElementById('settings__list__image-input'); }
        },

        mounted() {
            this.getProfileInfo();
        },

        methods: {
            getProfileInfo,
            getProfileImage,

            clickUpload,
            uploadImage,
            clickSave
        }
    };
</script>

<style scoped>
    #settings-container {
        flex: 1;

        background-color: #F5F5F5;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #settings__list {
        width: 500px;
        margin: 50px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #settings__list__image-input {
        display: none;
    }

    #settings__list__image {
        width: 300px;
        height: 300px;
        border-radius: 30px;
        margin-bottom: 30px;
    }

    .settings__list__button {
        margin-bottom: 30px;
    }

    .settings__list__input {
        width: 500px;
        margin-bottom: 30px;
    }
</style>
