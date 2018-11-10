<template>
  <div id="app">
    <Intro v-if="isIntro" :onStartGame="startGame"></Intro>
    <Game v-else-if="isGame" :gamePoints="points" :dataCards="cards"></Game>
    <Result v-else :playAgain="startGame" :resultPoints="points"></Result>
  </div>
</template>

<script>
import Intro from './components/Intro.vue'
import Game from './components/Game.vue'
import Result from './components/Result.vue'

export default {
  name: 'app',
  components: {
    Intro,
    Game,
    Result
  },
  data () {
    return {
      isIntro: true,
      isGame: false,
      points: 0,
      CARDS_ARRAY: ['0', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'A', 'K', 'Q'],
      CARDS_ARRAY_STR: ['C', 'D', 'H', 'S'],
      cards: []
    }
  },
  methods: {
    startGame () {
      this.isIntro = false
      this.isGame = true
      this.randomCards()
    },
    randomValueArray: function (array) {
      return Math.round(Math.random() * (array.length - 1))
    },
    randomCards: function () {
      var cardsResultTemp = []
      var cardsTemp = []
      var arrayCards = this.CARDS_ARRAY.slice()
      var randomValueCardsSuit = this.CARDS_ARRAY_STR[this.randomValueArray(this.CARDS_ARRAY_STR)]
      this.cards.splice(0)

      for (var i = 0; i < 9; i++) {
        cardsTemp.push(arrayCards.splice(this.randomValueArray(arrayCards), 1)[0])
      }

      cardsTemp.forEach(function (item) {
        for (var i = 0; i < 2; i++) {
          cardsResultTemp.push('card__' + item + randomValueCardsSuit)
        }
      })

      for (let i = 0; i < 18; i++) {
        this.cards.push(cardsResultTemp.splice(this.randomValueArray(cardsResultTemp), 1)[0])
      }
    }
  }
}
</script>

<style lang="less">
body {
  background-color: #1b692d;
  margin: 0;
}
#app {
  font-family: Open Sans,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  display: flex;
  justify-content: center;
  // align-items: center;
  flex-direction: column;
  @media screen and (min-height: 387px){
    height: 100vh;
  }
}
img {
  max-width: 100%;
}
.title {
  font-size: 1.75rem;
  text-transform: uppercase;
  letter-spacing: .2px;
  &_final-score {
    opacity: 0.85;
    font-weight: bold;
    font-size: 1.5rem;
    color: #FFFFFF;
    letter-spacing: 0.15px;
    line-height: 1.5625rem;
    text-align: center;
  }
}
.btn {
  font-size: 1rem;
  line-height: 1.375rem;
  color: #1c7430;
  font-family: 'Open Sans',sans-serif;
  font-weight: 700;
  background-color: #fff;
  opacity: .85;
  border-radius: 4px;
  border: 0;
  outline: none;
  padding: .6rem .5rem;
  cursor: pointer;
  &_start-over {
    opacity: .8;
    font-family: 'Open Sans',sans-serif;
    font-size: .875rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: -.25px;
    background-color: transparent;
    padding: 0;
    margin-right: auto;
  }
}
</style>
