var app = new Vue ({
  el: '#app',
  data: function () {
    return {
      screenStart: true,
      screenPlay: false,
      points: 0,
      CARDS_ARRAY: ['0', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'A', 'K', 'Q'],
      CARDS_ARRAY_STR:['C', 'D', 'H', 'S'],
      cards: [],
      isOutside: false,
      timeOutsideCards: 5000
    }
  },
  computed: {
  },
  methods: {
    gamePlay: function () {
      this.screenStart = false;
      this.screenPlay = true;
      this.randomCards();
      this.setOutsideCardsForTime();
    },
    gamePlayAgain: function () {
      this.screenStart = false;
      this.screenPlay = true;
      this.isOutside = false;
      this.setPointsZero();
      this.setOutsideCardsForTime();
    },
    gameStartOver: function () {
      this.isOutside = false;
      this.randomCards();
      this.setPointsZero();
      this.setOutsideCardsForTime();
    },
    setPointsZero: function () {
      this.points = 0;
    },
    randomValueArray: function (array) {
      return Math.round(Math.random() * (array.length - 1));
    },
    randomCards: function () {
      var cardsResultTemp = [];
      var cardsTemp = [];
      var arrayCards = this.CARDS_ARRAY.slice();
      var randomValueCardsSuit = this.CARDS_ARRAY_STR[this.randomValueArray(this.CARDS_ARRAY_STR)];
      this.cards.splice(0);

      for (var i = 0; i < 9; i++) {
        cardsTemp.push(arrayCards.splice(this.randomValueArray(arrayCards), 1)[0]);
      }

      cardsTemp.forEach(function (item) {
        for (var i = 0; i < 2; i++) {
          cardsResultTemp.push('card__' + item + randomValueCardsSuit);
        }
      });

      for (var i = 0; i < 18; i++) {
        this.cards.push(cardsResultTemp.splice(this.randomValueArray(cardsResultTemp), 1)[0]);
      }
    },
    setOutsideCards: function () {
      this.isOutside = true;
    },
    setOutsideCardsForTime: function () {
      setTimeout(this.setOutsideCards, this.timeOutsideCards);
    }
  }
});