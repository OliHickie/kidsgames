<template>
  <div class="pairs">
    <div class="pairs__container">
      <div v-for="(card, i) in content" :key="i">
        <div class="card" :style="getBackground(card)" />
      </div>
    </div>
  </div>
</template>

<script>
import Marvel from '../content/marvel';

export default {
  data() {
    return {
      content: [...Marvel.characters, ...Marvel.characters],
    }
  },
  methods: {
    getBackground(card) {
      return {
        backgroundImage: `url(${card.image})`,
      }
    }
  }
}

</script>

<style scoped lang="scss">

.pairs {
  &__container {
    display: flex;
    max-width: 90vw;
    flex-wrap: wrap;
    margin: 0 auto;
  }
}
.card {
  background-color: $blue;
  height: 30vh;
  width: 20vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 20px;
  margin-right: 16px;
  margin-bottom: 16px;
}
</style>
