// createElement: scopedSlots
// tips: 作用域插槽 slot-scope 的使用:
// 在父级中，具有特殊属性 scope 的 <template> 元素必须存在，表示它是作用域插槽的模板。
// scope 的值对应一个临时变量名，此变量接收从子组件中传递的 props 对象：

// 引用组件
import { Group, Cell } from 'vux';


export default {
  name: 'app-vue-create-element-demo5',
  props: {
    name: String,
    total: Number,
  },
  components: {
    Group, Cell,
  },
  render(h) {
    // $scopedSlots 的使用

    // // 1. 利用 this.$slots
    // // `<div><slot></slot></div>`
    // return h(
    //   Group,
    //   {
    //     props: {
    //       title: '1. 使用 this.$slots',
    //     },
    //   },
    //   this.$slots.default,
    // )

    // 2. 利用 this.$scopedSlots 作用域插槽
    // tips: 使用 this.$scopedSlots， 必须保证 slot 使用的地方，使用了 slot-scope, 否则会报错;
    // console.log(this)
    // console.log(this.$scopedSlots)
    return h(
      Group,
      {
        props: {
          title: '2. 使用 this.$scopedSlots',
        },
      },
      [
        this.$scopedSlots.default(),
        this.$scopedSlots.title({
          msg: this.$props.name,
        }),
      ],
    )

    // 简单使用
    // return h('div', [
    //   this.$scopedSlots.default(),
    //   this.$scopedSlots.title({
    //     msg: 'slot的msg',
    //     // text: this.msg,
    //   }),
    // ])
  },
}
