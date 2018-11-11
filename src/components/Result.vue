<template lang="pug">
  div
    img(src="@/assets/result.png" srcset="@/assets/result.png 1x, @/assets/result@2x.png 2x" alt="Картинка карт")
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
