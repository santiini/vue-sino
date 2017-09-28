/**
 * 插件形式来Vue的组件通讯eventBus
 */
/* eslint-disable no-param-reassign */
// tips: 以一个空的Vue实例来进行事件的监听和触发，集中事件的管理
export default {
  install(Vue, options) {
    const bus = new Vue({});
    // all Vux's plugins are included in this.$vux
    // tips: 单例模式，唯一实例 Vue.$sino包含了所有的plugins，并通过mixins 绑定到组件实例
    if (!Vue.$sino) {
      Vue.$sino = {
        bus,
      }
    } else {
      Vue.$sino.bus = bus;
    }

    // 注册mixins,指向this.$sino到 Vue.$sino
    // tips: 好像每个插件都需要，待测试？？
    Vue.mixin({
      created() {
        // 会绑定最新的Vue.$sino到this.$sino
        // tips: this.$sino没有显示声明，所以不可见，但可以正常使用;
        // this.$sino = Vue.$sino
        // 测试 -- 指向一次，引用类型的改变 ？？
        if (!this.$sino) {
          this.$sino = Vue.$sino
        }
      },
    })
  },
}
