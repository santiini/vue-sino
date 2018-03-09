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

## vue 中 slot-scope 作用域插槽的使用

Vue 2.5 版本后，作用域插槽发生改变，
```html
<template slot="item" scope="props">
```
改变为：
```html
<template slot="item" slot-scope="props">,
```
其使用方法如下：

scope 传递数据，向组件间的 props 传递一样<br/>
在父组件中：

```html
<!-- 在父组件中 -->
  <demo52 name="slot-name" :list="slotList">
    <!-- 简单通过 slot-scope 获取 slot 的参数 -->
    <template slot="name" slot-scope="props">
      <cell :title="`slot-name获取参数name: ${props.slotName}`"></cell>
    </template>
    <!-- 利用 slot-scope 获取修改列表中 slot 的内容 -->
    <template slot="item" slot-scope="props">
      <cell :title="`slot-item：${props.item.name}`">{{props.item.id}}</cell>
    </template>
  </demo52>
```

在子组件中

```pug
  .demo-vue-scope-slots-demo52
    group(title="scope的Vue模板测试")
      cell(title="slot-scope的使用")
      //- 简单数据的传递
      slot(name="name" :slotName="name")
      //- slot 具有默认的数据
      slot(name="title")
        cell(title="默认slot: title")
      //- v-for 中的 slot, key 的添加，数据的传递;
      slot(name="item" v-for="(item,i) of list" :item="item")
        cell(:title="item.name" :key="i")
```

## vue 中 hoc 的使用

## vue 中 render(h), createElement, JSX 的使用测试;

reander(h) render 函数的参数是 h --> createElemet 函数生成的 VNode 节点
createElement 方法是重点，需要做仔细的研究

### createElement 基础的用法

createElement 函数的三个参数: h(name/Component, options, Vnodes)

+ name: html 标签名称, String 类型; Component, 组件选项对象， 用于生成组件
+ options: 生成标签、组件需要的 options 配置(class, style, on, props, domProps, nativeOn等)
+ Vnodes: String/Array, 子节点，两种类型: 1. 简单的 String 生成文本节点; 2. Vnodes createElement生成的 Vnodes 节点

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

### createElemet 函数中 slot 的使用

#### createElemet 中 slot 的简单使用

利用 createElemet 函数生成各个 slot 部分的内容，并最终作为组件的返回 createElemet 函数的 子节点（VNodes) 渲染

```js
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
        // 判断: footer slot 的默认部分渲染 or 组件的实例部分slot
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
        // 渲染组件的 slot, 利用 scopedSlots 对应 slot 生成 VNodes, 利用 props => h() 渲染函数
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
      // [header, this.$slots.default, footer], // 2. this.$slots.default 构建核心部分
      [header, main, footer],
    );
  },

```

#### createElemet 中默认的 slot 的使用
默认的 slot 渲染，则是进行简单的判断：判断实例组件的 slot 部分： this.$slots.default,  如果组件实例没有 slot 内容， 则渲染默认的 Vondes 作为子元素渲染;

```js
  // header 的默认 slot 设置: <slot name="header"><cell> ... </cell></slot>
  const headerSlot = h(
    Cell,
    {
      props: {
        title: 'header的默认slot',
        value: 'header的默认value',
      },
    },
  );
  // 作为 slot-header 的渲染部分内容：
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

  // 最终返回的 h() 渲染函数:
  render() {
    // ...
    return h(
      'div', {
      // ...
      },
      [header, main, footer],
    )
  }
```

#### createElement 中 scope-slots 作用域插槽的使用
作用域插槽 scope-slot 为子组件的自定义提供了很大的遍历，在 createElement 中作用域插槽的实现需要借助 this.$scopedSlots(this.$scopedSlots.default等) 属性;

+ 简单的使用
```js
  // ...
  return h(
    Group,
    {
      props: {
        title: '2. 使用 this.$scopedSlots',
      },
    },
    [
      // tips: this.$scopedSlots.default() 作为函数使用，需要判断其是否存在,
      // 实际上是判断：父组件中是否有 <template slot-scope></template>, slot-scope 的作用域渲染;
      this.$scopedSlots.default(),
      this.$scopedSlots.title({
        msg: this.$props.name,
      }),
    ],
  )

```

+ 更复杂，实际点的使用;

```js
  // ...
  render(h) {
    //  利用 this.$scopedSlots 作用域插槽
    // tips: 使用 this.$scopedSlots 作为函数， 必须保证 slot 使用的地方，使用了 slot-scope, 否则会报错;
    // 默认的作用域渲染内容：
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
      ? this.$scopedSlots.title({ msg: this.$props.name })
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
          title: '2. 使用 this.$scopedSlots',
        },
      },
      [
        defaultSlot, titleSlot,
      ],
    )
  },

```

### createElement 中 v-model, v-if, v-for 等的 js 编程实现
render 函数中没有相关的 api, 需要使用原生的 JavaScript 来实现

+ v-if 通过判断条件
+ v-for 则通过  map 循环返回 createElement 生成的 VNodes
+ v-model 则通过该语法糖的实现原理来做： 传递属性 value, 并通过回调中 $emit('input', value) 改变父组件的值

```js
  // ...
  // js 的 v-if 和 v-for
  const listTemp = (list) => {
    if (list.length > 0) {
      return list.map(item => h(Cell, {
        props: {
          title: item.name,
          // value: item.id,
          // 'inline-desc': item.desc,
        },
        // 组件的作用域插槽: slot-scope
        scopedSlots: {
          value: props => h('span', `value: ${item.id}`),
          'inline-desc': props => h('div', [
            h('div', 'desc-slot: header'),
            h('div', { style: { color: 'red' } }, `desc-conten: ${item.desc}`),
            h('div', 'desc-slot: footer'),
          ]),
        },
      }));
    }
    return null;
  }

  // ...
  // v-model
  const inputTemp = h(XInput, {
    props: {
      title: '随便填',
      placeholder: '请输入内容',
      value: this.value,
    },
    on: {
      'on-change': (val) => {
        // tips: 不能直接修改 props 的值，需要通过 $emit() 改变父组件的传入值，进而改变当前组件的 value
        // this.value = val
        console.log('组件值：', this.value)
        this.$emit('input', val)
      },
    },
  });

```

### 函数式组件 functional,
使组件无状态（没有 data ）和无实例（没有 this 上下文）。他们用一个简单的 render 函数返回虚拟节点使他们更容易渲染。
组件需要的一切都是通过 上下文对象(context) 传递，包括：

+ props: 提供props 的对象
+ children: VNode 子节点的数组, 包括所有的slot: 默认的(default)和具名slot
+ slots: slots 对象, 使用时区别一般 $slots, 应该： context.slots().default, 不是： this.$slots.default
+ data: 传递给组件的 data 对象, 非组件的数据data, 是指html的 attrs
+ parent: 对父组件的引用
+ listeners: (2.3.0+) 一个包含了组件上所注册的 v-on 侦听器的对象。这只是一个指向 data.on 的别名
+ injections: (2.3.0+) 如果使用了 inject 选项, 则该对象包含了应当被注入的属性。

在添加 functional: true 之后，锚点标题组件的 render 函数之间简单更新增加 context 参数，this.$slots.default 更新为 context.children，之后this.level 更新为 context.props.level。

因为函数化组件只是一个函数，所以渲染开销也低很多。然而，对持久化实例的缺乏也意味着函数化组件不会出现在 Vue devtools 的组件树里。

```js
  render: (h, context) => {
    // 1. props 部分渲染
    const renderProps = prop => h(Cell, {
      props: { title: `props: ${context.props[prop]}` },
    });
    const propsArr = Object.keys(context.props).map(prop => renderProps(prop));
    // 2. slot 渲染
    console.log(context) // context 对象上没有 $scopedSlots 属性
    // 使用 context.slots() 获取实例 slot, 区别使用: this.$slots.default
    const footer = context.slots().footer
      ? context.slots().footer
      : h(Cell, {
        props: { title: 'footer标题' },
        scopedSlots: {
          value: props => h(XButton, {
            props: { type: 'primary', mini: true },
            nativeOn: {
              click() {
                console.log('111111111')
                event.stopPropagation()
              },
            },
          }, '按钮'),
        },
      });

    // 3. 利用 context.slots() 作为一部分的渲染
    const header = h(Cell, {
      props: {
        title: 'header的固定title',
      },
      scopedSlots: {
        // tips: scopedSlots 必须是一个函数，返回渲染的结果，一般是： VNode
        // value: props => h(XButton, { props: { mini: true } }, '默认的按钮'),
        value: () => context.slots().header || h(XButton, { props: { mini: true } }, '默认的按钮'),
      },
    })

    return h(Group, {
      props: { title: 'functional component' },
    }, [
      header, slotTemp, ...propsArr, footer,
    ])
  },
  props: {
    name: String,
    age: Number,
  },
```

#### slots().default 和 children 的区别

+ children 不只有 slots().default, 还有其他具名slot
+ 选择让组件通过 slot() 系统分发或者简单的通过 children 接收
+ 区分 函数式组件 和 一般组件的 slots,  this.$slots.default, context.slots().default

#### methods 和 listeners 的使用

在函数式组件中，不存在 this 和 组件实例，所以不能通过 this 访问到实例，需要通过其其他方法实现:

##### context.listeners 是一个指向 data.on 的别名

函数化组件的事件监听是通过 createElement 的 options(data) 配置中的 on 实现事件监听， 至于模板中的 methods 使用，
可以通过 context.parent.methodName 来实现，

#### context.parent 的使用

### jsx 的使用

在 vue 使用 jsx 语法，需要使用 babel 插件 [babel-plugin-transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx)，具体使用前准备如下:

+ 安装 jsx 依赖包

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

#### jsx 中的事件绑定 onClick 和 nativeOnClick

## Vue 中 TypeScript 的使用
