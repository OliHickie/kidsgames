<template>
  <div class="pairs">
    <div v-if="content" class="pairs__container">
      <div v-for="(card, i) in content" :key="i">
        <div v-if="card.hide" :ref="i" class="card hidden" @click="turnCard($event, card, i)" />
        <div v-else :ref="i" class="card" :style="getBackground(card)">
          <div v-if="card.wonBy" class="card__won">
            <span v-html="card.wonBy" class="card__won--letter" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="showPlayerNames" class="playerNames">
      <div class="playerNames__form">
        <label for="player1">Player 1 Name:</label>
        <input
          type="text"
          id="player1"
          v-model="player1Name"
          placeholder="Enter Player 1 Name"
        />

        <label for="player2">Player 2 Name:</label>
        <input
          type="text"
          id="player2"
          v-model="player2Name"
          placeholder="Enter Player 2 Name"
        />

        <button @click="startGame">Start Game</button>

      </div>
    </div>
  </div>
</template>

<script>
import Marvel from '../content/marvel';
import Colours from '../content/colours';
import { useRoute } from 'vue-router';
import { ref, computed, onMounted, onBeforeUnmount, watch, Vue } from 'vue';

export default {
  setup() {
    const content = ref(null);
    const selectedCards = ref([]);
    const showPlayerNames = ref(false);
    const player1Name = ref('');
    const player2Name = ref('');
    const playersTurn = player1Name.value;

    const getModeFromQuery = computed(() => {
      const query = useRoute().query.mode;
      switch(query) {
        case 'marvel':
          return Marvel;
        case 'colours':
          return Colours;
        default:
      }
    })

    const shuffledContent = onMounted(() => {
      showPlayerNames.value = true;
      const mode = getModeFromQuery;
      const copyContent = Array(4).fill(mode.value).flat();
      for (let i = copyContent.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copyContent[i], copyContent[j]] = [copyContent[j], copyContent[i]];
      }
      content.value = copyContent.map((card) => ({ 
        ...card,
        hide: true,
      }));
    });

    function startGame() {
      showPlayerNames.value = false;
    }

    function turnCard(ev, card, i) {
      if (selectedCards.value.length < 2) {
        selectedCards.value.push({card: card, index: i});
        ev.target.style.transform = 'rotateY(180deg)';
        setTimeout(() => {
          content.value[i].hide = false;
        }, 200);
        if (selectedCards.value.length == 2) {
          checkCards()
        }
      }
    }

    function checkCards() {
      const cardA = selectedCards.value[0];
      const cardB = selectedCards.value[1];
      if (cardA.card.id != cardB.card.id) {
        setTimeout(() => {
          content.value[cardA.index].hide = true;
          content.value[cardB.index].hide = true;
          }, 1500);
      }
      else {
        setTimeout(() => {
        content.value[cardA.index].wonBy = 'R';
        content.value[cardB.index].wonBy = 'R';
      }, 1000);
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
      showPlayerNames,
      startGame,
      player1Name,
      player2Name,
      playersTurn,
    };
  },
};
</script>

<style scoped lang="scss">
$border-radius: 20px;
.pairs {
  &__container {
    display: grid;
    grid-template-columns: repeat(8, minmax(120px, 160px));
    align-items: center;
    justify-content: center;
    max-width: 90vw;
    flex-wrap: wrap;
    margin: 0 auto;
  }
}
.card {
  background-color: $white;
  height: 20vh;
  width: 15vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: $border-radius;
  margin-right: 16px;
  margin-bottom: 16px;
  transition: transform 0.5s;
  transform-style: preserve-3d;
  // border: 1px solid grey;
  &.hidden {
    background-image: url("https://img.favpng.com/16/13/18/captain-america-s-shield-black-widow-s-h-i-e-l-d-png-favpng-vLfB5VzBSmf3BphnUiBbrdMYP.jpg");
  }
  &__won {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    font-size: 60px;
    font-family: $kavoon;
    color: $yellow;
    border-radius: $border-radius;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.playerNames {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  &__form {
    background-color: $darkBlue;
    padding: 30px;
    display: flex;
    flex-direction: column;
    font-size: 20px;
    & label {
      color: $white;
      margin: 10px;
    }
    & button {
      margin-top: 16px;
    }
  }
}
</style>
