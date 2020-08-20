export default {
  state: {
    dashboard: { c1: 'N/A', c2: 'N/A', c3: 'N/A', uuid: 'N/A' }
  },
  mutations: {
    setDashboard (state, payload) {
      state.dashboard = payload
    }
  },
  actions: {
    "SOCKET_dashboard.updated"({commit}, server) {
      commit('setDashboard', server.data)
    }
  },
  getters: {
    dashboard: state => state.dashboard
  }
}
