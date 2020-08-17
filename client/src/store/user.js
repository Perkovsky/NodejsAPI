import axios from 'axios'
import jwt from 'jsonwebtoken'

class User {
  constructor (id, email, name) {
    this.id = id
    this.email = email
    this.name = name
  }
}

//TODO: autologout when token expired

export default {
  state: {
    user: null,
    token: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
    async login ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const url = process.env.VUE_APP_API_BASE_URL + '/login'
        const response = await axios.post(url, {email, password})
        const payload = jwt.decode(response.data.token)
        commit('setToken', response.data.token)
        commit('setUser', new User(payload.id, payload.email, payload.name))
        commit('setLoading', false)
      } catch (error) {
        commit('setToken', null)
        commit('setUser', null)
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    logout ({commit}) {
      commit('setToken', null)
      commit('setUser', null)
    }
  },
  getters: {
    user: state => state.user,
    token: state => state.token
  }
}
