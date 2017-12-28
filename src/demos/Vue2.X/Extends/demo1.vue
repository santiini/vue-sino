<template lang="pug">
  .demo-vue-extends
    group(:title="`props名称：${propName}`")
    group(:title="`props类型：${type}`")
    group(:title="title")
      cell(title="demo1")
      cell(:title="`extend-name:${name}`")
</template>

<script>
  import { Group, Cell, XButton } from 'vux'

  import Extend1 from './Extend1'
  import Extend2 from './Extend2'

  const Demo1Extend = {
    name: 'demos-vue2-extends-component-demo1',
    // extends() {
    //   console.log(this.type)
    //   if (this.type === 1) {
    //     return Extend1
    //   }
    //   return Extend2
    //   // return {
    //   //   options
    //   // }
    // },
    extends: Extend1,
    components: {
      Group, Cell, XButton,
    },
    props: {
      propName: String,
      type: Number,
    },
    methods: {

    },
    create() {
      console.log('demo1中，，，');
    },
    data() {
      return {
        title: 'demo1组件',
      }
    },
  };

  // console.log(Demo1Extend)
  // console.log(Demo1Extend.props)
  if (Demo1Extend.props.type === 2) {
    console.log(1111111)
    Demo1Extend.extends = Extend2;
  }

  export default Demo1Extend;
</script>

