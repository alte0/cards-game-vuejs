<template lang="pug">
  .container
    .game-header
      button.btn.btn_start-over(v-on:click="onRestartGame") Начать заново
      span Очки:&nbsp;
      span {{ gamePoints }}
    .game-cards
      //- .card(v-for="card in dataCards" v-bind:class="[card, { card__outside: isOutside }]" v-on:click="clickCardHandler")
      .card(v-for="card in dataCards" v-bind:class="[card, { card__outside: isOutside }]")
</template>

<script>
export default {
  props: ['gamePoints', 'dataCards', 'onRestartGame'],
  data () {
    return {
      isOutside: false,
      TIME_OUTSIDE_CARDS: 5000,
      counterCheckCard: 0,
      TIME_JOB_CARD: 2000,
      TIME_JOB_CARD_ZERO: 1000,
      timerOutsideCardsId: '',
      timerSetOutsideCardsId: '',
      MULTIPLIED_NUM: 42,
      UNSOLVED_PAIRS_CARDS: 9,
      OPEN_PAIRS_CARDS: 0
    }
  },
  computed: {
  },
  methods: {
    // gameEnd () {
    //   this.screenPlay = false
    // },
    // setPointsZero () {
    //   this.points = 0
    // },
    setOutsideCards () {
      this.isOutside = true
    },
    // clearTimeId (timerID) {
    //   if (timerID) {
    //     clearTimeout(timerID)
    //   }
    // },
    setOutsideCardsForTime () {
      this.clearTimeId(this.timerOutsideCardsId)
      this.timerOutsideCardsId = setTimeout(this.setOutsideCards, this.TIME_OUTSIDE_CARDS)
    }
    // ,
    // setOneClassOpenCards () {
    //   var elements = document.querySelectorAll('.card[data-open="true"]')
    //   elements.forEach(function (item) {
    //     item.className = 'card'
    //     item.removeAttribute('data-open')
    //   })
    //   this.counterCheckCard = 0
    //   this.UNSOLVED_PAIRS_CARDS = this.UNSOLVED_PAIRS_CARDS - 1
    //   this.OPEN_PAIRS_CARDS = this.OPEN_PAIRS_CARDS + 1
    //   this.points = this.points + this.UNSOLVED_PAIRS_CARDS * this.MULTIPLIED_NUM
    //   if (this.UNSOLVED_PAIRS_CARDS === 0) {
    //     setTimeout(this.gameEnd, this.TIME_JOB_CARD_ZERO)
    //   }
    // },
    // setClassOutside () {
    //   this.counterCheckCard = 0
    //   var elements = document.querySelectorAll('.card[data-open="true"]')
    //   elements(function (item) {
    //     item.classList.toggle('card__outside')
    //     item.removeAttribute('data-open')
    //   })
    //   this.points = this.points - this.OPEN_PAIRS_CARDS * this.MULTIPLIED_NUM
    // },
    // checkCardsOpen () {
    //   var cards = document.querySelectorAll('.card[data-open="true"]')
    //   var card1 = cards[0].className.substring(5)
    //   var card2 = cards[1].className.substring(5)
    //   if (card1 === card2) {
    //     setTimeout(this.setOneClassOpenCards, this.TIME_JOB_CARD)
    //   } else {
    //     this.clearTimeId(this.timerSetOutsideCardsId)
    //     this.timerSetOutsideCardsId = setTimeout(this.setClassOutside, this.TIME_JOB_CARD)
    //   }
    // },
    // clickCardHandler (evt) {
    //   if (this.isOutside && evt.target.classList.contains('card__outside')) {
    //     if (this.counterCheckCard < 2) {
    //       this.counterCheckCard++
    //       evt.target.setAttribute('data-open', 'true')
    //       evt.target.classList.toggle('card__outside')
    //     }
    //     if (this.counterCheckCard === 2) {
    //       this.checkCardsOpen()
    //     }
    //   }
    // }
  }
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

.b-i(@char) {
  background-image: url('../assets/cards/@{char}.png');
}

.numscard(@num) when (@num >= 2) {
  .numscard(@num - 1);
  &__@{num}C {
    .b-i('@{num}C')
  }
  &__@{num}D {
    .b-i('@{num}D')
  }
  &__@{num}H {
    .b-i('@{num}H')
  }
  &__@{num}S {
    .b-i('@{num}S')
  }
}

@chars:A, J, K, Q;

.numscardChars(@i: length(@chars)) when (@i > 0) {
  .numscardChars(@i - 1);
  @char: extract(@chars, @i);
  &__@{char}C {
    .b-i('@{char}C')
  }
  &__@{char}D {
    .b-i('@{char}D')
  }
  &__@{char}H {
    .b-i('@{char}H')
  }
  &__@{char}S {
    .b-i('@{char}S')
  }
}

.card {
  height: 163px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  cursor: pointer;
  flex-basis: 16.66666666666667%;
  margin-bottom: 2px;
  &__0C {
    .b-i('0C')
  }
  &__0D {
    .b-i('0D')
  }
  &__0H {
    .b-i('0H')
  }
  &__0S {
    .b-i('0S')
  }

  .numscard(9);
  .numscardChars();
  &__outside {
    background-image: url('../assets/cards/card-outside.png');
    background-size: 100%;
    border-radius: 5px;
  }
}
</style>