import { getArticleAnalysis } from '@/api/getArticleAnalysis'
import { getHistoryArticlesAnalysis } from '@/api/getHistoryArticlesAnalysis'

const state = {
  articleAnalysis: {},
  historyArticlesAnalysis: {}
}
const getters = {}
const actions = {
  async getArticleAnalysis (context, url) {
    console.log(url)
    const res = await getArticleAnalysis(url)
    console.log(res)
    context.commit('GETARTICLEANALISIS', res.data)
    if (res.code !== 0) {
      return Promise.reject(res.msg)
    }
  },
  async getHistoryArticlesAnalysis (context, name) {
    console.log(name)
    const res = await getHistoryArticlesAnalysis(name)
    console.log(res)
    context.commit('GETHISTORYARTICLESANALISIS', res.data)
    if (res.code !== 0) {
      return Promise.reject(res.msg)
    }
  }
}
const mutations = {
  GETARTICLEANALISIS (state, val) {
    state.articleAnalysis = val
  },
  GETHISTORYARTICLESANALISIS (state, val) {
    state.historyArticlesAnalysis = val
  },
  CLEARARTICLEANALISIS (state) {
    state.articleAnalysis = {}
  },
  CLEARHISTORYARTICLESANALISIS (state) {
    state.historyArticlesAnalysis = {}
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
