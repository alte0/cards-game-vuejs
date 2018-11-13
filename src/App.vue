<template>
  <div id="app">
    <p v-if="isNotSupportIe" class="not-support">Internet Explorer не поддерживается</p>
    <Intro
      v-if="isIntro"
      :onStartGame="startGame"
      ></Intro>
    <Game
      v-else-if="isGame"
      :gamePoints="points"
      :dataCards="cards"
      :onRestartGame="startGame"
      :gameEnd="gameEnd"
      :plusPoints="setPoints"
      :minusPoints="setPoints"
      ></Game>
    <Result
      v-else-if="!isNotSupportIe"
      :playAgain="startGame"
      :resultPoints="points"
      ></Result>
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
      isNotSupportIe: true,
      isIntro: false,
      isGame: false,
      points: 0,
      CARDS_ARRAY_VALUE: ['0', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'A', 'K', 'Q'],
      CARDS_ARRAY_SUITS: ['C', 'D', 'H', 'S'],
      cards: []
    }
  },
  methods: {
    setPoints (point) {
      this.points = point
    },
    startGame () {
      this.points = 0
      this.isIntro = false
      this.isGame = true
      this.randomCards()
    },
    gameEnd () {
      this.isGame = false
    },
    /**
     * @param {Array} arr
     * @return {Number}
     */
    randomValueArray (arr) {
      return Math.round(Math.random() * (arr.length - 1))
    },
    randomCards () {
      let cardsTemp = []
      let valueCards = this.CARDS_ARRAY_VALUE.slice()
      let randomValueCardsSuit = this.CARDS_ARRAY_SUITS[this.randomValueArray(this.CARDS_ARRAY_SUITS)]
      this.cards = []

      for (let i = 0; i < 9; i++) {
        let valueCard = valueCards.splice(this.randomValueArray(valueCards), 1)[0]
        for (let i = 0; i < 2; i++) {
          cardsTemp.push(valueCard + randomValueCardsSuit)
        }
      }

      for (let i = 0; i < 18; i++) {
        this.cards.push(cardsTemp.splice(this.randomValueArray(cardsTemp), 1)[0])
      }
    }
  },
  beforeMount: function () {
    const sUsrAg = navigator.userAgent
    if (sUsrAg.indexOf('Trident') === -1) {
      this.isNotSupportIe = false
      this.isIntro = true
    }
  }
}
</script>

<style lang="less">
body {
  background-color: #1b692d;
  margin: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.not-support {
  font-size: 2rem;
  font-weight: bold;
}
#app {
  font-family: Open Sans,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media screen and (min-height: 387px){
    min-height: 100vh;
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
