// jsx render组件

import { Group, Cell } from 'vux';

// 方式1： html 标签渲染
export const Demo1 = {
  name: 'app-vue-jsx-demo1',
  methods: {
    clickHandler() {
      console.log('render div的点击事件');
    },
  },
  render(h) {
    return (
      <div
        id="jsx-demo"
        onClick={this.clickHandler}
        class={{ foo: true, bar: false }}
        style={{ color: 'yellow', backgroundColor: 'red' }}
      >
        <div>demo1: 简单 html 元素</div>
        <div>domPropsInnerHTML="11111111"</div>
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
