// jsx: 点击事件

import { Group, Cell, XButton } from 'vux';

export default {
  name: 'app-vue-jsx-demo52',
  components: {
    Group, Cell, XButton,
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
    return (
      <div>
        <Group title="demo52：props和attrs">
          <Cell title={this.name} />
          <Cell title={this.title} />
          <Cell title={this.$attrs.age} />
          <Cell title={this.$attrs.home} />
        </Group>
      </div>
    );
  },
}
