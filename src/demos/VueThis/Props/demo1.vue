<template>
  <div class="demo-vue-api-props-demo1">
    <group title="$props的使用">
      <cell :title="headerTitle"></cell>
      <x-input v-bind="$props"></x-input>
      <cell :title="footerTitle"></cell>
    </group>
  </div>
</template>

<script>
  import { Group, Cell, XInput } from 'vux'

  // tips: 重新审视 Vue-Api, Vnode 对象的属性:
  // 1. v-bind 传递对象，比如通过 $props 将父组件的 props 一起传给子组件
  // 2. $attrs dom 元素的属性
  // 3. $listeners 绑定时间监听
  // 4. $props 绑定
  // 5. $slots

  // console.log(XInput); // XInput 组件的渲染配置项: options(data, props, methods, mixins, hooks...)

  export default {
    name: 'vue-this-props-demo1',
    components: {
      Group, Cell, XInput,
    },
    props: {
      headerTitle: {
        type: String,
        default: '默认header',
      },
      footerTitle: {
        type: String,
        default: '默认的header',
      },
      // tips: 把 XInput 的 props 都在父组件的 props 对应起来, 类似于 reactJS 中的 {...props}
      ...XInput.props,
    },
    created() {
      // VueComponent 对象的各项属性说明:
      console.log(this)
    },
  }
</script>
