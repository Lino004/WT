export default {
  state: {
    tableBillet: []
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
