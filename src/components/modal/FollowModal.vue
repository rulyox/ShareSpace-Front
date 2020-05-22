<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <i id="follow-modal-close" class="el-icon-close" v-on:click="$emit('close')"></i>

                    <div id="follow-modal-content">

                        <User v-for="user in this.list" v-bind:key="user" v-bind:userAccess="user"></User>

                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import User from '../item/User';

    export default {
        props: {
            list: Array
        },

        components: {
            User
        }
    };
</script>

<style scoped>
    #follow-modal-close {
        position: absolute;
        top: 15px;
        right: 15px;

        font-size: 20px;
    }

    #follow-modal-content {
        padding: 50px;

        display: flex;
        flex-direction: column;
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
