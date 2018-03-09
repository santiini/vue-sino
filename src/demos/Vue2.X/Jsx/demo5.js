// jsx: 点击事件

import { Group, Cell, XButton } from 'vux';

import Demo51 from './demo51'
import Demo52 from './demo52'
import Demo53 from './demo53'

export default {
  name: 'app-vue-jsx-demo5',
  components: {
    Group, Cell, XButton, Demo51, Demo52, Demo53,
  },
  methods: {
    clickHandler() {
      console.log('Group的点击事件');
      this.$emit('on-click-cell')
    },
    clickBtnHandler(params) {
      // tips: 参数传递
      console.log('XButton的点击事件');
      console.log(params)
      // 阻止冒泡事件
      event.stopPropagation();
    },
    // 列表项的点击事件
    checkItem(item) {
      console.log(`demo5的监听: ${item}`)
      // this.$emit('checkItem', item)
    },
    clickGroupHandler() {
      console.log('demo5的group点击监听')
    },
  },
  props: {
    name: String,
    title: String,
  },
  data() {
    return {
      list: [1, 2, 3, 4],
    }
  },
  render(h) {
    // console.log(this)
    console.log(this.$props)
    // tips: props 和 attrs 的传递：以 options 对象的形式传递， jsx 的方式传递;
    // 分别传参数： props 和 attrs, 或者传递 options 都是可以的;
    const options = {
      // props: {
      //   name: 'props: demo51-name',
      //   title: 'props: demo51-title',
      // },
      props: this.$props,
      attrs: this.$attrs,
    }
    const demo52Props = { props: this.$props };
    const demo52Attrs = { attrs: this.$attrs };
    return (
      <div>
        <Group title="demo5：props和attrs">
          <Cell title="组件渲染cell" nativeOnClick={this.clickHandler}>
            <x-button
              type="primary"
              mini
              nativeOnClick={() => this.clickBtnHandler({ type: '参数传递' })}
            >按钮</x-button>
          </Cell>
          <Cell title={this.name} />
          <Cell title={this.title} />
          <Cell title={this.$attrs.age} />
          <Cell title={this.$attrs.home} />
        </Group>
        <Demo51
          {...options}
        />
        <Demo52 {...demo52Attrs} {...demo52Props} />
      </div>
    );
  },
}
