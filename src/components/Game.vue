<template lang="pug">
  .container
    .game-header
      button.btn.btn_start-over(v-on:click="gameStartOver") Начать заново
      span.score-text Очки:&nbsp;
      span {{ gamePoints }}
    .game-cards
      .card(v-for="card in cards" v-bind:class="[card, { card__outside: isOutside }]" v-on:click="clickCardHandler")
</template>

<script>
export default {
  props: ['gamePoints']
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
.game-header,
.game-cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
span {
  opacity: .8;
  font-weight: 600;
  font-size: .875rem;
  line-height: 1.5625rem;
}
</style>
