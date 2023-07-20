import { getHistoryArticleListByName } from '@/api/getHistoryArticleListByName'
import { getArticleInfoByURL } from '@/api/getArticleInfoByURL'
import { getCommentInfoByURL } from '@/api/getCommentInfoByURL'
import { getPublicAccountsInfoByURLOrName } from '@/api/getPublicAccountsInfoByURLOrName'
import { searchArticle } from '@/api/searchArticle'

const state = {
  historyArticleList: {},
  articleInfo: [],
  commentInfo: {},
  public_accounts_info: {},
  search_article: {}
}
const getters = {}
const actions = {
  async getHistoryArticleListByName (context, obj) {
    console.log(obj)
    const res = await getHistoryArticleListByName(obj)
    console.log(res)
    context.commit('GETHISTORYARTICLELISTBYNAME', res.data)
    if (res.code !== 0) {
      return Promise.reject(res.msg)
    }
  },
  async getArticleInfoByURL (context, url) {
    console.log(url)
    const res = await getArticleInfoByURL(url)
    console.log(res)
    context.commit('GETARTICLEINFOBYURL', res.data)
    if (res.code !== 0) {
      return Promise.reject(res.msg)
    }
  },
  async getCommentInfoByURL (context, url) {
    console.log(url)
    const res = await getCommentInfoByURL(url)
    console.log(res)
    context.commit('GETCOMMENTINFOBYURL', res)
    if (res.code !== 0) {
      return Promise.reject(res.msg)
    }
  },
  async getPublicAccountsInfoByURLOrName (context, obj) {
    console.log(obj)
    const res = await getPublicAccountsInfoByURLOrName(obj)
    console.log(res)
    context.commit('GETPUBLICACCOUNTSINFOBYURLORNAME', res)
    if (res.code !== 0) {
      return Promise.reject(res.msg)
    }
  },
  async searchArticle (context, obj) {
    console.log(obj)
    const res = await searchArticle(obj)
    console.log(res)
    context.commit('SEARCHARTICLE', res)
    if (res.code !== 0) {
      return Promise.reject(res.msg)
    }
  }
}
const mutations = {
  GETHISTORYARTICLELISTBYNAME (state, val) {
    state.historyArticleList = val
  },
  GETARTICLEINFOBYURL (state, val) {
    state.articleInfo = val
  },
  GETCOMMENTINFOBYURL (state, val) {
    state.commentInfo = val
  },
  GETPUBLICACCOUNTSINFOBYURLORNAME (state, val) {
    state.public_accounts_info = val
  },
  SEARCHARTICLE (state, val) {
    state.search_article = val
  },
  CLEARHISTORYARTICLELIST (state) {
    state.historyArticleList = {}
  },
  CLEARARTICLEINFO (state) {
    state.articleInfo = []
  },
  CLEARCOMMENTINFO (state) {
    state.commentInfo = {}
  },
  CLEARPUBLICACCOUNTSINFO (state) {
    state.public_accounts_info = {}
  },
  CLEARSEARCHARTICLE (state) {
    state.search_article = {}
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
