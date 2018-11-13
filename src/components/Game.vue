<template lang="pug">
  .container
    .game-header
      button.btn.btn_start-over(v-on:click="onRestartGame" @click="setOutsideCardsForTime()") Начать заново
      span Очки:&nbsp;
      span {{ gamePoints }}
    .game-cards(ref="cards")
      .card(v-for="card in dataCards" v-bind:class="[card, { card_outside: isOutside }]" v-on:click="clickCardHandler($event)")
</template>

<script>
export default {
  props: ['gamePoints', 'dataCards', 'onRestartGame', 'plusPoints', 'minusPoints', 'gameEnd'],
  data () {
    return {
      isOutside: false,
      TIME_OUTSIDE_CARDS: 5000,
      counterOpenCard: 0,
      TIME_JOB_CARD: 2000,
      TIME_JOB_CARD_ZERO: 1000,
      timerOutsideCardsId: null,
      timerSetOutsideCardsId: null,
      MULTIPLIED_NUM: 42,
      UNSOLVED_PAIRS_CARDS: 9,
      OPEN_PAIRS_CARDS: 0
    }
  },
  computed: {
  },
  mounted: function () {
    this.setOutsideCardsForTime()
  },
  methods: {
    setOutsideCards () {
      this.isOutside = true
    },
    clearTimeId (timerID) {
      if (timerID) {
        clearTimeout(timerID)
      }
    },
    setOutsideCardsForTime () {
      this.isOutside = false
      this.clearTimeId(this.timerOutsideCardsId)
      this.timerOutsideCardsId = setTimeout(this.setOutsideCards, this.TIME_OUTSIDE_CARDS)
    },
    setOneClassOpenCards () {
      var elements = this.$refs.cards.querySelectorAll('.card[data-open="true"]')
      elements.forEach((item) => {
        item.className = 'card'
        item.removeAttribute('data-open')
      })
      this.counterOpenCard = 0
      this.UNSOLVED_PAIRS_CARDS = this.UNSOLVED_PAIRS_CARDS - 1
      this.OPEN_PAIRS_CARDS = this.OPEN_PAIRS_CARDS + 1
      this.plusPoints(this.gamePoints + this.UNSOLVED_PAIRS_CARDS * this.MULTIPLIED_NUM)
      if (this.UNSOLVED_PAIRS_CARDS === 0) {
        setTimeout(this.gameEnd, this.TIME_JOB_CARD_ZERO)
      }
    },
    setClassOutside () {
      this.counterOpenCard = 0
      var elements = this.$refs.cards.querySelectorAll('.card[data-open="true"]')
      elements.forEach((item) => {
        item.classList.add('card_outside')
        item.removeAttribute('data-open')
      })
      this.minusPoints(this.gamePoints - this.OPEN_PAIRS_CARDS * this.MULTIPLIED_NUM)
    },
    checkCardsOpen (element) {
      var cards = element.querySelectorAll('.card[data-open="true"]')
      var card1 = cards[0].className.substring(5)
      var card2 = cards[1].className.substring(5)
      if (card1 === card2) {
        setTimeout(this.setOneClassOpenCards, this.TIME_JOB_CARD)
      } else {
        this.clearTimeId(this.timerSetOutsideCardsId)
        this.timerSetOutsideCardsId = setTimeout(this.setClassOutside, this.TIME_JOB_CARD)
      }
    },
    clickCardHandler (event) {
      if (this.isOutside !== true) {
        return false
      }
      if (this.isOutside && event.target.classList.contains('card_outside')) {
        if (this.counterOpenCard < 2) {
          event.target.setAttribute('data-open', 'true')
          event.target.classList.remove('card_outside')
          this.counterOpenCard++
        }
        if (this.counterOpenCard === 2) {
          this.checkCardsOpen(this.$refs.cards)
        }
      } else {
        return false
      }
    }
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
.game-cards {
  justify-content: center;
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
  &_@{num}C {
    .b-i('@{num}C')
  }
  &_@{num}D {
    .b-i('@{num}D')
  }
  &_@{num}H {
    .b-i('@{num}H')
  }
  &_@{num}S {
    .b-i('@{num}S')
  }
}

@chars:A, J, K, Q;

.numscardChars(@i: length(@chars)) when (@i > 0) {
  .numscardChars(@i - 1);
  @char: extract(@chars, @i);
  &_@{char}C {
    .b-i('@{char}C')
  }
  &_@{char}D {
    .b-i('@{char}D')
  }
  &_@{char}H {
    .b-i('@{char}H')
  }
  &_@{char}S {
    .b-i('@{char}S')
  }
}

.card {
  height: 155px;
  width: 112px;
  // width: 16.71428571428571%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  // flex-basis: 16.66666666666667%;
  margin: 2px;
  transition: transform 0.5s linear;
  transform-style: preserve-3d;
  position: relative;
  &::after {
    content: '';
    background-image: url('../assets/cards/card-outside.png');
    background-size: 100%;
    position: absolute;
    background-repeat: no-repeat;
    background-position: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: rotateY(1deg);
    transform-origin: 0 50%;
  }
  &_0C {
    .b-i('0C')
  }
  &_0D {
    .b-i('0D')
  }
  &_0H {
    .b-i('0H')
  }
  &_0S {
    .b-i('0S')
  }

  .numscard(9);
  .numscardChars();
  &_outside {
    border-radius: 5px;
    cursor: pointer;
    transform: rotateY(180deg);
  }
}
</style>
