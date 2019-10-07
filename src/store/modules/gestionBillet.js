export default {
  state: {
    tableBillet: []
  },
  getters: {
    getTableBillet: state => {
      return state.tableBillet
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
    }
  },
  mutations: {
    TABLE_BILLET (state, data) {
      state.tableBillet = data
    }
  },
  actions: {
    updateTableBillet ({ commit }, data) {
      commit('TABLE_BILLET', data)
    }
  }
}
