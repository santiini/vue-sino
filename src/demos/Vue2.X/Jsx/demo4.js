// jsx: slot 渲染

import { Group, Cell, XButton } from 'vux';

export default {
  name: 'app-vue-jsx-demo4',
  components: {
    Group, Cell, XButton,
  },
  methods: {
    clickHandler() {
      console.log('Group的点击事件');
    },
    clickBtnHandler() {
      console.log('XButton的点击事件');
      // 阻止冒泡事件
      event.stopPropagation();
      // 阻止默认事件
      // event.preventDefault();
      // vue .self 的实现
      // if (event.target !== event.currentTarget) return
    },
  },
  render(h) {
    // slot 的使用
    // console.log(this)
    const header = this.$slots.header;
    // const defaultSlot = (<Cell title="主体部分"></Cell>);
    return (
      <div>
        { header}
        <Cell title="主体部分"></Cell>
        { this.$slots.footer }
        {
          // tips: this.$scopedSlots 指向作用域插槽，用 this.$scopedSlots.default() 函数来渲染父组件的slot;
          this.$scopedSlots.title && this.$scopedSlots.title({
            name: 'slot-name',
            age: '28',
            list: [1, 2, 3, 4],
          })
        }
      </div>
    );
  },
}
