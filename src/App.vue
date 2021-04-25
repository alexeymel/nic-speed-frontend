<template>
    <div id="app">
        <Navigation/>

        <div class="m-3">
            <transition name="fade">
                <router-view />
            </transition>
        </div>
    </div>
</template>

<script>
    import Navigation from '@/components/Navigation.vue'

    export default {
        name: 'App',
        components: {
            Navigation
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition-property: opacity;
        transition-duration: 0.1s;
    }

    .fade-enter-active {
        transition-delay: 0.1s;
    }

    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>
