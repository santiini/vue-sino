<template>
  <div class="demos-create-element">
    <group title="create-element-demos">
      <selector title="当前demo:" placeholder="选择demo" :options="demos" v-model="curDemo"></selector>
    </group>
    <group title="demos 展示">
      <!-- slot-scope 作用域插槽的使用：VUe 模板
        tips: 在 template 模板中， template(slot) 作用域插槽非必须，不会报错
       -->
      <demo52 name="slot-name" :list="slotList">
        <!-- 简单通过 slot-scope 获取 slot 的参数 -->
        <template slot="name" slot-scope="props">
          <cell :title="`slot-name获取参数name: ${props.slotName}`"></cell>
        </template>
        <!-- 利用 slot-scope 获取修改列表中 slot 的内容 -->
        <template slot="item" slot-scope="props">
          <cell :title="`slot-item：${props.item.name}`">{{props.item.id}}</cell>
        </template>
      </demo52>
    </group>
  </div>
</template>

<script>
  import { Group, Cell, XButton, Selector } from 'vux'

  import Demo52 from './demo52'

  export default {
    name: 'demos-create-element-index',
    components: {
      Group, Cell, XButton, Selector, Demo52,
    },
    data() {
      return {
        demos: [1, 2, 3, 4, 5, 6, 7, 8],
        curDemo: 5,
        slotList: [
          { id: 0, name: 'list0' },
          { id: 1, name: 'list1' },
          { id: 2, name: 'list2' },
          { id: 3, name: 'list3' },
          { id: 4, name: 'list4' },
        ],
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

