<script>
  import { Group, Cell } from 'vux'

  import menu from '../../data/menu'

  export default {
    name: 'demo-vue-this-list',
    components: {
      Group, Cell,
    },
    data() {
      const { list } = menu.find(item => item.name === 'vue-this')
      return {
        list,
      }
    },
    methods: {
      goPage(item) {
        event.stopPropagation();
        this.$router.push({ name: `menu-vue-this-${item.name}` })
      },
      clickGroup() {
        console.log('点击group')
      },
    },
    created() {
      // console.log(this)
    },
    render(h) {
      const listTemp = this.list.map((item) => {
        if (!item.isHidden) {
          return (
            <cell
              // tips: 事件绑定和传参数，参考 reactJS
              // nativeOnClick={this.goPage}
              nativeOnClick={() => this.goPage(item)}
              title={item.title || item.name}
            >
              {item.name}
            </cell>
          )
        }
        return null
      });
      // tips: nativeOnClick 时间绑定， 也可以 nativeOn-click 这种形式来绑定;
      return (
        <div class="demo-vue-this-list">
          <group title="vue的this对象的属性" nativeOnClick={this.clickGroup}>
            {listTemp}
          </group>
        </div>
      )
    },
  }
</script>

