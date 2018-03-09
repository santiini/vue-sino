<template>
  <div class="demos-jsx-index">
    <group title="demos-jsx-index">
      <selector title="当前demo:" placeholder="选择demo" :options="demos" v-model="curDemo"></selector>
    </group>
    <group title="demos">
      <demo1 v-if="curDemo === 1" desc="demo1: html标签" :list="[11,22,33,44,55,66]"  />
      <demo2 v-if="curDemo === 2" />
      <demo3 v-if="curDemo === 3" @checkItem="getCheckItems" @on-click-cell="clickGroupHandler" />
      <demo4 v-if="curDemo === 4">
        <cell slot="header" title="自定义的header"></cell>
        <cell slot="footer" title="自定义的footer"></cell>
        <cell slot="title" slot-scope="props" :title="`age: ${props.age}`">
          <div slot="value">{{props.name}}</div>
          <div slot="inline-desc" v-if="props.list">
            <div v-for="(item,i) of props.list" :key="i">{{item}}</div>
          </div>
        </cell>
      </demo4>
      <demo5
        v-if="curDemo === 5"
        name="props: name"
        title="props: title"
        :age="18"
        home="LuoYang"
      />
    </group>
  </div>
</template>

<script>
  import { Group, Cell, XButton, Selector } from 'vux'

  import { Demo1, Demo2 } from './demo1'
  import Demo3 from './demo3'
  import Demo4 from './demo4'
  import Demo5 from './demo5'

  export default {
    name: 'demos-jsx-index',
    components: {
      Group, Cell, XButton, Demo1, Demo2, Selector, Demo3, Demo4, Demo5,
    },
    methods: {
      getCheckItems(item) {
        console.log(`当前选中: ${item}`)
      },
      clickGroupHandler() {
        console.log('demo3的点击group事件')
      },
    },
    data() {
      return {
        demos: [
          { value: 'html元素', key: 1 },
          { value: '组件', key: 2 },
          { value: '事件', key: 3 },
          { value: 'slot的使用', key: 4 },
          { value: 'props,attrs', key: 5 },
        ],
        curDemo: 5,
      }
    },
  }
</script>

<style>
  .demo2-class {
    color: red;
    padding: 5px 10px;
  }
</style>

