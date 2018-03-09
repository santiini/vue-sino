<script>
  import { Group, Cell, XInput, Selector, Datetime } from 'vux'

  import Demo1 from './demo1'

  export default {
    name: 'demo-vue-this-listeners-demo2',
    components: {
      Group, Cell, Demo1, XInput, Selector, Datetime,
    },
    created() {
      console.log(this)
      console.log(this.$listeners)
    },
    methods: {
      changeSelector(type) {
        console.log(type)
        this.$emit('changeSelector', type)
      },
    },
    data() {
      return {
        demo2Type: '',
      }
    },
    render(h) {
      return (
        <group title="$listeners传递: demo2">
          <selector title="选项" value={this.demo2Type} options={[1, 2, 3, 4]} on-on-change={this.changeSelector} />
          <datetime title="开始时间" />
        </group>
      )
    },
  }
</script>
