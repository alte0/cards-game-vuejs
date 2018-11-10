<template lang="pug">
  div
    img(src="../assets/Result.png" srcset="../assets/Result.png 1x, ../assets/Result@2x.png 2x" alt="")
    h1.title_final-score Поздравляем!
      br
      | Ваш итоговый счет:
      span  {{ resultPoints }}
    button.btn(v-on:click="playAgain") Еще раз
</template>

<script>
export default {
  props: ['playAgain', 'resultPoints']
}
</script>

<style lang="less">

</style>
