<template>
    <div id="search-container">

        <div id="search-user-list-container">

            <div id="search-user-list">

                <User v-for="user in this.userList"
                      v-bind:key="user"
                      v-bind:userAccess="user"></User>

                <div v-if="isLoadingUser" class="loading-indicator"></div>

            </div>

        </div>

    </div>
</template>

<script>
    import User from '../item/User';
    import * as request from '../../requests';

    async function searchUser() {

        this.$store.commit('resetUserLoadingNumber');

        try {

            const userList = (await request.searchUser(this.query)).result;
            this.addToUserList(userList);

        } catch(error) { console.log(error); }

    }

    function addToUserList(userList) {

        for(const user of userList) {

            this.$store.commit('increaseUserLoadingNumber');
            this.userList.push(user.access);

        }

    }

    function reset() {

        // reset all data
        Object.assign(this.$data, this.$options.data());

        this.searchUser();

    }

    export default {
        props: {
            query: String
        },

        data() {
            return {
                userList: []
            };
        },

        computed: {
            isLoadingUser() { return (this.$store.getters.userLoadingNumber > 0); }
        },

        mounted() {
            this.searchUser();
        },

        watch: {
            query() { this.reset(); }
        },

        methods: {
            searchUser,
            addToUserList,
            reset
        },

        components: {
            User
        }
    };
</script>

<style scoped>
    #search-container {
        flex: 1;

        background-color: #F5F5F5;

        display: flex;
        flex-direction: column;
    }

    #search-user-list-container {
        flex: 1;
        overflow: auto;
    }

    #search-user-list-container::-webkit-scrollbar {
        width: 10px;
        background: none;
    }

    #search-user-list-container::-webkit-scrollbar-thumb {
        background: #253B80;
    }

    #search-user-list-container::-webkit-scrollbar-track {
        background: none;
    }

    #search-user-list {
        margin: 50px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
