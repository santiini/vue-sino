<script>
  import { Group, Cell, Selector } from 'vux'

  import Demo1 from './demo1'
  import Temp from './temp'

  export default {
    name: 'demo-vue-this-listeners-index',
    components: {
      Group, Cell, Demo1, Selector, Temp,
    },
    methods: {
      // 名字变更
      changeName(name) {
        console.log(`index 组件：${name}`)
      },
      changeSelector(item) {
        console.log(`index 组件: ${item}`)
      },
      changeTime(time) {
        console.log(time)
      },
      changeType(type) {
        this.demoType = type
      },
    },
    data() {
      return {
        demoType: 1,
      }
    },
    render(h) {
      // 事件传递 v-on="$listeners" 的两种形式： 1. jsx 2. template
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
          <group title="$listeners传递所有父组件中的监听函数(v-on:), 配合 inheritAttrs: false 使用">
          {
            this.demoType === 1
            ? <Demo1
                name="props: name"
                title="props: title"
                onChangeName={this.changeName}
                onChangeSelector={this.changeSelector}
                onChangeTime={this.changeTime}
              />
            : <Temp
                name="props: name"
                title="props: title"
                onChangeName={this.changeName}
                onChangeSelector={this.changeSelector}
                onChangeTime={this.changeTime}
              />
          }
          </group>
        </div>
      )
    },
  }
</script>
