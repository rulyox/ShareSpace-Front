<template>
    <div class="home-container">

        <Header />

        <div class="home__content">
            <router-view name="homeContent" />
        </div>

    </div>
</template>

<script>
    import Header from './Header';

    export default {
        components: {
            Header
        }
    };
</script>

<style scoped>
    .home-container {
        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;
    }

    .home__content {
        flex: 1;

        overflow: hidden;
        background-color: #FAFAFA;

        display: flex;
    }
</style>
