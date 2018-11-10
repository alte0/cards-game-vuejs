<template lang="pug">
  div
    .game__play-header
      button#play-start-over.btn.btn__start-over(v-on:click="gameStartOver") Начать заново
      span.game__score Очки:&nbsp;&nbsp;&nbsp;&nbsp;
      span#score.game__score {{ gamePoints }}
    //- .game__play-cards
      .card(v-for="card in cards" v-bind:class="[card, { card__outside: isOutside }]" v-on:click="clickCardHandler")
</template>

<script>
export default {
  props: ['gamePoints']
}
</script>

<style lang="less">

</style>
