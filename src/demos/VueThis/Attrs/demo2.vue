<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'demo-vue-this-attrs-demo2',
    // inheritAttrs: 是否在 html 中渲染 attrs, 默认渲染;
    inheritAttrs: false,
    components: {
      Group, Cell,
    },
    props: {
      name: String,
      title: String,
    },
    created() {
      // console.log(this)
      // console.log(this.$props)
      // console.log(this.$attrs)
    },
    render(h) {
      return (
        <div>
          <group title="demo2: props">
            <cell title={this.name} />
            <cell title={this.title} />
          </group>
          <group title="dem2: $attrs">
            <cell title={this.$attrs.sex} />
            <cell title={this.$attrs.age} />
            <cell title={this.$attrs.desc} />
          </group>
        </div>
      )
    },
  }
</script>
