<template lang="pug">
  .container
    .game-header
      //- button.btn.btn_start-over(v-on:click="gameStartOver") Начать заново
      button.btn.btn_start-over Начать заново
      span Очки:&nbsp;
      span {{ gamePoints }}
    .game-cards
      //- .card(v-for="card in dataCards" v-bind:class="[card, { card__outside: isOutside }]" v-on:click="clickCardHandler")
      .card(v-for="card in dataCards")
</template>

<script>
export default {
  props: ['gamePoints', 'dataCards'],
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
    // gameEnd: function () {
    //   this.screenPlay = false;
    // },
    // setPointsZero: function () {
    //   this.points = 0;
    // },
    // randomValueArray: function (array) {
    //   return Math.round(Math.random() * (array.length - 1))
    // },
    // randomCards: function () {
    //   var cardsResultTemp = []
    //   var cardsTemp = []
    //   var arrayCards = this.CARDS_ARRAY.slice()
    //   var randomValueCardsSuit = this.CARDS_ARRAY_STR[this.randomValueArray(this.CARDS_ARRAY_STR)]
    //   this.cards.splice(0)

    //   for (var i = 0; i < 9; i++) {
    //     cardsTemp.push(arrayCards.splice(this.randomValueArray(arrayCards), 1)[0])
    //   }

    //   cardsTemp.forEach(function (item) {
    //     for (var i = 0; i < 2; i++) {
    //       cardsResultTemp.push('card__' + item + randomValueCardsSuit)
    //     }
    //   })

    //   for (let i = 0; i < 18; i++) {
    //     this.cards.push(cardsResultTemp.splice(this.randomValueArray(cardsResultTemp), 1)[0])
    //   }
    // }
    // ,
    // setOutsideCards: function () {
    //   this.isOutside = true;
    // },
    // clearTimeId: function (timerID) {
    //   if (timerID) {
    //     clearTimeout(timerID);
    //   }
    // },
    // setOutsideCardsForTime: function () {
    //   this.clearTimeId(this.timerOutsideCardsId);
    //   this.timerOutsideCardsId = setTimeout(this.setOutsideCards, this.TIME_OUTSIDE_CARDS);
    // },
    // setOneClassOpenCards: function () {
    //   var elements = document.querySelectorAll('.card[data-open="true"]');
    //   [].forEach.call(elements, function (item) {
    //     item.className = 'card';
    //     item.removeAttribute('data-open');
    //   });
    //   this.counterCheckCard = 0;
    //   this.UNSOLVED_PAIRS_CARDS = this.UNSOLVED_PAIRS_CARDS - 1;
    //   this.OPEN_PAIRS_CARDS = this.OPEN_PAIRS_CARDS + 1;
    //   this.points = this.points + this.UNSOLVED_PAIRS_CARDS * this.MULTIPLIED_NUM;
    //   if (this.UNSOLVED_PAIRS_CARDS === 0) {
    //     setTimeout(this.gameEnd, this.TIME_JOB_CARD_ZERO)
    //   }
    // },
    // setClassOutside: function () {
    //   this.counterCheckCard = 0;
    //   var elements = document.querySelectorAll('.card[data-open="true"]');
    //   [].forEach.call(elements, function (item) {
    //     item.classList.toggle('card__outside');
    //     item.removeAttribute('data-open');
    //   });
    //   this.points = this.points - this.OPEN_PAIRS_CARDS * this.MULTIPLIED_NUM;
    // },
    // checkCardsOpen: function () {
    //   var cards = document.querySelectorAll('.card[data-open="true"]');
    //   var card1 = cards[0].className.substring(5);
    //   var card2 = cards[1].className.substring(5);
    //   if (card1 === card2) {
    //     setTimeout(this.setOneClassOpenCards, this.TIME_JOB_CARD);
    //   } else {
    //     this.clearTimeId(this.timerSetOutsideCardsId);
    //     this.timerSetOutsideCardsId = setTimeout(this.setClassOutside, this.TIME_JOB_CARD);
    //   }
    // },
    // clickCardHandler: function (evt) {
    //   if (this.isOutside && evt.target.classList.contains('card__outside')) {
    //     if (this.counterCheckCard < 2) {
    //       this.counterCheckCard++;
    //       evt.target.setAttribute('data-open', 'true');
    //       evt.target.classList.toggle('card__outside');
    //     }
    //     if (this.counterCheckCard === 2) {
    //       this.checkCardsOpen();
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

// b-i($str)
//   background-image: url('../img/Cards/' + $str + '.png')
// numscard()
//   for $num in (2..9)
//     &__{$num}C
//       b-i('' + $num + 'C')
//     &__{$num}D
//       b-i('' + $num + 'D')
//     &__{$num}H
//       b-i('' + $num + 'H')
//     &__{$num}S
//       b-i('' + $num + 'S')
// numscardSt()
//   for $str in 'A' 'J' 'K' 'Q'
//     &__{$str}C
//       b-i('' + $str + 'C')
//     &__{$str}D
//       b-i('' + $str + 'D')
//     &__{$str}H
//       b-i('' + $str + 'H')
//     &__{$str}S
//       b-i('' + $str + 'S')

.card {
  height: 163px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  flex-basis: 16.66666666666667%;
  margin-bottom: 2px;
  // &__0C
  //   b-i('0C')
  // &__0D
  //   b-i('0D')
  // &__0H
  //   b-i('0H')
  // &__0S
  //   b-i('0S')

  // numscard()
  // numscardSt()
  // &__outside
  //   background-image: url('../img/Cards/card-outside.png')
  //   background-size: 100%
  //   border-radius: 5px
}
</style>
