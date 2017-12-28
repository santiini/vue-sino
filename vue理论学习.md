# Vue的理论学习，拓展

## Vue.component, mixins, extends 的使用和比较

+ Vue.component 注册全局组件,为了方便
+ Vue.extend 创建组件的构造函数,为了复用
+ mixins、extends 为了扩展
+ 优先级：extend > extends > mixins


## is 特性实现动态渲染组件

通过使用保留的 component 元素，动态地绑定到它的 is 特性，我们让多个组件可以使用同一个挂载点，并动态切换:

+ 通过 data 中的 currentView 对应不同的组件渲染
+ 在内置组件 component 上用 is 绑定 currentView
+ 通过 props 向 component 传递统一参数或函数
+ 通过时间监听来把 component 中的数据反馈给当前组件

```html
<component
  :is="curView"
  :name="curView === 'Com1' ? 'demo1' : 'demo2'"
  :list="list"
  @clickCell="onClickCell">
  </component>

```

## vue 中 hoc 的使用

## vue 中 render(h), createElement, JSX 的使用测试;

reander(h) render 函数的参数是 h --> createElemet 函数生成的 VNode 节点
createElement 方法是重点，需要做仔细的研究

### createElement 的用法

```js
  // 创建 vue 组件
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
```

### jsx 的使用

在 vue 使用 jsx 语法，需要使用 babel 插件 [babel-plugin-transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx)，具体使用前准备如下:

+ 安装 jsx 依赖包

```bash
npm install\
  babel-plugin-syntax-jsx\
  babel-plugin-transform-vue-jsx\
  babel-helper-vue-jsx-merge-props\
  babel-preset-env\
  --save-dev
```

+ 配置 .babelrc 文件:

```json
{
  "presets": ["env"],
  "plugins": ["transform-vue-jsx"]
}
```

下来就可以在 render(createElement) 中，利用 createElement 生成并返回 VNode 元素

```js
  render(h) {  // <-- h must be in scope, Version 3.4.0 后， h 函数可以自动注入;
    return <div id="foo">bar</div>
  }
```

## Vue 中 TypeScript 的使用
