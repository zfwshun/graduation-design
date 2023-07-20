import { login } from '@/api/login'
import { getToken, removeToken, setToken } from '@/utils/tokenAbout'
import { getUserInfo } from '@/api/getUserInfo'
import { register } from '@/api/register'
import { getDynamicCode } from '@/api/getDynamicCode'

const state = {
  token: getToken(),
  userInfo: {},
  dynamicCode: ''
}
const getters = {}
const actions = {
  async getDynamicCode (context, email) {
    console.log(email)
    const res = await getDynamicCode(email)
    console.log(res)
    if (res.code === 0) {
      context.commit('GETDYNAMICCODE', res.data.dynamicCode)
    } else {
      return Promise.reject(res.msg)
    }
  },
  async register (context, info) {
    console.log(info)
    const res = await register(info)
    console.log(res)
    if (res.code !== 0) {
      return Promise.reject(res.msg)
    }
  },
  async login (context, info) {
    console.log(info)
    const res = await login(info)
    console.log(res)
    if (res.code === 0) {
      // 将token存储到localStorage里
      setToken(res.data.token)
      context.commit('LOGIN', res.data.token)
    } else {
      return Promise.reject(res.msg)
    }
  },
  async getUserInfo (context) {
    const res = await getUserInfo()
    console.log(res)
    if (res.code === 0) {
      context.commit('GETUSERINFO', res.data)
    } else {
      return Promise.reject(res.msg)
    }
  },
  async logout (context) {
    context.commit('CLEARUSERINFO')
  }
}
const mutations = {
  LOGIN (state, val) {
    state.token = val
  },
  GETUSERINFO (state, val) {
    state.userInfo = val
  },
  CLEARUSERINFO (state) {
    state.token = ''
    removeToken()
    state.userInfo = {}
    localStorage.removeItem('name')
  },
  GETDYNAMICCODE (state, val) {
    state.dynamicCode = val
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
