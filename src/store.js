import Vue from 'vue'
import Vuex from 'vuex'
import { returnRandomValueArray } from './helpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    STATE_GAME: {
      POINTS: 0,
      CARDS_ARRAY_VALUE: ['0', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'A', 'K', 'Q'],
      CARDS_ARRAY_SUITS: ['C', 'D', 'H', 'S'],
      CARDS: []
    }
  },
  mutations: {
    setPoints (state, payload) {
      state.STATE_GAME.POINTS = payload
    },
    randomCards (state) {
      state.STATE_GAME.CARDS = []
      let cardsTemp = []

      let copyValueCards = state.STATE_GAME.CARDS_ARRAY_VALUE.slice()
      const randomSuitCard = state.STATE_GAME.CARDS_ARRAY_SUITS[returnRandomValueArray(state.STATE_GAME.CARDS_ARRAY_SUITS)]

      for (let i = 0; i < 9; i++) {
        let valueCard = copyValueCards.splice(returnRandomValueArray(copyValueCards), 1)[0]
        for (let i = 0; i < 2; i++) {
          cardsTemp.push(valueCard + randomSuitCard)
        }
      }

      for (let i = 0; i < 18; i++) {
        state.STATE_GAME.CARDS.push(cardsTemp.splice(returnRandomValueArray(cardsTemp), 1)[0])
      }
    }
  },
  actions: {
  },
  getters: {
    getPoints (state) {
      return state.STATE_GAME.POINTS
    },
    getCards (state) {
      return state.STATE_GAME.CARDS
    }
  }
})
