/**
 * mutations
 */
/* eslint-disable no-param-reassign */
export default {
  SET_KEEPLIST(state, payload) {
    state.keepAlList = payload.data;
  },
}
