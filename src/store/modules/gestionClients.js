export default {
  state: {
    tableClient: [],
    loading: false
  },
  getters: {
    getTableClient: state => {
      const data = state.tableClient
      let i = 0
      data.forEach(el => {
        el.index = (i + 1)
        i += 1
      })
      return data
    },
    getLoadingTableClient: state => {
      return state.loading
    },
    getTableNationalite: state => {
      const table = []
      state.tableClient.forEach(el => {
        const find = table.includes(el.nationalite)
        if (!find) {
          table.push(el.nationalite)
        }
      })
      return table
    }
  },
  mutations: {
    TABLE_CLIENT (state, data) {
      state.tableClient = data
    },
    LOARDING_CLIENT (state, data) {
      state.loading = data
    }
  },
  actions: {
    updateTableClient ({ commit }, data) {
      commit('TABLE_CLIENT', data)
    },
    updateLoadingClient ({ commit }, data) {
      commit('LOARDING_CLIENT', data)
    }
  }
}
