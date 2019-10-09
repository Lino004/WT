export default {
  state: {
    tableAutre: [],
    loading: false
  },
  getters: {
    getTableAutre: state => {
      const data = state.tableAutre
      let i = 0
      data.forEach(el => {
        el.index = (i + 1)
        i += 1
      })
      return data
    },
    getLoadingTableAutre: state => {
      return state.loading
    }
  },
  mutations: {
    TABLE_AUTRE (state, data) {
      state.tableAutre = data
    },
    LOARDING_AUTRE (state, data) {
      state.loading = data
    }
  },
  actions: {
    updateTableAutre ({ commit }, data) {
      commit('TABLE_AUTRE', data)
    },
    updateLoadingAutre ({ commit }, data) {
      commit('LOARDING_AUTRE', data)
    }
  }
}
