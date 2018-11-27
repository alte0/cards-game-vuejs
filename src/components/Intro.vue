<template lang="pug">
  div
    img(src="@/assets/startGame.png" srcset="@/assets/startGame.png 1x, @/assets/startGame@2x.png 2x" alt="Картинка карт")
    h1.title Memory Game
    h4 Привет, {{ userName }}!
    button.btn.btn_vk(v-on:click="connectVk()") Войти ВКонтакте
    br
    button.btn(v-on:click="onStartGame()") Начать игру
</template>

<script>
export default {
  props: ['onStartGame', 'connectVk', 'userName']
}
</script>
