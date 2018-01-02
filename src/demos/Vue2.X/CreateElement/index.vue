<template>
  <div class="demos-create-element">
    <group title="create-element-demos">
      <selector title="当前demo:" placeholder="选择demo" :options="demos" v-model="curDemo"></selector>
    </group>
    <group title="demos 展示">
      <demo1 v-if="curDemo === 1" />
      <demo2 v-if="curDemo === 2" />
      <demo3
        v-if="curDemo === 3"
        name="demo3-name"
        :age="18"
        :list="[1,2,3,4,5]"
      />
      <!-- this.$slots 的使用 -->
      <demo4 v-if="curDemo === 4" name="demo4">
        <!-- <cell title="组件header" slot="header">77777777</cell> -->
        <cell title="组件的核心部分：自定义" value="可配置" inline-desc="其他描述"></cell>
        <cell title="组件footer" slot="footer">333333333</cell>
      </demo4>
      <!-- $scopedSlots 作用域插槽在 createElement 函数的使用: -->
      <demo5 name="slot参数" v-if="curDemo === 5" >
        <template slot="default" slot-scope="scope">
          <cell title="default-slot部分" value="测试填充slot"></cell>
        </template>
        <template slot="title" slot-scope="title">
          <cell :title="`title-slot: ${title.msg}`"></cell>
        </template>
      </demo5>
      <!-- slot-scope 作用域插槽的使用：VUe 模板
        tips: 在 template 模板中， template(slot) 作用域插槽非必须，不会报错
       -->
       <group title="作用域插槽">
         <demo51 v-if="curDemo === 51">
           <template slot="default" slot-scope="scope">
            <div>取代默认的slot</div>
           </template>
           <template slot="title" slot-scope="scope">
            <div>取代默认的title-slot, 参数为: {{scope.info}}</div>
           </template>
         </demo51>
       </group>
      <demo52 name="slot-name" :list="slotList" v-if="curDemo === 6" >
        <!-- 简单通过 slot-scope 获取 slot 的参数 -->
        <template slot="name" slot-scope="props">
          <cell :title="`slot-name获取参数name: ${props.slotName}`"></cell>
        </template>
        <!-- 利用 slot-scope 获取修改列表中 slot 的内容 -->
        <template slot="item" slot-scope="props">
          <cell :title="`slot-item：${props.item.name}`">{{props.item.id}}</cell>
        </template>
      </demo52>
      <!-- 默认的插件作用域：scope-slot -->
    </group>
    <group :title="`modelVal: ${modelVal}`">
      <!-- @input 对 v-model 的监听 -->
      <demo511 v-if="curDemo === 7" :list="createList" :value="modelVal" @input="modelVal = $event"></demo511>
    </group>
    <!-- 函数式组件 -->
    <demo53 name="santiiny" :age="28" home="luoyang" v-if="curDemo === 8">
      <div slot="header">简单的header</div>
    </demo53>
  </div>
</template>

<script>
  import { Group, Cell, XButton, Selector } from 'vux'

  import { Demo1, Demo2, Demo3 } from './demo1'
  import Demo4 from './demo4'
  import Demo5 from './demo5'
  import Demo52 from './demo52'
  import Demo51 from './demo51'
  import Demo511 from './demo511'
  import Demo53 from './demo53'

  export default {
    name: 'demos-create-element-index',
    components: {
      Group,
      Cell,
      XButton,
      Demo1,
      Demo2,
      Demo3,
      Selector,
      Demo4,
      Demo5,
      Demo52,
      Demo51,
      Demo511,
      Demo53,
    },
    data() {
      return {
        // demos: [1, 2, 3, 4, 5, 52, 51, 511, 53],
        demos: [
          { value: '简单html标签', key: 1 },
          { value: 'html标签改变css', key: 2 },
          { value: '组件渲染', key: 3 },
          { value: '渲染子组件的slot', key: 4 },
          { value: '父组件的scoped-slot', key: 5 },
          { value: '作用域插槽scope-slot: 模板', key: 6 },
          { value: '作用域插槽scope-slot: js', key: 51 },
          { value: '默认的slot、js编程', key: 7 },
          { value: '函数式组件', key: 8 },
        ],
        curDemo: 8,
        slotList: [
          { id: 0, name: 'list0' },
          { id: 1, name: 'list1' },
          { id: 2, name: 'list2' },
          { id: 3, name: 'list3' },
          { id: 4, name: 'list4' },
        ],
        createList: [
          { id: 0, name: 'list0', desc: 'desc0' },
          { id: 1, name: 'list1', desc: 'desc1' },
          { id: 2, name: 'list2', desc: 'desc2' },
          { id: 3, name: 'list3', desc: 'desc3' },
          { id: 4, name: 'list4', desc: 'desc4' },
        ],
        modelVal: '444444',
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

