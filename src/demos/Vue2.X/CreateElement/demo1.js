/**
 * 测试 createElement 创建组件
 */
import Com1 from './com1.vue';

//  demo1: 直接导出对象： html 标签
export const Demo1 = {
  name: 'demos-create-element-demo1',
  render(h) {
    return h(
      // createElement 创建元素:
      // 1. html 标签
      'div',
      '这是demo1文字部分',
    );
  },
};

// demo2: html 标签改变 css
// tips:
// props 的使用
// data 的使用
export const Demo2 = {
  name: 'demos-create-element-demo1',
  // 通过 this.name 访问到 props 属性
  props: {
    name: String,
    age: Number,
    list: Array,
  },
  data() {
    return {
      title: 'demo2-title',
    }
  },
  render(h) {
    console.log(this)
    console.log(this.name)
    return h(
      'div',
      {
        // class 和 style 的两种形式：
        // 1. 'demo-class' 引号加 ’-‘连接
        // 2. 驼峰式写法: marginLeft
        class: {
          'demo2-class': true,
          demo2Color: true,
          demo2Error: false,
        },
        style: {
          backgroundColor: 'yellow',
          // 'margin-left': '10px',
          margin: '5px',
        },
      },
      // '这是demo2文字部分',
      [
        h('div', `data 数据：: ${this.title}`),
        h('div', `props.name: ${this.name}`),
        h('div', `props.age ${this.age}`),
      ],
    );
  },
};

// demo3: 组件渲染
export const Demo3 = {
  name: 'demos-create-element-demo2',
  // 组件 options
  props: {
    name: String,
    age: Number,
  },
  methods: {
    triggerCell(item, i) {
      console.log('render 组件')
      console.log(item, i)
    },
  },
  // createElement 创建元素:
  // 2. 创建 vue 组件
  render(h) {
    // this 是个 Proxy 对象, 指向组件实例
    const list = [11, 22, 33, 44];
    console.log(this)
    console.log(this.$props)
    console.log(this.$props.name)
    return h(
      Com1,
      // Com1组件配置信息： options, 其中包括: props, mixins, data, methods, hooks等;
      {
        // 1. 和`v-bind:class`一样的 API
        class: {
          'demo-com1': true,
        },
        // 2. // 和`v-bind:class`一样的 API
        style: {
          color: 'red',
          backgroundColor: '#eee',
        },
        // 3. 正常的 HTML 特性
        attrs: {
          id: 'com1',
          'data-msg': '这是com1的html特性',
        },
        // 4. 组件 props
        // props: this.$props,
        props: { list, ...this.$props },
        // 5. DOM 属性
        domProps: {},
        // 6. 事件监听器基
        // 事件监听器基于 `on`, 所以不再支持如 `v-on:keyup.enter` 修饰器, 需要手动匹配 keyCode。
        on: {
          'check-cell': this.triggerCell,
        },
        // 7. 仅对于组件，用于监听原生事件，而不是组件内部使用 `vm.$emit` 触发的事件。
        nativeOn: {

        },
        // 8. 自定义指令. 注意事项：不能对绑定的旧值设值
        // Vue 会为您持续追踪
        directives: [],
        // 9.  Scoped slots： slot 渲染, 其形似如下： props => 返回一个 VNode or VNode 数组
        // { name: props => VNode | Array<VNode> }
        scopedSlots: {
          // default: props => createElement('span', props.text)
          default: props => h('span', 'slot自定义'),
          footer: props => h('div', '自定义的footer'),
        },
        // 10. 如果组件是其他组件的子组件，需为 slot 指定名称
        // slot: 'name-of-slot',
        // 11. // 其他特殊顶层属性
        // key: 'myKey',
        // ref: 'myRef'
      },
    );
  },
};
