var app = new Vue ({
  el: '#app',
  data: function () {
    return {
      screenStart: true,
      screenPlay: false,
      points: 0,
      CARDS_ARRAY: ['0', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'A', 'K', 'Q'],
      CARDS_ARRAY_STR:['C', 'D', 'H', 'S'],
      cards: []
    }
  },
  computed: {
  },
  methods: {
    gamePlay: function () {
      this.screenStart = false;
      this.screenPlay = true;
      this.randomCards();
    },
    gamePlayAgain: function () {
      this.screenStart = false;
      this.screenPlay = true;
      this.setPointsZero();
    },
    gameStartOver: function () {
      this.randomCards();
      this.setPointsZero();
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

      return this.cards;
    }
  }
});
// (function(){

//   var BLOCK_GAME_START = document.querySelector('.game__start');
//   var BLOCK_GAME_PLAY = document.querySelector('.game__play');
//   var BLOCK_GAME_END = document.querySelector('.game__end');
//   var BTN_PLAY = document.querySelector('#play');
//   var BTN_PLAY_AGAIN = document.querySelector('#play-again');
//   var BTN_PLAY_START_OVER = document.querySelector('#play-start-over');
//   var CARDS_ARRAY = ['0','2','3','4','5','6','7','8','9','J','A','K','Q'];
//   var CARDS_ARRAY_STR = ['C', 'D', 'H', 'S'];
//   var CARDS_CONTAINER = document.querySelector('.game__play-cards');
//   var TIME_ROTATE_CARD = 5000;
//   var TIME_FOR_JOB_CARD = 2000;
//   var TIME_FOR_SET_POINTS_CARD = 2500;
//   var counterMatchedCard = 0;
//   var counterCheckCard = 0;
//   var points = 0;
//   var cardLeft;
//   var SCORE = document.querySelector('#score');
//   var MULTIPLIED_NUM = 42;
//   var ALL_CARDS_NUM = 18;
//   var FINAL_SCORE = document.querySelector('#final-score');

//   var invertOpeningCard = function () {
//     var cards = document.querySelectorAll('.card');

//     [].forEach.call(cards, function (item) {
//       if (!item.classList.contains('card__outside')) {
//         item.classList.toggle('card__outside');
//       }
//     });
//     counterCheckCard = 0;
//     CARDS_CONTAINER.addEventListener('click', clickCardHandler);
//   }

//   var deleteOpenCards = function () {
//     var element = document.querySelector('.card[data-open="true"]');
//     while (element !== null) {
//       var parentEl = element.parentElement;
//       parentEl.removeChild(element);
//       element = document.querySelector('.card[data-open="true"]');
//     }
//   };

//   var setPoints = function () {
//     SCORE.textContent = points;
//     FINAL_SCORE.textContent = points;
//   };

//   var checkOpenCard = function () {
//     var cards = document.querySelectorAll('.card[data-open="true"]');
//     var card1 = cards[0].className.substring(5);
//     var card2 = cards[1].className.substring(5);
//     var CardRemaining = clickCardRemainingHandler;
//     if (card1 === card2) {
//       setTimeout(deleteOpenCards, TIME_FOR_JOB_CARD);
//       counterCheckCard = 0;
//       CARDS_CONTAINER.addEventListener('click', clickCardHandler);
//       counterMatchedCard += 2;
//       setTimeout(function(){
//         CardRemaining();
//         points = points + cardLeft * MULTIPLIED_NUM;
//         setPoints();
//       }, TIME_FOR_SET_POINTS_CARD);
//     } else {
//       setTimeout(invertOpeningCard, TIME_FOR_JOB_CARD);
//       [].forEach.call(cards, function(item){
//         item.setAttribute('data-open', 'false');
//       });
//       CardRemaining();
//       points = points - (ALL_CARDS_NUM - cardLeft) * MULTIPLIED_NUM;
//       setPoints();
//     }
//   };

//   var clickCardHandler = function (evt) {
//     var target = evt.target;

//     while (target !== CARDS_CONTAINER) {
//       if (target.classList.contains("card")) {
//         target.classList.toggle('card__outside');
//         target.setAttribute('data-open', 'true');
//         counterCheckCard++;
//         if (counterCheckCard === 2) {
//           CARDS_CONTAINER.removeEventListener('click', clickCardHandler);
//           checkOpenCard();
//         }
//       }
//       target = target.parentNode;
//     }
//   };

//   var clickCardRemainingHandler = function () {
//     cardLeft = CARDS_CONTAINER.childNodes.length;
    
//     if (cardLeft === 0) {
//       BLOCK_GAME_PLAY.classList.toggle('game__play_d-none');
//       BLOCK_GAME_END.classList.toggle('game__end_d-none');
//     }
//   };
  
//   var clickPlayHandler = function () {
//     BLOCK_GAME_START.classList.toggle('game__start_d-none');
//     BLOCK_GAME_PLAY.classList.toggle('game__play_d-none');
//     renderCards();
//     cardsRotate();
//     BTN_PLAY_START_OVER.addEventListener('click', clickPlayStartOverHandler);
//   };
  
//   var clickPlayAgainHandler = function () {
//     BLOCK_GAME_PLAY.classList.toggle('game__play_d-none');
//     BLOCK_GAME_END.classList.toggle('game__end_d-none');
//     renderCards();
//     cardsRotate();
//   };

//   var clickPlayStartOverHandler = function () {
//     while (CARDS_CONTAINER.lastElementChild) {
//       CARDS_CONTAINER.removeChild(CARDS_CONTAINER.lastElementChild);
//     }
//     renderCards();
//     cardsRotate();
//     points = 0;
//     SCORE.textContent = points;
//   };

//   var randomValueArray = function (array) {
//     return Math.round(Math.random() * (array.length - 1));
//   };

//   var randonCards = function (array, array2) {
//     var cardsResult = [];
//     var cardsResultTemp = [];
//     var cardsTemp = [];
//     var randomValueCardsSuit = array2[randomValueArray(array2)];
//     arrayCards = array.slice();

//     for (var i = 0; i < 9; i++) {
//       cardsTemp.push(arrayCards.splice(randomValueArray(arrayCards),1)[0]);
//     }

//     cardsTemp.forEach(function(item){
//       for (var i = 0; i < 2; i++) {
//         cardsResultTemp.push(item + randomValueCardsSuit);
//       }
//     });

//     for (var i = 0; i < 18; i++) {
//       cardsResult.push(cardsResultTemp.splice(randomValueArray(cardsResultTemp), 1)[0]);
//     }
    
//     return cardsResult;
//   };

//   var renderCards = function () {
//     var fragment = document.createDocumentFragment();
//     var cardsResult = randonCards(CARDS_ARRAY, CARDS_ARRAY_STR);
//     cardsResult.forEach(function(item){
//       var element = document.createElement('div');
//       element.classList.add('card');
//       element.classList.add('card__' + item);
//       fragment.appendChild(element);
//     });
//     CARDS_CONTAINER.appendChild(fragment);
//   };

//   var cardsRotate = function () {
//     var cards = document.querySelectorAll('.card');
//     setTimeout(function() {
//       [].forEach.call(cards, function(item){
//         item.classList.toggle('card__outside');
//       });
//       CARDS_CONTAINER.addEventListener('click', clickCardHandler);
//     }, TIME_ROTATE_CARD);
//   };

//   BTN_PLAY.addEventListener('click', clickPlayHandler);
//   BTN_PLAY_AGAIN.addEventListener('click', clickPlayAgainHandler);


// })();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC12dWVqcy5qcyIsInNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID0gbmV3IFZ1ZSAoe1xyXG4gIGVsOiAnI2FwcCcsXHJcbiAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2NyZWVuU3RhcnQ6IHRydWUsXHJcbiAgICAgIHNjcmVlblBsYXk6IGZhbHNlLFxyXG4gICAgICBwb2ludHM6IDAsXHJcbiAgICAgIENBUkRTX0FSUkFZOiBbJzAnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JywgJ0onLCAnQScsICdLJywgJ1EnXSxcclxuICAgICAgQ0FSRFNfQVJSQVlfU1RSOlsnQycsICdEJywgJ0gnLCAnUyddLFxyXG4gICAgICBjYXJkczogW11cclxuICAgIH1cclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBnYW1lUGxheTogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLnNjcmVlblN0YXJ0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2NyZWVuUGxheSA9IHRydWU7XHJcbiAgICAgIHRoaXMucmFuZG9tQ2FyZHMoKTtcclxuICAgIH0sXHJcbiAgICBnYW1lUGxheUFnYWluOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMuc2NyZWVuU3RhcnQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zY3JlZW5QbGF5ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zZXRQb2ludHNaZXJvKCk7XHJcbiAgICB9LFxyXG4gICAgZ2FtZVN0YXJ0T3ZlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLnJhbmRvbUNhcmRzKCk7XHJcbiAgICAgIHRoaXMuc2V0UG9pbnRzWmVybygpO1xyXG4gICAgfSxcclxuICAgIHNldFBvaW50c1plcm86IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5wb2ludHMgPSAwO1xyXG4gICAgfSxcclxuICAgIHJhbmRvbVZhbHVlQXJyYXk6IGZ1bmN0aW9uIChhcnJheSkge1xyXG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKGFycmF5Lmxlbmd0aCAtIDEpKTtcclxuICAgIH0sXHJcbiAgICByYW5kb21DYXJkczogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgY2FyZHNSZXN1bHRUZW1wID0gW107XHJcbiAgICAgIHZhciBjYXJkc1RlbXAgPSBbXTtcclxuICAgICAgdmFyIGFycmF5Q2FyZHMgPSB0aGlzLkNBUkRTX0FSUkFZLnNsaWNlKCk7XHJcbiAgICAgIHZhciByYW5kb21WYWx1ZUNhcmRzU3VpdCA9IHRoaXMuQ0FSRFNfQVJSQVlfU1RSW3RoaXMucmFuZG9tVmFsdWVBcnJheSh0aGlzLkNBUkRTX0FSUkFZX1NUUildO1xyXG4gICAgICB0aGlzLmNhcmRzLnNwbGljZSgwKTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgOTsgaSsrKSB7XHJcbiAgICAgICAgY2FyZHNUZW1wLnB1c2goYXJyYXlDYXJkcy5zcGxpY2UodGhpcy5yYW5kb21WYWx1ZUFycmF5KGFycmF5Q2FyZHMpLCAxKVswXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhcmRzVGVtcC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICAgIGNhcmRzUmVzdWx0VGVtcC5wdXNoKCdjYXJkX18nICsgaXRlbSArIHJhbmRvbVZhbHVlQ2FyZHNTdWl0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxODsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5jYXJkcy5wdXNoKGNhcmRzUmVzdWx0VGVtcC5zcGxpY2UodGhpcy5yYW5kb21WYWx1ZUFycmF5KGNhcmRzUmVzdWx0VGVtcCksIDEpWzBdKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuY2FyZHM7XHJcbiAgICB9XHJcbiAgfVxyXG59KTsiLCIvLyAoZnVuY3Rpb24oKXtcclxuXHJcbi8vICAgdmFyIEJMT0NLX0dBTUVfU1RBUlQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZV9fc3RhcnQnKTtcclxuLy8gICB2YXIgQkxPQ0tfR0FNRV9QTEFZID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVfX3BsYXknKTtcclxuLy8gICB2YXIgQkxPQ0tfR0FNRV9FTkQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZV9fZW5kJyk7XHJcbi8vICAgdmFyIEJUTl9QTEFZID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXknKTtcclxuLy8gICB2YXIgQlROX1BMQVlfQUdBSU4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheS1hZ2FpbicpO1xyXG4vLyAgIHZhciBCVE5fUExBWV9TVEFSVF9PVkVSID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXktc3RhcnQtb3ZlcicpO1xyXG4vLyAgIHZhciBDQVJEU19BUlJBWSA9IFsnMCcsJzInLCczJywnNCcsJzUnLCc2JywnNycsJzgnLCc5JywnSicsJ0EnLCdLJywnUSddO1xyXG4vLyAgIHZhciBDQVJEU19BUlJBWV9TVFIgPSBbJ0MnLCAnRCcsICdIJywgJ1MnXTtcclxuLy8gICB2YXIgQ0FSRFNfQ09OVEFJTkVSID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVfX3BsYXktY2FyZHMnKTtcclxuLy8gICB2YXIgVElNRV9ST1RBVEVfQ0FSRCA9IDUwMDA7XHJcbi8vICAgdmFyIFRJTUVfRk9SX0pPQl9DQVJEID0gMjAwMDtcclxuLy8gICB2YXIgVElNRV9GT1JfU0VUX1BPSU5UU19DQVJEID0gMjUwMDtcclxuLy8gICB2YXIgY291bnRlck1hdGNoZWRDYXJkID0gMDtcclxuLy8gICB2YXIgY291bnRlckNoZWNrQ2FyZCA9IDA7XHJcbi8vICAgdmFyIHBvaW50cyA9IDA7XHJcbi8vICAgdmFyIGNhcmRMZWZ0O1xyXG4vLyAgIHZhciBTQ09SRSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY29yZScpO1xyXG4vLyAgIHZhciBNVUxUSVBMSUVEX05VTSA9IDQyO1xyXG4vLyAgIHZhciBBTExfQ0FSRFNfTlVNID0gMTg7XHJcbi8vICAgdmFyIEZJTkFMX1NDT1JFID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbmFsLXNjb3JlJyk7XHJcblxyXG4vLyAgIHZhciBpbnZlcnRPcGVuaW5nQ2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIHZhciBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJkJyk7XHJcblxyXG4vLyAgICAgW10uZm9yRWFjaC5jYWxsKGNhcmRzLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4vLyAgICAgICBpZiAoIWl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJkX19vdXRzaWRlJykpIHtcclxuLy8gICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ2NhcmRfX291dHNpZGUnKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSk7XHJcbi8vICAgICBjb3VudGVyQ2hlY2tDYXJkID0gMDtcclxuLy8gICAgIENBUkRTX0NPTlRBSU5FUi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrQ2FyZEhhbmRsZXIpO1xyXG4vLyAgIH1cclxuXHJcbi8vICAgdmFyIGRlbGV0ZU9wZW5DYXJkcyA9IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRbZGF0YS1vcGVuPVwidHJ1ZVwiXScpO1xyXG4vLyAgICAgd2hpbGUgKGVsZW1lbnQgIT09IG51bGwpIHtcclxuLy8gICAgICAgdmFyIHBhcmVudEVsID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4vLyAgICAgICBwYXJlbnRFbC5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuLy8gICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkW2RhdGEtb3Blbj1cInRydWVcIl0nKTtcclxuLy8gICAgIH1cclxuLy8gICB9O1xyXG5cclxuLy8gICB2YXIgc2V0UG9pbnRzID0gZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgU0NPUkUudGV4dENvbnRlbnQgPSBwb2ludHM7XHJcbi8vICAgICBGSU5BTF9TQ09SRS50ZXh0Q29udGVudCA9IHBvaW50cztcclxuLy8gICB9O1xyXG5cclxuLy8gICB2YXIgY2hlY2tPcGVuQ2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIHZhciBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJkW2RhdGEtb3Blbj1cInRydWVcIl0nKTtcclxuLy8gICAgIHZhciBjYXJkMSA9IGNhcmRzWzBdLmNsYXNzTmFtZS5zdWJzdHJpbmcoNSk7XHJcbi8vICAgICB2YXIgY2FyZDIgPSBjYXJkc1sxXS5jbGFzc05hbWUuc3Vic3RyaW5nKDUpO1xyXG4vLyAgICAgdmFyIENhcmRSZW1haW5pbmcgPSBjbGlja0NhcmRSZW1haW5pbmdIYW5kbGVyO1xyXG4vLyAgICAgaWYgKGNhcmQxID09PSBjYXJkMikge1xyXG4vLyAgICAgICBzZXRUaW1lb3V0KGRlbGV0ZU9wZW5DYXJkcywgVElNRV9GT1JfSk9CX0NBUkQpO1xyXG4vLyAgICAgICBjb3VudGVyQ2hlY2tDYXJkID0gMDtcclxuLy8gICAgICAgQ0FSRFNfQ09OVEFJTkVSLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tDYXJkSGFuZGxlcik7XHJcbi8vICAgICAgIGNvdW50ZXJNYXRjaGVkQ2FyZCArPSAyO1xyXG4vLyAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbi8vICAgICAgICAgQ2FyZFJlbWFpbmluZygpO1xyXG4vLyAgICAgICAgIHBvaW50cyA9IHBvaW50cyArIGNhcmRMZWZ0ICogTVVMVElQTElFRF9OVU07XHJcbi8vICAgICAgICAgc2V0UG9pbnRzKCk7XHJcbi8vICAgICAgIH0sIFRJTUVfRk9SX1NFVF9QT0lOVFNfQ0FSRCk7XHJcbi8vICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICBzZXRUaW1lb3V0KGludmVydE9wZW5pbmdDYXJkLCBUSU1FX0ZPUl9KT0JfQ0FSRCk7XHJcbi8vICAgICAgIFtdLmZvckVhY2guY2FsbChjYXJkcywgZnVuY3Rpb24oaXRlbSl7XHJcbi8vICAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3BlbicsICdmYWxzZScpO1xyXG4vLyAgICAgICB9KTtcclxuLy8gICAgICAgQ2FyZFJlbWFpbmluZygpO1xyXG4vLyAgICAgICBwb2ludHMgPSBwb2ludHMgLSAoQUxMX0NBUkRTX05VTSAtIGNhcmRMZWZ0KSAqIE1VTFRJUExJRURfTlVNO1xyXG4vLyAgICAgICBzZXRQb2ludHMoKTtcclxuLy8gICAgIH1cclxuLy8gICB9O1xyXG5cclxuLy8gICB2YXIgY2xpY2tDYXJkSGFuZGxlciA9IGZ1bmN0aW9uIChldnQpIHtcclxuLy8gICAgIHZhciB0YXJnZXQgPSBldnQudGFyZ2V0O1xyXG5cclxuLy8gICAgIHdoaWxlICh0YXJnZXQgIT09IENBUkRTX0NPTlRBSU5FUikge1xyXG4vLyAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNhcmRcIikpIHtcclxuLy8gICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnY2FyZF9fb3V0c2lkZScpO1xyXG4vLyAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3BlbicsICd0cnVlJyk7XHJcbi8vICAgICAgICAgY291bnRlckNoZWNrQ2FyZCsrO1xyXG4vLyAgICAgICAgIGlmIChjb3VudGVyQ2hlY2tDYXJkID09PSAyKSB7XHJcbi8vICAgICAgICAgICBDQVJEU19DT05UQUlORVIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0NhcmRIYW5kbGVyKTtcclxuLy8gICAgICAgICAgIGNoZWNrT3BlbkNhcmQoKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgIH1cclxuLy8gICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcbi8vICAgICB9XHJcbi8vICAgfTtcclxuXHJcbi8vICAgdmFyIGNsaWNrQ2FyZFJlbWFpbmluZ0hhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICBjYXJkTGVmdCA9IENBUkRTX0NPTlRBSU5FUi5jaGlsZE5vZGVzLmxlbmd0aDtcclxuICAgIFxyXG4vLyAgICAgaWYgKGNhcmRMZWZ0ID09PSAwKSB7XHJcbi8vICAgICAgIEJMT0NLX0dBTUVfUExBWS5jbGFzc0xpc3QudG9nZ2xlKCdnYW1lX19wbGF5X2Qtbm9uZScpO1xyXG4vLyAgICAgICBCTE9DS19HQU1FX0VORC5jbGFzc0xpc3QudG9nZ2xlKCdnYW1lX19lbmRfZC1ub25lJyk7XHJcbi8vICAgICB9XHJcbi8vICAgfTtcclxuICBcclxuLy8gICB2YXIgY2xpY2tQbGF5SGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIEJMT0NLX0dBTUVfU1RBUlQuY2xhc3NMaXN0LnRvZ2dsZSgnZ2FtZV9fc3RhcnRfZC1ub25lJyk7XHJcbi8vICAgICBCTE9DS19HQU1FX1BMQVkuY2xhc3NMaXN0LnRvZ2dsZSgnZ2FtZV9fcGxheV9kLW5vbmUnKTtcclxuLy8gICAgIHJlbmRlckNhcmRzKCk7XHJcbi8vICAgICBjYXJkc1JvdGF0ZSgpO1xyXG4vLyAgICAgQlROX1BMQVlfU1RBUlRfT1ZFUi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrUGxheVN0YXJ0T3ZlckhhbmRsZXIpO1xyXG4vLyAgIH07XHJcbiAgXHJcbi8vICAgdmFyIGNsaWNrUGxheUFnYWluSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIEJMT0NLX0dBTUVfUExBWS5jbGFzc0xpc3QudG9nZ2xlKCdnYW1lX19wbGF5X2Qtbm9uZScpO1xyXG4vLyAgICAgQkxPQ0tfR0FNRV9FTkQuY2xhc3NMaXN0LnRvZ2dsZSgnZ2FtZV9fZW5kX2Qtbm9uZScpO1xyXG4vLyAgICAgcmVuZGVyQ2FyZHMoKTtcclxuLy8gICAgIGNhcmRzUm90YXRlKCk7XHJcbi8vICAgfTtcclxuXHJcbi8vICAgdmFyIGNsaWNrUGxheVN0YXJ0T3ZlckhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICB3aGlsZSAoQ0FSRFNfQ09OVEFJTkVSLmxhc3RFbGVtZW50Q2hpbGQpIHtcclxuLy8gICAgICAgQ0FSRFNfQ09OVEFJTkVSLnJlbW92ZUNoaWxkKENBUkRTX0NPTlRBSU5FUi5sYXN0RWxlbWVudENoaWxkKTtcclxuLy8gICAgIH1cclxuLy8gICAgIHJlbmRlckNhcmRzKCk7XHJcbi8vICAgICBjYXJkc1JvdGF0ZSgpO1xyXG4vLyAgICAgcG9pbnRzID0gMDtcclxuLy8gICAgIFNDT1JFLnRleHRDb250ZW50ID0gcG9pbnRzO1xyXG4vLyAgIH07XHJcblxyXG4vLyAgIHZhciByYW5kb21WYWx1ZUFycmF5ID0gZnVuY3Rpb24gKGFycmF5KSB7XHJcbi8vICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKGFycmF5Lmxlbmd0aCAtIDEpKTtcclxuLy8gICB9O1xyXG5cclxuLy8gICB2YXIgcmFuZG9uQ2FyZHMgPSBmdW5jdGlvbiAoYXJyYXksIGFycmF5Mikge1xyXG4vLyAgICAgdmFyIGNhcmRzUmVzdWx0ID0gW107XHJcbi8vICAgICB2YXIgY2FyZHNSZXN1bHRUZW1wID0gW107XHJcbi8vICAgICB2YXIgY2FyZHNUZW1wID0gW107XHJcbi8vICAgICB2YXIgcmFuZG9tVmFsdWVDYXJkc1N1aXQgPSBhcnJheTJbcmFuZG9tVmFsdWVBcnJheShhcnJheTIpXTtcclxuLy8gICAgIGFycmF5Q2FyZHMgPSBhcnJheS5zbGljZSgpO1xyXG5cclxuLy8gICAgIGZvciAodmFyIGkgPSAwOyBpIDwgOTsgaSsrKSB7XHJcbi8vICAgICAgIGNhcmRzVGVtcC5wdXNoKGFycmF5Q2FyZHMuc3BsaWNlKHJhbmRvbVZhbHVlQXJyYXkoYXJyYXlDYXJkcyksMSlbMF0pO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGNhcmRzVGVtcC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4vLyAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI7IGkrKykge1xyXG4vLyAgICAgICAgIGNhcmRzUmVzdWx0VGVtcC5wdXNoKGl0ZW0gKyByYW5kb21WYWx1ZUNhcmRzU3VpdCk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTg7IGkrKykge1xyXG4vLyAgICAgICBjYXJkc1Jlc3VsdC5wdXNoKGNhcmRzUmVzdWx0VGVtcC5zcGxpY2UocmFuZG9tVmFsdWVBcnJheShjYXJkc1Jlc3VsdFRlbXApLCAxKVswXSk7XHJcbi8vICAgICB9XHJcbiAgICBcclxuLy8gICAgIHJldHVybiBjYXJkc1Jlc3VsdDtcclxuLy8gICB9O1xyXG5cclxuLy8gICB2YXIgcmVuZGVyQ2FyZHMgPSBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbi8vICAgICB2YXIgY2FyZHNSZXN1bHQgPSByYW5kb25DYXJkcyhDQVJEU19BUlJBWSwgQ0FSRFNfQVJSQVlfU1RSKTtcclxuLy8gICAgIGNhcmRzUmVzdWx0LmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbi8vICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbi8vICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY2FyZCcpO1xyXG4vLyAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NhcmRfXycgKyBpdGVtKTtcclxuLy8gICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbi8vICAgICB9KTtcclxuLy8gICAgIENBUkRTX0NPTlRBSU5FUi5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbi8vICAgfTtcclxuXHJcbi8vICAgdmFyIGNhcmRzUm90YXRlID0gZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgdmFyIGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQnKTtcclxuLy8gICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbi8vICAgICAgIFtdLmZvckVhY2guY2FsbChjYXJkcywgZnVuY3Rpb24oaXRlbSl7XHJcbi8vICAgICAgICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdjYXJkX19vdXRzaWRlJyk7XHJcbi8vICAgICAgIH0pO1xyXG4vLyAgICAgICBDQVJEU19DT05UQUlORVIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0NhcmRIYW5kbGVyKTtcclxuLy8gICAgIH0sIFRJTUVfUk9UQVRFX0NBUkQpO1xyXG4vLyAgIH07XHJcblxyXG4vLyAgIEJUTl9QTEFZLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tQbGF5SGFuZGxlcik7XHJcbi8vICAgQlROX1BMQVlfQUdBSU4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1BsYXlBZ2FpbkhhbmRsZXIpO1xyXG5cclxuXHJcbi8vIH0pKCk7XHJcbiJdfQ==
