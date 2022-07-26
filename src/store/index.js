import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 地区id，默认北京
    cityname: JSON.parse(localStorage.getItem('cityName')) || {
      label: '北京',
      value: 'AREA|88cff55c-aaa4-e2e0'
    },
    // 小区
    street: {
      community: '',
      communityName: ''
    },
    // 房屋的code
    housecode: JSON.parse(localStorage.getItem('housecode')) || ''
    // 是否收藏
    // isTrue: ''
  },
  getters: {},
  mutations: {
    // 城市名字
    setCityName(state, payload) {
      state.cityname = payload
      localStorage.setItem('cityName', JSON.stringify(payload))
    },
    // 小区名字
    setstreetName(state, payload) {
      state.street.community = payload.community
      state.street.communityName = payload.communityName
    },
    // 房屋code
    setHouseCode(state, payload) {
      state.housecode = payload
      localStorage.setItem('housecode', JSON.stringify(payload))
    }
    // 是否收藏
    // setIsTrue(state, payload) {
    //   state.isTrue = payload
    // }
  },
  actions: {},
  modules: {}
})
