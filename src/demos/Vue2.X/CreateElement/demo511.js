// createElement: js 编程取代模板

// 引用组件
import { Group, Cell, XInput, XButton } from 'vux';


export default {
  name: 'app-vue-create-element-demo511',
  // data 属性必须是函数，返回对象;
  data: () => ({ title: '5111' }),
  props: {
    name: String,
    total: Number,
    list: Array,
    value: String,
  },
  components: {
    Group, Cell, XInput, XButton,
  },
  // 组件方法
  methods: {
    // methods 方法中可以通过 this 改变指向组件实例，改变 data 数据等;
    changeData() {
      event.stopPropagation();
      console.log('change data-title');
      // console.log(this)
      this.title = '511改变后的title';
    },
    clickCellHandle() {
      console.log('不改变title');
      console.log(this.title)
    },
  },
  render(h) {
    //  利用 this.$scopedSlots 作用域插槽

    // 插槽作用域的默认模板
    const defaultSlot = this.$scopedSlots.default
      ? this.$scopedSlots.default()
      : h(Cell, {
        props: {
          title: '默认的slot',
          value: '默认slot-value',
          'inline-desc': '默认的slot-inlinde-desc',
        },
      });
    const titleSlot = this.$scopedSlots.title
      ? this.$scopedSlots.title({ msg: this.$props.name })
      : h(Cell, {
        props: {
          title: 'title的默认slot',
          value: 'title-slot的默认valuevalue',
          'inline-desc': 'title-slot的默认desc',
        },
      });

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
            value: props => h('span', {
              style: {
                backgroundColor: '#eee',
                padding: '10px',
                color: 'red',
              },
              // 事件监听
              on: {
                click: (event) => {
                  console.log(11111)
                },
              },
            }, `value: ${item.id}`),
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

    // js 的 v-model
    const inputTemp = h(XInput, {
    // const inputTemp = h('input', {
      props: {
        title: 'v-model的实现',
        placeholder: '请输入内容',
        value: this.value,
      },
      on: {
        'on-change': (val) => {
          // tips: 不能直接修改 props 的值，需要通过 $emit() 改变父组件的传入值，进而改变当前组件的 value
          // console.log(val)
          // this.value = val
          console.log('组件值：', this.value)
          // this.value = event.target.value;
          this.$emit('input', val)
        },
      },
    });

    // 事件 & 按键修饰符
    // 对于 .passive、.capture 和 .once事件修饰符, Vue 提供了相应的前缀可以用于 on:
    // 对于其他的修饰符, 前缀不是很重要, 因为你可以直接在事件处理函数中使用事件方法:
    const eventTemp = h(
      Group,
      {
        props: { title: '事件修饰符' },
      },
      [
        h(Cell, {
          props: { title: '.stop' },
          scopedSlots: {
            value: props => h(XButton,
              {
                props: { type: 'primary', mini: true },
                nativeOn: {
                  click: () => {
                    console.log('按钮的点击事件');
                    console.log(this)
                    // 如果触发事件的元素不是事件绑定的元素 -- .self
                    // 则返回
                    // if (event.target !== event.currentTarget) return
                    // 如果按下去的不是enter键或者
                    // 没有同时按下shift键
                    // 则返回
                    // if (!event.shiftKey || event.keyCode !== 13) return
                    // 阻止 事件冒泡
                    event.stopPropagation();
                    // 阻止该元素默认的keyup事件
                    event.preventDefault();
                  },
                },
              }, '按钮事件'),
          },
          nativeOn: {
            click: () => { console.log('cell的点击事件') },
          },
        }),
        h(Cell, {
          props: { title: '事件改变data' },
          nativeOn: {
            click: this.clickCellHandle,
          },
          scopedSlots: {
            value: props => h(XButton, {
              nativeOn: {
                click: this.changeData,
              },
            }, '改变data-title'),
          },
        }),
      ],
    );


    return h(
      Group,
      {
        props: {
          title: '2. 使用 this.$scopedSlots',
        },
      },
      [
        defaultSlot, titleSlot,
        listTemp(this.$props.list),  // v-if 和 v-for
        inputTemp, // v-model
        eventTemp,
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
