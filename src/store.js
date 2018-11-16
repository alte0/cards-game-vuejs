import Vue from 'vue'
import Vuex from 'vuex'
import { returnRandomValueArray } from './helpers'

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
      state.cards = []
      let cardsTemp = []

      let copyValueCards = state.CARDS_ARRAY_VALUE.slice()
      const randomSuitCard = state.CARDS_ARRAY_SUITS[returnRandomValueArray(state.CARDS_ARRAY_SUITS)]

      for (let i = 0; i < 9; i++) {
        let valueCard = copyValueCards.splice(returnRandomValueArray(copyValueCards), 1)[0]
        for (let i = 0; i < 2; i++) {
          cardsTemp.push(valueCard + randomSuitCard)
        }
      }

      for (let i = 0; i < 18; i++) {
        state.cards.push(cardsTemp.splice(returnRandomValueArray(cardsTemp), 1)[0])
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
