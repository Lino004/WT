export default {
  state: {
    tableBillet: [],
    loading: false
  },
  getters: {
    getTableBillet: state => {
      const data = state.tableBillet
      let i = 0
      data.forEach(el => {
        el.index = (i + 1)
        i += 1
      })
      return data
    },
    getTableTrajet: state => {
      const table = []
      state.tableBillet.forEach(el => {
        const find = table.includes(el.trajet)
        if (!find) {
          table.push(el.trajet)
        }
      })
      return table
    },
    getLoadingTableBillet: state => {
      return state.loading
    }
  },
  mutations: {
    TABLE_BILLET (state, data) {
      state.tableBillet = data
    },
    LOARDING_BILLET (state, data) {
      state.loading = data
    }
  },
  actions: {
    updateTableBillet ({ commit }, data) {
      commit('TABLE_BILLET', data)
    },
    updateLoadingBillet ({ commit }, data) {
      commit('LOARDING_BILLET', data)
    }
  }
}
