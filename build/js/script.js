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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC12dWVqcy5qcyIsInNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IG5ldyBWdWUgKHtcclxuICBlbDogJyNhcHAnLFxyXG4gIGRhdGE6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNjcmVlblN0YXJ0OiB0cnVlLFxyXG4gICAgICBzY3JlZW5QbGF5OiBmYWxzZSxcclxuICAgICAgcG9pbnRzOiAwLFxyXG4gICAgICBDQVJEU19BUlJBWTogWycwJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOScsICdKJywgJ0EnLCAnSycsICdRJ10sXHJcbiAgICAgIENBUkRTX0FSUkFZX1NUUjpbJ0MnLCAnRCcsICdIJywgJ1MnXSxcclxuICAgICAgY2FyZHM6IFtdLFxyXG4gICAgICBpc091dHNpZGU6IGZhbHNlLFxyXG4gICAgICB0aW1lT3V0c2lkZUNhcmRzOiA1MDAwXHJcbiAgICB9XHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgZ2FtZVBsYXk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5zY3JlZW5TdGFydCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnNjcmVlblBsYXkgPSB0cnVlO1xyXG4gICAgICB0aGlzLnJhbmRvbUNhcmRzKCk7XHJcbiAgICAgIHRoaXMuc2V0T3V0c2lkZUNhcmRzRm9yVGltZSgpO1xyXG4gICAgfSxcclxuICAgIGdhbWVQbGF5QWdhaW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5zY3JlZW5TdGFydCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnNjcmVlblBsYXkgPSB0cnVlO1xyXG4gICAgICB0aGlzLmlzT3V0c2lkZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnNldFBvaW50c1plcm8oKTtcclxuICAgICAgdGhpcy5zZXRPdXRzaWRlQ2FyZHNGb3JUaW1lKCk7XHJcbiAgICB9LFxyXG4gICAgZ2FtZVN0YXJ0T3ZlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLmlzT3V0c2lkZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnJhbmRvbUNhcmRzKCk7XHJcbiAgICAgIHRoaXMuc2V0UG9pbnRzWmVybygpO1xyXG4gICAgICB0aGlzLnNldE91dHNpZGVDYXJkc0ZvclRpbWUoKTtcclxuICAgIH0sXHJcbiAgICBzZXRQb2ludHNaZXJvOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMucG9pbnRzID0gMDtcclxuICAgIH0sXHJcbiAgICByYW5kb21WYWx1ZUFycmF5OiBmdW5jdGlvbiAoYXJyYXkpIHtcclxuICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChhcnJheS5sZW5ndGggLSAxKSk7XHJcbiAgICB9LFxyXG4gICAgcmFuZG9tQ2FyZHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGNhcmRzUmVzdWx0VGVtcCA9IFtdO1xyXG4gICAgICB2YXIgY2FyZHNUZW1wID0gW107XHJcbiAgICAgIHZhciBhcnJheUNhcmRzID0gdGhpcy5DQVJEU19BUlJBWS5zbGljZSgpO1xyXG4gICAgICB2YXIgcmFuZG9tVmFsdWVDYXJkc1N1aXQgPSB0aGlzLkNBUkRTX0FSUkFZX1NUUlt0aGlzLnJhbmRvbVZhbHVlQXJyYXkodGhpcy5DQVJEU19BUlJBWV9TVFIpXTtcclxuICAgICAgdGhpcy5jYXJkcy5zcGxpY2UoMCk7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDk7IGkrKykge1xyXG4gICAgICAgIGNhcmRzVGVtcC5wdXNoKGFycmF5Q2FyZHMuc3BsaWNlKHRoaXMucmFuZG9tVmFsdWVBcnJheShhcnJheUNhcmRzKSwgMSlbMF0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjYXJkc1RlbXAuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjsgaSsrKSB7XHJcbiAgICAgICAgICBjYXJkc1Jlc3VsdFRlbXAucHVzaCgnY2FyZF9fJyArIGl0ZW0gKyByYW5kb21WYWx1ZUNhcmRzU3VpdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChjYXJkc1Jlc3VsdFRlbXAuc3BsaWNlKHRoaXMucmFuZG9tVmFsdWVBcnJheShjYXJkc1Jlc3VsdFRlbXApLCAxKVswXSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXRPdXRzaWRlQ2FyZHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5pc091dHNpZGUgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIHNldE91dHNpZGVDYXJkc0ZvclRpbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgc2V0VGltZW91dCh0aGlzLnNldE91dHNpZGVDYXJkcywgdGhpcy50aW1lT3V0c2lkZUNhcmRzKTtcclxuICAgIH1cclxuICB9XHJcbn0pOyIsIi8vIChmdW5jdGlvbigpe1xyXG5cclxuLy8gICB2YXIgQkxPQ0tfR0FNRV9TVEFSVCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lX19zdGFydCcpO1xyXG4vLyAgIHZhciBCTE9DS19HQU1FX1BMQVkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZV9fcGxheScpO1xyXG4vLyAgIHZhciBCTE9DS19HQU1FX0VORCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lX19lbmQnKTtcclxuLy8gICB2YXIgQlROX1BMQVkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheScpO1xyXG4vLyAgIHZhciBCVE5fUExBWV9BR0FJTiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5LWFnYWluJyk7XHJcbi8vICAgdmFyIEJUTl9QTEFZX1NUQVJUX09WRVIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheS1zdGFydC1vdmVyJyk7XHJcbi8vICAgdmFyIENBUkRTX0FSUkFZID0gWycwJywnMicsJzMnLCc0JywnNScsJzYnLCc3JywnOCcsJzknLCdKJywnQScsJ0snLCdRJ107XHJcbi8vICAgdmFyIENBUkRTX0FSUkFZX1NUUiA9IFsnQycsICdEJywgJ0gnLCAnUyddO1xyXG4vLyAgIHZhciBDQVJEU19DT05UQUlORVIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZV9fcGxheS1jYXJkcycpO1xyXG4vLyAgIHZhciBUSU1FX1JPVEFURV9DQVJEID0gNTAwMDtcclxuLy8gICB2YXIgVElNRV9GT1JfSk9CX0NBUkQgPSAyMDAwO1xyXG4vLyAgIHZhciBUSU1FX0ZPUl9TRVRfUE9JTlRTX0NBUkQgPSAyNTAwO1xyXG4vLyAgIHZhciBjb3VudGVyTWF0Y2hlZENhcmQgPSAwO1xyXG4vLyAgIHZhciBjb3VudGVyQ2hlY2tDYXJkID0gMDtcclxuLy8gICB2YXIgcG9pbnRzID0gMDtcclxuLy8gICB2YXIgY2FyZExlZnQ7XHJcbi8vICAgdmFyIFNDT1JFID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Njb3JlJyk7XHJcbi8vICAgdmFyIE1VTFRJUExJRURfTlVNID0gNDI7XHJcbi8vICAgdmFyIEFMTF9DQVJEU19OVU0gPSAxODtcclxuLy8gICB2YXIgRklOQUxfU0NPUkUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmluYWwtc2NvcmUnKTtcclxuXHJcbi8vICAgdmFyIGludmVydE9wZW5pbmdDYXJkID0gZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgdmFyIGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQnKTtcclxuXHJcbi8vICAgICBbXS5mb3JFYWNoLmNhbGwoY2FyZHMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbi8vICAgICAgIGlmICghaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcmRfX291dHNpZGUnKSkge1xyXG4vLyAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnY2FyZF9fb3V0c2lkZScpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICB9KTtcclxuLy8gICAgIGNvdW50ZXJDaGVja0NhcmQgPSAwO1xyXG4vLyAgICAgQ0FSRFNfQ09OVEFJTkVSLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tDYXJkSGFuZGxlcik7XHJcbi8vICAgfVxyXG5cclxuLy8gICB2YXIgZGVsZXRlT3BlbkNhcmRzID0gZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZFtkYXRhLW9wZW49XCJ0cnVlXCJdJyk7XHJcbi8vICAgICB3aGlsZSAoZWxlbWVudCAhPT0gbnVsbCkge1xyXG4vLyAgICAgICB2YXIgcGFyZW50RWwgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbi8vICAgICAgIHBhcmVudEVsLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4vLyAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRbZGF0YS1vcGVuPVwidHJ1ZVwiXScpO1xyXG4vLyAgICAgfVxyXG4vLyAgIH07XHJcblxyXG4vLyAgIHZhciBzZXRQb2ludHMgPSBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICBTQ09SRS50ZXh0Q29udGVudCA9IHBvaW50cztcclxuLy8gICAgIEZJTkFMX1NDT1JFLnRleHRDb250ZW50ID0gcG9pbnRzO1xyXG4vLyAgIH07XHJcblxyXG4vLyAgIHZhciBjaGVja09wZW5DYXJkID0gZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgdmFyIGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmRbZGF0YS1vcGVuPVwidHJ1ZVwiXScpO1xyXG4vLyAgICAgdmFyIGNhcmQxID0gY2FyZHNbMF0uY2xhc3NOYW1lLnN1YnN0cmluZyg1KTtcclxuLy8gICAgIHZhciBjYXJkMiA9IGNhcmRzWzFdLmNsYXNzTmFtZS5zdWJzdHJpbmcoNSk7XHJcbi8vICAgICB2YXIgQ2FyZFJlbWFpbmluZyA9IGNsaWNrQ2FyZFJlbWFpbmluZ0hhbmRsZXI7XHJcbi8vICAgICBpZiAoY2FyZDEgPT09IGNhcmQyKSB7XHJcbi8vICAgICAgIHNldFRpbWVvdXQoZGVsZXRlT3BlbkNhcmRzLCBUSU1FX0ZPUl9KT0JfQ0FSRCk7XHJcbi8vICAgICAgIGNvdW50ZXJDaGVja0NhcmQgPSAwO1xyXG4vLyAgICAgICBDQVJEU19DT05UQUlORVIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0NhcmRIYW5kbGVyKTtcclxuLy8gICAgICAgY291bnRlck1hdGNoZWRDYXJkICs9IDI7XHJcbi8vICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuLy8gICAgICAgICBDYXJkUmVtYWluaW5nKCk7XHJcbi8vICAgICAgICAgcG9pbnRzID0gcG9pbnRzICsgY2FyZExlZnQgKiBNVUxUSVBMSUVEX05VTTtcclxuLy8gICAgICAgICBzZXRQb2ludHMoKTtcclxuLy8gICAgICAgfSwgVElNRV9GT1JfU0VUX1BPSU5UU19DQVJEKTtcclxuLy8gICAgIH0gZWxzZSB7XHJcbi8vICAgICAgIHNldFRpbWVvdXQoaW52ZXJ0T3BlbmluZ0NhcmQsIFRJTUVfRk9SX0pPQl9DQVJEKTtcclxuLy8gICAgICAgW10uZm9yRWFjaC5jYWxsKGNhcmRzLCBmdW5jdGlvbihpdGVtKXtcclxuLy8gICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1vcGVuJywgJ2ZhbHNlJyk7XHJcbi8vICAgICAgIH0pO1xyXG4vLyAgICAgICBDYXJkUmVtYWluaW5nKCk7XHJcbi8vICAgICAgIHBvaW50cyA9IHBvaW50cyAtIChBTExfQ0FSRFNfTlVNIC0gY2FyZExlZnQpICogTVVMVElQTElFRF9OVU07XHJcbi8vICAgICAgIHNldFBvaW50cygpO1xyXG4vLyAgICAgfVxyXG4vLyAgIH07XHJcblxyXG4vLyAgIHZhciBjbGlja0NhcmRIYW5kbGVyID0gZnVuY3Rpb24gKGV2dCkge1xyXG4vLyAgICAgdmFyIHRhcmdldCA9IGV2dC50YXJnZXQ7XHJcblxyXG4vLyAgICAgd2hpbGUgKHRhcmdldCAhPT0gQ0FSRFNfQ09OVEFJTkVSKSB7XHJcbi8vICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2FyZFwiKSkge1xyXG4vLyAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdjYXJkX19vdXRzaWRlJyk7XHJcbi8vICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1vcGVuJywgJ3RydWUnKTtcclxuLy8gICAgICAgICBjb3VudGVyQ2hlY2tDYXJkKys7XHJcbi8vICAgICAgICAgaWYgKGNvdW50ZXJDaGVja0NhcmQgPT09IDIpIHtcclxuLy8gICAgICAgICAgIENBUkRTX0NPTlRBSU5FUi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrQ2FyZEhhbmRsZXIpO1xyXG4vLyAgICAgICAgICAgY2hlY2tPcGVuQ2FyZCgpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgfVxyXG4vLyAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuLy8gICAgIH1cclxuLy8gICB9O1xyXG5cclxuLy8gICB2YXIgY2xpY2tDYXJkUmVtYWluaW5nSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIGNhcmRMZWZ0ID0gQ0FSRFNfQ09OVEFJTkVSLmNoaWxkTm9kZXMubGVuZ3RoO1xyXG4gICAgXHJcbi8vICAgICBpZiAoY2FyZExlZnQgPT09IDApIHtcclxuLy8gICAgICAgQkxPQ0tfR0FNRV9QTEFZLmNsYXNzTGlzdC50b2dnbGUoJ2dhbWVfX3BsYXlfZC1ub25lJyk7XHJcbi8vICAgICAgIEJMT0NLX0dBTUVfRU5ELmNsYXNzTGlzdC50b2dnbGUoJ2dhbWVfX2VuZF9kLW5vbmUnKTtcclxuLy8gICAgIH1cclxuLy8gICB9O1xyXG4gIFxyXG4vLyAgIHZhciBjbGlja1BsYXlIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgQkxPQ0tfR0FNRV9TVEFSVC5jbGFzc0xpc3QudG9nZ2xlKCdnYW1lX19zdGFydF9kLW5vbmUnKTtcclxuLy8gICAgIEJMT0NLX0dBTUVfUExBWS5jbGFzc0xpc3QudG9nZ2xlKCdnYW1lX19wbGF5X2Qtbm9uZScpO1xyXG4vLyAgICAgcmVuZGVyQ2FyZHMoKTtcclxuLy8gICAgIGNhcmRzUm90YXRlKCk7XHJcbi8vICAgICBCVE5fUExBWV9TVEFSVF9PVkVSLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tQbGF5U3RhcnRPdmVySGFuZGxlcik7XHJcbi8vICAgfTtcclxuICBcclxuLy8gICB2YXIgY2xpY2tQbGF5QWdhaW5IYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgQkxPQ0tfR0FNRV9QTEFZLmNsYXNzTGlzdC50b2dnbGUoJ2dhbWVfX3BsYXlfZC1ub25lJyk7XHJcbi8vICAgICBCTE9DS19HQU1FX0VORC5jbGFzc0xpc3QudG9nZ2xlKCdnYW1lX19lbmRfZC1ub25lJyk7XHJcbi8vICAgICByZW5kZXJDYXJkcygpO1xyXG4vLyAgICAgY2FyZHNSb3RhdGUoKTtcclxuLy8gICB9O1xyXG5cclxuLy8gICB2YXIgY2xpY2tQbGF5U3RhcnRPdmVySGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIHdoaWxlIChDQVJEU19DT05UQUlORVIubGFzdEVsZW1lbnRDaGlsZCkge1xyXG4vLyAgICAgICBDQVJEU19DT05UQUlORVIucmVtb3ZlQ2hpbGQoQ0FSRFNfQ09OVEFJTkVSLmxhc3RFbGVtZW50Q2hpbGQpO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgcmVuZGVyQ2FyZHMoKTtcclxuLy8gICAgIGNhcmRzUm90YXRlKCk7XHJcbi8vICAgICBwb2ludHMgPSAwO1xyXG4vLyAgICAgU0NPUkUudGV4dENvbnRlbnQgPSBwb2ludHM7XHJcbi8vICAgfTtcclxuXHJcbi8vICAgdmFyIHJhbmRvbVZhbHVlQXJyYXkgPSBmdW5jdGlvbiAoYXJyYXkpIHtcclxuLy8gICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAoYXJyYXkubGVuZ3RoIC0gMSkpO1xyXG4vLyAgIH07XHJcblxyXG4vLyAgIHZhciByYW5kb25DYXJkcyA9IGZ1bmN0aW9uIChhcnJheSwgYXJyYXkyKSB7XHJcbi8vICAgICB2YXIgY2FyZHNSZXN1bHQgPSBbXTtcclxuLy8gICAgIHZhciBjYXJkc1Jlc3VsdFRlbXAgPSBbXTtcclxuLy8gICAgIHZhciBjYXJkc1RlbXAgPSBbXTtcclxuLy8gICAgIHZhciByYW5kb21WYWx1ZUNhcmRzU3VpdCA9IGFycmF5MltyYW5kb21WYWx1ZUFycmF5KGFycmF5MildO1xyXG4vLyAgICAgYXJyYXlDYXJkcyA9IGFycmF5LnNsaWNlKCk7XHJcblxyXG4vLyAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA5OyBpKyspIHtcclxuLy8gICAgICAgY2FyZHNUZW1wLnB1c2goYXJyYXlDYXJkcy5zcGxpY2UocmFuZG9tVmFsdWVBcnJheShhcnJheUNhcmRzKSwxKVswXSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgY2FyZHNUZW1wLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbi8vICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjsgaSsrKSB7XHJcbi8vICAgICAgICAgY2FyZHNSZXN1bHRUZW1wLnB1c2goaXRlbSArIHJhbmRvbVZhbHVlQ2FyZHNTdWl0KTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSk7XHJcblxyXG4vLyAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxODsgaSsrKSB7XHJcbi8vICAgICAgIGNhcmRzUmVzdWx0LnB1c2goY2FyZHNSZXN1bHRUZW1wLnNwbGljZShyYW5kb21WYWx1ZUFycmF5KGNhcmRzUmVzdWx0VGVtcCksIDEpWzBdKTtcclxuLy8gICAgIH1cclxuICAgIFxyXG4vLyAgICAgcmV0dXJuIGNhcmRzUmVzdWx0O1xyXG4vLyAgIH07XHJcblxyXG4vLyAgIHZhciByZW5kZXJDYXJkcyA9IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuLy8gICAgIHZhciBjYXJkc1Jlc3VsdCA9IHJhbmRvbkNhcmRzKENBUkRTX0FSUkFZLCBDQVJEU19BUlJBWV9TVFIpO1xyXG4vLyAgICAgY2FyZHNSZXN1bHQuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcclxuLy8gICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuLy8gICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjYXJkJyk7XHJcbi8vICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY2FyZF9fJyArIGl0ZW0pO1xyXG4vLyAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuLy8gICAgIH0pO1xyXG4vLyAgICAgQ0FSRFNfQ09OVEFJTkVSLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuLy8gICB9O1xyXG5cclxuLy8gICB2YXIgY2FyZHNSb3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICB2YXIgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FyZCcpO1xyXG4vLyAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuLy8gICAgICAgW10uZm9yRWFjaC5jYWxsKGNhcmRzLCBmdW5jdGlvbihpdGVtKXtcclxuLy8gICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ2NhcmRfX291dHNpZGUnKTtcclxuLy8gICAgICAgfSk7XHJcbi8vICAgICAgIENBUkRTX0NPTlRBSU5FUi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrQ2FyZEhhbmRsZXIpO1xyXG4vLyAgICAgfSwgVElNRV9ST1RBVEVfQ0FSRCk7XHJcbi8vICAgfTtcclxuXHJcbi8vICAgQlROX1BMQVkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1BsYXlIYW5kbGVyKTtcclxuLy8gICBCVE5fUExBWV9BR0FJTi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrUGxheUFnYWluSGFuZGxlcik7XHJcblxyXG5cclxuLy8gfSkoKTtcclxuIl19
