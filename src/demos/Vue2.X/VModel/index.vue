<template lang="pug">
  .demo-vue-v-model
    group(title="v-model的新用法")
    group(title="demo1: checked 替换默认的 value, change 替换 input")
      cell(title="v-model值") {{name}}
      cell(title="value值") {{address}}
      x-button(@click.native="testDemo1") demo1-父组件
    //- checked 作为 v-model 的 prop, value 作为正常的 props 使用
    child-com(v-model="name" :value="address")
    group(title="demo2: typelist的测试")
      cell(title="typeValue") {{typeValue}}
    typelist(v-model="typeValue")
    group(title="demo2: 操作")
      x-button(@click.native="setValue1") setValue1
      x-button(@click.native="setValue2") setValue2
    //- tips: model和sync 不能配合使用
    //- group(title="demo3: model和sync 不能配合使用")
    //-   cell(title="typeSyncVal") {{typeSyncVal}}
    //- typelist-sync(v-model="typeSyncVal")
    //- group(title="demo3: 操作")
    //-   x-button(@click.native="setValue3") setValue3
    //-   x-button(@click.native="setValue4") setValue4
</template>

<script>
  import { Group, Cell, XButton } from 'vux'
  import ChildCom from './Child'
  import Typelist from './TypeList'
  import TypelistSync from './TypeListSync.vue'

  export default {
    name: 'vue-v-model',
    components: {
      Group, ChildCom, Cell, Typelist, XButton, TypelistSync,
    },
    methods: {
      testDemo1() {
        this.name = 566566
      },
      setValue1() {
        this.typeValue = {
          type: 3,
          value: true,
        }
      },
      setValue3() {
        this.typeSyncVal = {
          type: 3,
          value: true,
        }
      },
      setValue2() {
        this.typeValue = {
          type: 2,
          value: '2017-11-11',
          // type: 1,
          // value: 'santiiny',
        }
      },
      setValue4() {
        this.typeSyncVal = {
          type: 2,
          value: '2017-11-11',
          // type: 1,
          // value: 'santiiny',
        }
      },
    },
    data() {
      return {
        name: 11,
        address: '北京',
        typeValue: {
          // type: 1,
          // value: undefined,
        },
        typeSyncVal: {},
      }
    },
  }
</script>

