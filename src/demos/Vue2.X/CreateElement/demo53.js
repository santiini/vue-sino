// 函数式组件
import { Group, Cell, XButton } from 'vux';

export default {
  name: 'functional-component',
  components: { Group, Cell, XButton },
  methods: {
    clickBtnHandle() {
      event.stopPropagation();
      console.log('点击按钮');
    },
  },
  // 函数式组件
  // 1. 无状态（没有 data）
  // 2. 无实例（没有 this 上下文）。
  // 3. 对持久化实例的缺乏也意味着函数化组件不会出现在 Vue devtools 的组件树里。
  functional: true,
  // 函数式组件没有 this, 所以 render 添加 context 参数,
  // this.$slots.default 更新为 context.children，之后this.level 更新为 context.props.level。

  //   组件需要的一切都是通过上下文传递，包括：
  // props: 提供props 的对象
  // children: VNode 子节点的数组
  // slots: slots 对象
  // data: 传递给组件的 data 对象
  // parent: 对父组件的引用
  // listeners: (2.3.0+) 一个包含了组件上所注册的 v-on 侦听器的对象。这只是一个指向 data.on 的别名。
  // injections: (2.3.0+) 如果使用了 inject 选项, 则该对象包含了应当被注入的属性
  render: (h, context) => {
    // props 部分渲染
    const renderProps = prop => h(Cell, {
      props: { title: `props: ${context.props[prop]}` },
    });
    const propsArr = Object.keys(context.props).map(prop => renderProps(prop));
    // console.log(propsArr)
    // console.log(context);
    const slotTemp = h(Cell, {
      props: { title: `slot: ${context.props.name}` },
      scopedSlots: {
        // 这里是作用域插槽- scope-slot, 所以这里的 props 是 Cell组件slot 传给实例的内容
        value: props => h(XButton, {
          props: { type: 'primary', mini: true },
        }, `${JSON.stringify(props)}-click`),
      },
    });

    // slot 渲染
    console.log(context) // context 对象上没有 $scopedSlots 属性
    // const valueTemp = context.$scopedSlots.value
    //   ? context.$scopedSlots.value()
    //   : h('div', '默认的valueslot')
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

    // tips: slots().default 和 children 的区别
    // 1. children 不只有 slots().default, 还有其他具名slot
    // 2. 选择让组件通过 slot() 系统分发或者简单的通过 children 接收
    // 3. 区分 函数式组件 和 一般组件的 slots,  this.$slots.default, context.slots().default
    console.log(context.slots())
    // const header = context.slots().header
    //   ? context.slots().header
    //   : h(Cell, {
    //     props: { title: 'header标题' },
    //     scopedSlots: {
    //       value: props => h(XButton, {
    //         props: { type: 'primary', mini: true },
    //         nativeOn: {
    //           click() {
    //             console.log('111111111')
    //             event.stopPropagation()
    //           },
    //         },
    //       }, '按钮'),
    //     },
    //   });
    const header = h(Cell, {
      props: {
        title: 'header的固定title',
      },
      scopedSlots: {
        // tips: scopedSlots 必须是一个函数，返回渲染的结果，一般是： VNode
        // value: props => h(XButton, { props: { mini: true } }, '默认的按钮'),
        // value: context.slots().header || h(XButton, { props: { mini: true } }, '默认的按钮'),
        value: () => context.slots().header || h(XButton, { props: { mini: true } }, '默认的按钮'),
      },
    })

    return h(Group, {
      props: { title: 'functional component' },
    }, [
      header, slotTemp, ...propsArr, footer,
        // [renderProps()],
    ])
  },
  // props 2.3.0版本后可选
  // 省略 props 选项，所有组件上的属性都会被自动解析为 props。
  props: {
    name: String,
    age: Number,
  },
}
