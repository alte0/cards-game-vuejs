(function(){
  'use strict';
  
  var app = new Vue({
    el: '#app',
    data: function () {
      return {
        screenStart: true,
        screenPlay: false,
        points: 0,
        CARDS_ARRAY: ['0', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'A', 'K', 'Q'],
        CARDS_ARRAY_STR: ['C', 'D', 'H', 'S'],
        cards: [],
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
        this.OPEN_PAIRS_CARDS = 0;
        this.UNSOLVED_PAIRS_CARDS = 9;
        this.setOutsideCardsForTime();
      },
      gameStartOver: function () {
        this.isOutside = false;
        this.randomCards();
        this.setPointsZero();
        this.OPEN_PAIRS_CARDS = 0;
        this.UNSOLVED_PAIRS_CARDS = 9;
        this.setOutsideCardsForTime();
      },
      gameEnd: function () {
        this.screenPlay = false;
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
      clearTimeId: function (timerID) {
        if (timerID) {
          clearTimeout(timerID);
        }
      },
      setOutsideCardsForTime: function () {
        this.clearTimeId(this.timerOutsideCardsId);
        this.timerOutsideCardsId = setTimeout(this.setOutsideCards, this.TIME_OUTSIDE_CARDS);
      },
      setOneClassOpenCards: function () {
        var elements = document.querySelectorAll('.card[data-open="true"]');
        [].forEach.call(elements, function (item) {
          item.className = 'card';
          item.removeAttribute('data-open');
        });
        this.counterCheckCard = 0;
        this.UNSOLVED_PAIRS_CARDS = this.UNSOLVED_PAIRS_CARDS - 1;
        this.OPEN_PAIRS_CARDS = this.OPEN_PAIRS_CARDS + 1;
        this.points = this.points + this.UNSOLVED_PAIRS_CARDS * this.MULTIPLIED_NUM;
        if (this.UNSOLVED_PAIRS_CARDS === 0) {
          setTimeout(this.gameEnd, this.TIME_JOB_CARD_ZERO)
        }
      },
      setClassOutside: function () {
        this.counterCheckCard = 0;
        var elements = document.querySelectorAll('.card[data-open="true"]');
        [].forEach.call(elements, function (item) {
          item.classList.toggle('card__outside');
          item.removeAttribute('data-open');
        });
        this.points = this.points - this.OPEN_PAIRS_CARDS * this.MULTIPLIED_NUM;
      },
      checkCardsOpen: function () {
        var cards = document.querySelectorAll('.card[data-open="true"]');
        var card1 = cards[0].className.substring(5);
        var card2 = cards[1].className.substring(5);
        if (card1 === card2) {
          setTimeout(this.setOneClassOpenCards, this.TIME_JOB_CARD);
        } else {
          this.clearTimeId(this.timerSetOutsideCardsId);
          this.timerSetOutsideCardsId = setTimeout(this.setClassOutside, this.TIME_JOB_CARD);
        }
      },
      clickCardHandler: function (evt) {
        if (this.isOutside && evt.target.classList.contains('card__outside')) {
          if (this.counterCheckCard < 2) {
            this.counterCheckCard++;
            evt.target.setAttribute('data-open', 'true');
            evt.target.classList.toggle('card__outside');
          }
          if (this.counterCheckCard === 2) {
            this.checkCardsOpen();
          }
        }
      }
    }
  });

})();