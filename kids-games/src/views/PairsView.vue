<template>
  <div class="pairs">
    <div v-if="content" class="pairs__container">
      <div v-for="(card, i) in content" :key="i">
        <div v-if="card.hide" :ref="i" class="card hidden" @click="turnCard($event, card, i)" />
        <div v-else :ref="i" class="card" :style="getBackground(card)" />
      </div>
    </div>
  </div>
</template>

<script>
import Marvel from '../content/marvel';
import { ref, computed, onMounted, onBeforeUnmount, watch, Vue } from 'vue';

export default {
  setup() {
    const content = ref(null);
    const selectedCards = ref([]);

    const shuffledContent = onMounted(() => {
      const copyContent = Array(4).fill(Marvel.characters).flat();
      for (let i = copyContent.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copyContent[i], copyContent[j]] = [copyContent[j], copyContent[i]];
      }
      content.value = copyContent.map((card) => ({ ...card, hide: true }));
    });

    function turnCard(ev, card, i) {
      if (selectedCards.value.length < 2) {
        selectedCards.value.push({card: card, index: i});
        ev.target.style.transform = 'rotateY(180deg)';
        setTimeout(() => {
          content.value[i].hide = false;
        }, 200);
        if (selectedCards.value.length == 2) {
          setTimeout(() => {
          checkCards()
          }, 1500);
        }
      }
    }

    function checkCards() {
      const cardA = selectedCards.value[0];
      const cardB = selectedCards.value[1];
      if (cardA.card.id != cardB.card.id) {
        content.value[cardA.index].hide = true;
        content.value[cardB.index].hide = true;
      }
      selectedCards.value = [];
    }

    function getBackground(card) {
      return {
        backgroundImage: `url(${card.image})`,
      };
    }

    return {
      shuffledContent,
      getBackground,
      turnCard,
      content,
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
  transition: transform 0.5s;
  transform-style: preserve-3d;
  // border: 1px solid grey;
  &.hidden {
    background-image: url("https://img.favpng.com/16/13/18/captain-america-s-shield-black-widow-s-h-i-e-l-d-png-favpng-vLfB5VzBSmf3BphnUiBbrdMYP.jpg");
  }

}
</style>
