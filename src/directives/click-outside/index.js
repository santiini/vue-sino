/* eslint-disable */
// 1. 元素指令： 当点击元素自身以外的dom元素时，触发事件
// 1. 事件绑定和事件解绑;
export default {
  bind: function (el, { value }) {
    let onClickOutside = value
    el.handler = function (e) {
      if (el && !el.contains(e.target)) {
        onClickOutside(e)
      }
    }
    document.addEventListener('click', el.handler, true)
  },
  unbind: function (el) {
    document.removeEventListener('click', el.handler, true)
    el.handler = null
  }
}
