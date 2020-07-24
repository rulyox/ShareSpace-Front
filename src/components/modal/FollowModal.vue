<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <i id="follow-modal__close" class="el-icon-close"
                       v-on:click="$emit('close')" />

                    <div id="follow-modal__content">

                        <User v-for="user in this.list"
                              v-bind:key="user"
                              v-bind:userAccess="user" />

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
    #follow-modal__close {
        position: absolute;
        top: 15px;
        right: 15px;

        font-size: 20px;
    }

    #follow-modal__content {
        padding: 50px;

        display: flex;
        flex-direction: column;
        align-items: center;
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
</style>
