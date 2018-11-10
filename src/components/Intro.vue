<template lang="pug">
  div
    img(src="../assets/StartGame.png" srcset="../assets/StartGame.png 1x, ../assets/StartGame@2x.png 2x" alt="Картинка карт")
    h1.title Memory Game
    button.btn(v-on:click="onStartGame()") Начать игру
</template>

<script>
export default {
  props: ['onStartGame']
}
</script>
