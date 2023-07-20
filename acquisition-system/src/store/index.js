import Vue from 'vue'
import Vuex from 'vuex'
import acquisition from './acquisition/index'
import analysis from './analysis/index'
import user from './user/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    acquisition,
    analysis,
    user
  }
})
