<script>
  import { Group, Cell, XInput, Selector, Datetime } from 'vux'

  import Demo2 from './demo2'

  export default {
    name: 'demo-vue-this-listeners-demo1',
    components: {
      Group, Cell, Demo2, XInput, Selector, Datetime,
    },
    created() {
      // console.log(this)
      // console.log(this.$listeners)
    },
    methods: {
      changeName(val) {
        // console.log(val)
        this.$emit('changeName', val)
      },
    },
    render(h) {
      console.log(this.$listeners)
      // tips: 这是的 options 对应的属性应该是 createElement 中的参数 options;
      const options = {
        on: this.$listeners,
        // listeners: this.$listeners,
      };
      return (
        <div>
          <group title="$listeners传递: demo1, (不含 .native 修饰器的) v-on 事件监听器">
            <x-input title="姓名" on-on-change={this.changeName} />
          </group>
          <demo2 {...options} />
        </div>
      )
    },
  }
</script>
