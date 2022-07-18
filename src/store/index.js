import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityname: JSON.parse(localStorage.getItem('cityName')) || {
      label: '北京',
      value: 'AREA|88cff55c-aaa4-e2e0'
    }
  },
  getters: {},
  mutations: {
    setCityName(state, payload) {
      state.cityname = payload
      localStorage.setItem('cityName', JSON.stringify(payload))
    }
  },
  actions: {},
  modules: {}
})
