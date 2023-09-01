<template>
  <div class="pairs">
    <div class="pairs__container">
      <div v-for="(card, i) in shuffledContent" :key="i">
        <div class="card" :style="getBackground(card)" />
      </div>
    </div>
  </div>
</template>

<script>
import Marvel from '../content/marvel';
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

export default {
  setup() {
    const content = Array(4).fill(Marvel.characters).flat();

    const shuffledContent = computed(() => {
      const copyContent = [...content];
      for (let i = copyContent.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copyContent[i], copyContent[j]] = [copyContent[j], copyContent[i]];
      }
      return copyContent;
    });

    const getBackground = (card) => {
      return {
        backgroundImage: `url(${card.image})`,
      };
    };

    return {
      shuffledContent,
      getBackground,
    };
  },
};
</script>

<style scoped lang="scss">
.pairs {
  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 90vw;
    flex-wrap: wrap;
    margin: 0 auto;
  }
}
.card {
  background-color: $blue;
  height: 20vh;
  width: 15vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 20px;
  margin-right: 16px;
  margin-bottom: 16px;
  // border: 1px solid grey;
}
</style>
