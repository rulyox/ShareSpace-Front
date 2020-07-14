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
