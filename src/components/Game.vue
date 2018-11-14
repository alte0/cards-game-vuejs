<template lang="pug">
  .container
    .game-header
      button.btn.btn_start-over(
                                v-on:click="onRestartGame"
                                @click="setOutsideCardsForTime()"
                                ) Начать заново
      span Очки:&nbsp;
      span {{ points }}
    .game-cards(ref="wrapcards")
      .card(
        v-for="card in dataCards"
        :class="[card, { card_outside: isOutside }]"
        ref="cards"
        v-on:click="clickCardHandler($event)"
        )
        .card__face(:class="'card__face_' + card")
        .card__face.card__face_back
</template>

<script>
export default {
  props: ['onRestartGame', 'gameEnd'],
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
    dataCards () {
      return this.$store.getters.getCards
    },
    points () {
      return this.$store.getters.getPoints
    }
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
      this.UNSOLVED_PAIRS_CARDS = 9
      this.OPEN_PAIRS_CARDS = 0
      this.$store.commit('setPoints', 0)
      this.$refs.cards.forEach((item) => {
        item.removeAttribute('data-open')
      })
      this.isOutside = false
      this.clearTimeId(this.timerOutsideCardsId)
      this.timerOutsideCardsId = setTimeout(this.setOutsideCards, this.TIME_OUTSIDE_CARDS)
    },
    setOneClassOpenCards () {
      this.$refs.cards.forEach((item) => {
        if (item.getAttribute('data-open')) {
          item.className = 'card card_ok'
          item.removeAttribute('data-open')
        }
      })
      this.counterOpenCard = 0
      this.UNSOLVED_PAIRS_CARDS = this.UNSOLVED_PAIRS_CARDS - 1
      this.OPEN_PAIRS_CARDS = this.OPEN_PAIRS_CARDS + 1
      this.$store.commit('setPoints', this.points + this.UNSOLVED_PAIRS_CARDS * this.MULTIPLIED_NUM)
      if (this.UNSOLVED_PAIRS_CARDS === 0) {
        setTimeout(this.gameEnd, this.TIME_JOB_CARD_ZERO)
      }
    },
    setClassOutside () {
      this.counterOpenCard = 0
      this.$refs.cards.forEach((item) => {
        if (item.getAttribute('data-open')) {
          item.classList.add('card_outside')
          item.removeAttribute('data-open')
        }
      })
      this.$store.commit('setPoints', this.points - this.OPEN_PAIRS_CARDS * this.MULTIPLIED_NUM)
    },
    checkCardsOpen () {
      let cards = []
      this.$refs.cards.forEach(item => {
        return item.getAttribute('data-open') ? cards.push(item.className) : ''
      })
      if (cards[0] === cards[1]) {
        setTimeout(this.setOneClassOpenCards, this.TIME_JOB_CARD_ZERO)
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
          this.checkCardsOpen()
        }
      }
      return false
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
  perspective: 700px;
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
  margin: 2px;
  transition: transform 0.5s linear;
  transform-style: preserve-3d;
  position: relative;
  &_ok {
    transform: scale(0.8);
  }
  &__face {
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    backface-visibility: hidden;
    border-radius: 5px;
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
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
    &_back {
      background-image: url('../assets/cards/card-outside.png');
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
      transform: rotateY(180deg);
    }
  }
  &_outside {
    cursor: pointer;
    transform: rotateY(180deg);
  }
}
</style>
