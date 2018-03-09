// jsx: 点击事件

import { Group, Cell, XButton } from 'vux';

export default {
  name: 'app-vue-jsx-demo31',
  components: {
    Group, Cell, XButton,
  },
  methods: {
    // 列表项的点击事件
    checkItem(item) {
      console.log(`demo31的$emit: ${item}`)
      this.$emit('checkItem', item)
      event.stopPropagation()
    },
    clickHandler() {
      console.log('demo31: group点击')
      this.$emit('click-group')
    },
  },
  data() {
    return {
      list: [1, 2, 3, 4],
    }
  },
  render(h) {
    // 列表渲染
    const listTemp = this.list.map(
      item => <Cell title={item} nativeOnClick={() => this.checkItem(item)} />,
    )
    return (
      <Group title="事件监听：$emit 的实现">
        {listTemp}
        <XButton nativeOnClick={this.clickHandler}>点击事件</XButton>
      </Group>
    );
  },
}
