// jsx render组件

import { Group, Cell } from 'vux';

// 方式1： html 标签渲染
export const Demo1 = {
  name: 'app-vue-jsx-demo1',
  // props 的使用
  props: {
    // String 类型
    desc: {
      type: String,
      default: 'demo1',
      required: true,
    },
    // Object 类型
    list: {
      type: Array,
      default: () => [],
    },
    // Function 类型
    checkItem: {
      type: Function,
      default() {
        event.stopPropagation();
        console.log('默认事件');
      },
    },
  },
  // data 的使用
  data() {
    return {
      name: 'jsx语法',
      effect: '渲染标签',
    }
  },
  methods: {
    clickHandler() {
      console.log('render div的点击事件');
    },
  },
  render(h) {
    // props 中数组类型 list 的渲染：
    // const listTemp = this.list
    console.log(this)
    // console.log(this.$props) // 不能使用
    console.log(this.list)

    // 通过 js 语法获取模板
    const listTemp = this.list && this.list.map(item => (<div>{item}</div>))

    return (
      <div
        id="jsx-demo"
        onClick={this.clickHandler}
        class={{ foo: true, bar: false }}
        style={{ color: 'orange', backgroundColor: '#eee', padding: '5px' }}
      >
        <div>demo1: 简单 html 元素</div>
        <div>domPropsInnerHTML="11111111"</div>
        <h4>1. data 数据</h4>
        <div>name: { this.name }</div>
        <div>effect: {this.effect}</div>
        <h4>2. props 参数</h4>
        <div>2.1 desc(string): {this.desc}</div>
        <div>2.2 list(array)</div>
        <div style={{ padding: '5px' }}>
          {listTemp}
        </div>
        <div>2.3 methods 传递</div>
        <div style={{ padding: '5px', 'background-color': '#fff' }}>
          <button onClick={this.checkItem}>按钮</button>
        </div>
      </div>
    )
  },
}

// 方式2：组件渲染;
export const Demo2 = {
  name: 'app-vue-jsx-demo2',
  components: {
    Group, Cell,
  },
  methods: {
    clickHandler() {
      console.log('render div的点击事件');
    },
  },
  render(h) {
    // jsx 语法对应 createElement 的配置项;
    // 1. attrs 直接按元素属性写
    // 2. domPropsInnerHTML 等 domProps 元素props, 以 domProps 开头;
    // 3. onClick 等事件监听，以 on 开头;
    // 4. nativeOnClick 等 native 事件, 以 nativeOn 开头;
    // 5. class, style 和 react 一样
    // 6. key, ref, slot, 和 createElement 一样;
    return (
      <Group title="demo2：jsx渲染组件">
        <Cell title="组件渲染cell"></Cell>
      </Group>
    );
  },
}
