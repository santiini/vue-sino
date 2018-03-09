<script>
  import { Group, Cell, Selector } from 'vux'

  import Demo1 from './demo1'
  import Temp from './temp'

  export default {
    name: 'demo-vue-this-attrs-index',
    components: {
      Group, Cell, Demo1, Selector, Temp,
    },
    data() {
      return {
        demoType: 1,
      }
    },
    methods: {
      changeType(type) {
        console.log(type)
        this.demoType = type
      },
    },
    // jsx 中 v-model 的实现:
    // 通过value属传递值，并通过绑定input事件来响应变化。
    render(h) {
      const attrsData = {
        sex: 'attrs: sex',
        age: 'attrs: age',
        desc: 'desc: desc',
      };
      const propsData = {
        name: 'props: name',
        title: 'props: title',
      };
      return (
        <div>
          <group title="demo类型：1. jsx 2. template">
            <selector
              title="类型"
              options={[1, 2]}
              value={this.demoType}
              on-on-change={this.changeType}
            />
          </group>
          <group title="$attrs传递所有父组件中的非子组件props(style,class除外)属性，往下传递, 配合 inheritAttrs: false 使用">
            {
              this.demoType === 1
              ? <demo1 {...{ props: propsData, attrs: attrsData }} />
              : <temp {...{ props: propsData, attrs: attrsData }} />
            }
          </group>
        </div>
      )
    },
  }
</script>
