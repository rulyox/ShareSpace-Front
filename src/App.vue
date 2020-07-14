<template>
    <div class="app-container">

        <router-view name="appContent"></router-view>

    </div>
</template>

<script>
    export default { };
</script>

<style>
    html, body {
        font-family: 'Noto Sans', sans-serif;

        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    .app-container {
        height: 100%;
        width: 100%;
    }

    /* Vue Modal */
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

    /* Loading Indicator */
    .loading-indicator:before,
    .loading-indicator:after,
    .loading-indicator {
        border-radius: 50%;
        animation-fill-mode: both;
        animation: loading-indicator 1.8s infinite ease-in-out;
    }

    .loading-indicator {
        position: relative;
        top: -2em;
        width: 2em;
        height: 2em;

        vertical-align: middle;
        pointer-events: none;

        color: #253B80;
        animation-delay: -0.16s;
    }

    .loading-indicator:before {
        right: 150%;
        animation-delay: -0.32s;
    }

    .loading-indicator:after {
        left: 150%;
    }

    .loading-indicator:before,
    .loading-indicator:after {
        content: '';
        display: block;
        position: absolute;
        width: inherit;
        height: inherit;
    }

    @keyframes loading-indicator {
        0%, 80%, 100% {
            box-shadow: 0 2em 0 -2em;
        }
        40% {
            box-shadow: 0 2em 0 -0.4em;
        }
    }
</style>
