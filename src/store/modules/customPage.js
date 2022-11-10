const state = {
  list: []
}

const mutations = {
  SET_CUSTOMIZEPAGES_COMPONETS: (state, componets) => {
    state.list = componets;
  },
}

const actions = {
  setCustomizepagesComponets({ commit }, value) {
    commit('SET_CUSTOMIZEPAGES_COMPONETS', value)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
