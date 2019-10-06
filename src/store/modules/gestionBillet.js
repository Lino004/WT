export default {
  state: {
    tableBillet: []
  },
  getters: {
    getTableBillet: state => {
      return state.tableBillet
    },
    getTableTrajet: state => {
      return state.tableBillet.map(el => el.trajet)
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
