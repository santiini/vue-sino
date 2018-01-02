// createElement: scopedSlots
// tips: 作用域插槽 slot-scope 的使用:
// 在父级中，具有特殊属性 scope 的 <template> 元素必须存在，表示它是作用域插槽的模板。
// scope 的值对应一个临时变量名，此变量接收从子组件中传递的 props 对象：

// 引用组件
import { Group, Cell } from 'vux';


export default {
  name: 'app-vue-create-element-demo51',
  props: {
    name: String,
    total: Number,
  },
  components: {
    Group, Cell,
  },
  render(h) {
    //  利用 this.$scopedSlots 作用域插槽
    // tips: 使用 this.$scopedSlots 作为函数， 必须保证 slot 使用的地方，使用了 slot-scope, 否则会报错;
    // tips: 如何使用默认的slot ??

    console.log(this.$scopedSlots)
    const defaultSlot = this.$scopedSlots.default
      ? this.$scopedSlots.default()
      : h(Cell, {
        props: {
          title: '默认的slot',
          value: '默认slot-value',
          'inline-desc': '默认的slot-inlinde-desc',
        },
      });
    // 判断 this.$scopedSlots.title 函数是否存在，并使用
    const titleSlot = this.$scopedSlots.title
      ? this.$scopedSlots.title({ msg: this.$props.name, info: 'slot参数' })
      // : null  // 如果不需要渲染内容， 则返回 null 即可;
      : h(Cell, {
        props: {
          title: 'title的默认slot',
          value: 'title-slot的默认valuevalue',
          'inline-desc': 'title-slot的默认desc',
        },
      });
    return h(
      Group,
      {
        props: {
          title: '使用 this.$scopedSlots',
        },
      },
      [
        defaultSlot, titleSlot,
        // this.$scopedSlots.default(),
        // this.$scopedSlots.title({
        //   msg: this.$props.name,
        // }),
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
