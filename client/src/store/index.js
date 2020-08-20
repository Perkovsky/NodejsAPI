import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import common from './common'
import user from './user'
import dashboard from './dashboard'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
    dashboard
  },
  plugins: [
    createPersistedState({
      paths: [ 'user' ]
    })
  ]
})
