<template>
    <div class="playground">
        <GameMap />
    </div>
</template>

<script>
import GameMap from './GameMap.vue';

export default {
    components: {
        GameMap,
    }
}
</script>

<style scoped>
div.playground {
    height: 70vh;
    width: 60vw;
    
    margin: 40px auto;

}
</style>