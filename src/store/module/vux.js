/**
 * vux的store
 */
const vuxStore = {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward',
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    updateDemoPosition(state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection(state, payload) {
      state.direction = payload.direction
    },
    UPDATE_LOADING(state, status) {
      state.isLoading = status
    },
    UPDATE_DIRECTION(state, direction) {
      state.direction = direction
    },
  },
  actions: {
    updateDemoPosition({ commit }, top) {
      commit({ type: 'updateDemoPosition', top })
    },
  },
};

export default vuxStore;
