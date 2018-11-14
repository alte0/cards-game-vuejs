import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    points: 0,
    CARDS_ARRAY_VALUE: ['0', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'A', 'K', 'Q'],
    CARDS_ARRAY_SUITS: ['C', 'D', 'H', 'S'],
    cards: []
  },
  mutations: {
    setPoints (state, payload) {
      state.points = payload
    },
    randomCards (state) {
      const randomValueArray = (arr) => {
        return Math.round(Math.random() * (arr.length - 1))
      }
      let cardsTemp = []
      let valueCards = state.CARDS_ARRAY_VALUE.slice()
      let randomValueCardsSuit = state.CARDS_ARRAY_SUITS[randomValueArray(state.CARDS_ARRAY_SUITS)]
      state.cards = []

      for (let i = 0; i < 9; i++) {
        let valueCard = valueCards.splice(randomValueArray(valueCards), 1)[0]
        for (let i = 0; i < 2; i++) {
          cardsTemp.push(valueCard + randomValueCardsSuit)
        }
      }

      for (let i = 0; i < 18; i++) {
        state.cards.push(cardsTemp.splice(randomValueArray(cardsTemp), 1)[0])
      }
    }
  },
  actions: {
  },
  getters: {
    getPoints (state) {
      return state.points
    },
    getCards (state) {
      return state.cards
    }
  }
})
