<template>
  <div>
    <h1>Rhys & Zach's Games</h1>
    <button @click="marvelPairs()">
      Marvel Pairs
    </button>
  </div>
  
</template>

<script>
import router from '@/router';


export default {
  name: "HomeView",
  components: {},
  setup() {
    const marvelPairs = () => {
      router.push({ name: 'pairs', query: { mode: 'marvel'}})
    }
    return {
      marvelPairs,
    }; 
  }
};
</script>

<style lang="scss">
p {
  color: $yellow;
}
</style>
