<script>
  import { Group, Cell } from 'vux'

  import Demo2 from './demo2'

  export default {
    name: 'demo-vue-this-attrs-demo1',
    // inheritAttrs: 是否在 html 中渲染 attrs, 默认渲染;
    inheritAttrs: false,
    components: {
      Group, Cell, Demo2,
    },
    props: {
      name: String,
      title: String,
    },
    created() {
      console.log(this)
      // console.log(this.$props)
      // console.log(this.$attrs)
    },
    render(h) {
      return (
        <div>
          <group title="demo1: props">
            <cell title={this.name} />
            <cell title={this.title} />
          </group>
          <group title="dem1: $attrs, 不包含class, style, props">
            <cell title={this.$attrs.sex} />
            <cell title={this.$attrs.age} />
            <cell title={this.$attrs.desc} />
          </group>
          // demo2
          <demo2
            name="demo2: name"
            title="demo2: title"
            // 在 template 模板中，通过 v-bind={} 绑定对象传递
            // { ...this.$attrs }
            {...{ attrs: this.$attrs }}
          />
        </div>
      )
    },
  }
</script>
