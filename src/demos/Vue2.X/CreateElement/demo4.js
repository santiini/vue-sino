// createElement: slots 的使用

// 引用组件
import { Group, Cell } from 'vux';


export default {
  name: 'app-vue-create-element-demo4',
  props: {
    name: String,
    total: Number,
  },
  components: {
    Group, Cell,
  },
  render(h) {
    // 1. 利用 this.$slots 来渲染 slot
    // tips: 利用 this.$slots.default, this.$slots.name 指向实例中的 slot 部分，
    // 在 createElement 函数，把 slot 对应的部分渲染到指定位置，
    // 判断默认的 slot 和用户定义的 slot

    // header 的默认 slot 设置 <slot name="header"><cell> ... </cell></slot>
    const headerSlot = h(
      Cell,
      {
        props: {
          title: 'header的默认slot',
          value: 'header的默认value',
        },
      },
    );
    // slot-header <slot name="header"></slot>
    const header = h(
      Group,
      {
        props: {
          title: 'createElement 组件的header',
        },
      },
        // footer slot 的默认部分渲染
        [this.$slots.header || headerSlot],
    );
    // slot-footer <slot name="footer"></slot>
    const footer = h(
      Group,
      {
        props: {
          title: 'createElement 组件的 footer',
        },
      },
      this.$slots.footer,
    );
    // slot: 默认的slot <slot></slot>
    const main = h(
      Cell,
      {
        props: {
          title: '组件的核心部分',
        },
        scopedSlots: {
          value: props => h('span', 'main的value: 固定'),
          'inline-desc': (props) => {
            // createElement 和 slot 的渲染参数: 1.元素 or 组件  2. options 渲染项 3. slot 部分(子元素)
            const defatulSlot = h('div', { style: { color: 'red' } }, this.$slots.default);
            return h(
              'div',
              [
                h('div', 'inline-footer'),
                defatulSlot,
                h('div', 'inline-header'),
              ],
            );
          },
        },
      },
    );
    return h(
      'div',
      { class: { demo4: true } },
      // [header, footer], // 1. 只有 footer 和 header
      // [header, this.$slots.default, footer], // 2. this.$slots.default 构建核心部分
      [header, main, footer],
      // this.$slots.default, // 不会生效
    );
  },
}
