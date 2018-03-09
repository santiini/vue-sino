// jsx: 点击事件

import { Group, Cell, XButton } from 'vux';

import Demo31 from './demo31'

export default {
  name: 'app-vue-jsx-demo3',
  components: {
    Group, Cell, XButton, Demo31,
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
      // 阻止默认事件
      // event.preventDefault();
      // vue .self 的实现
      // if (event.target !== event.currentTarget) return
    },
    // 列表项的点击事件
    checkItem(item) {
      console.log(`demo3的监听: ${item}`)
      // this.$emit('checkItem', item)
    },
    clickGroupHandler() {
      console.log('demo3的group点击监听')
    },
  },
  data() {
    return {
      list: [1, 2, 3, 4],
    }
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
      <div>
        <Group title="demo3：jsx事件绑定">
          <Cell title="组件渲染cell" nativeOnClick={this.clickHandler}>
            <x-button
              type="primary"
              mini
              nativeOnClick={() => this.clickBtnHandler({ type: '参数传递' })}
            >按钮</x-button>
          </Cell>
        </Group>
        <Demo31
          // tips: 事件监听的语法 -- 两种方式
          // 方式1： github 的 demo - onEvent, 对应的 $emit 事件: $emit(eventName), 可以转化为方式2
          onCheckItem={this.checkItem}
          // on-checkItem={this.checkItem}  // 可以使用
          // onClickGroup={this.clickGroupHandler}
          // 方式2： on-event-name, 对应的 $emit 事件: $emit(event-name), 此时，不能用方式1的方法
          on-click-group={this.clickGroupHandler} // 无法使用
        />
      </div>
    );
  },
}
