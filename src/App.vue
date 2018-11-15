<template>
  <div id="app">
    <Intro
      v-if="isIntro"
      :onStartGame="startGame"
      ></Intro>
    <Game
      v-else-if="isGame"
      :gamePoints="points"
      :onRestartGame="startGame"
      :gameEnd="gameEnd"
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
      isIntro: true,
      isGame: false
    }
  },
  computed: {
    points () {
      return this.$store.getters.getPoints
    }
  },
  methods: {
    setPoints (point) {
      this.points = point
    },
    startGame () {
      this.isIntro = false
      this.isGame = true
      this.$store.commit('randomCards')
    },
    gameEnd () {
      this.isGame = false
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
