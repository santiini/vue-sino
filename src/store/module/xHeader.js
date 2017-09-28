/**
 * X-Header的设置;
 */
/* eslint-disable no-param-reassign,no-shadow */
const header = {
  // state;
  state: {
    title: '企业活动',
    rightOption: {
      showMore: false,
    },
    leftOption: {
      showBack: true,
    },
    clickEvent: {},
    isShown: true,
    // isShown: false
  },

  // mutations:
  mutations: {
    SET_HEADER: (state, { title, rightOption, leftOption, clickFunc, isShown }) => {
      state.title = title || '企业活动'
      state.rightOption = rightOption || {
        showMore: false,
      }
      state.leftOption = leftOption || {
        showBack: true,
      }
      // state.clickFunc = clickFunc
      state.isShown = isShown || true
    },
  },

  // actions:
  actions: {
    setHeader({ commit }, header) {
      commit('SET_HEADER', header)
    },
  },
};

export default header;
