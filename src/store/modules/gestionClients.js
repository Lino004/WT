export default {
  state: {
    tableClient: []
  },
  getters: {
    getTableClient: state => {
      return state.tableClient
    }
  },
  mutations: {
    TABLE_CLIENT (state, data) {
      state.tableClient = data
    }
  },
  actions: {
    updateTableClient ({ commit }, data) {
      commit('TABLE_CLIENT', data)
    }
  }
}
