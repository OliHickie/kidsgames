<template>
  <div>
    <h1>Rhys & Zach's Games</h1>
    <button @click="pairs('marvel')">
      Marvel Pairs
    </button>
    <button @click="pairs('colours')">
      Colours Pairs
    </button>
  </div>
  
</template>

<script>
import router from '@/router';


export default {
  name: "HomeView",
  components: {},
  setup() {
    const pairs = (mode) => {
      router.push({ name: 'pairs', query: { mode: mode}})
    }
    return {
      pairs,
    }; 
  }
};
</script>

<style lang="scss">
p {
  color: $yellow;
}
</style>
