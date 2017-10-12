<template>
  <div class="">
    <ztree-vue ref="departmentTree" :setting="ztreeSettings" :data="ztreeData"></ztree-vue>
  </div>
</template>

<script>
/* eslint-disable */
import ZtreeVue from '@/components/Ztree'

// 组件内变量的声明;
// 1. ztree配置项：
const ztreeSettings = {
  // 数据配置;
  data: {
    // 主键
    key: { title: 'name' },
    // 数据关系;
    simpleData: {
      enable: true,
      idKey: 'id',
      pIdKey: 'pId',
      //  rootPId: 0
    }
  },
  // checkbox
  check: {
    enable: true,
    chkStyle: 'checkbox',
    chkboxType: { "Y": "ps", "N": "ps" }
  },
  // 视图配置;
  view: {
    dblClickExpand: false,
    selectedMulti: false, //设置是否能够同时选中多个节点
    showIcon: false, //设置是否显示节点图标
    showLine: true, //设置是否显示节点与节点之间的连线
    showTitle: false, //设置是否显示节点的title提示信息
  },
  // 回调;
  callback: {}
};
// 2. ztree数据列表;
const ztreeData = [
  { id: 1, pId: 0, name: "普通的父节点", t: "我很普通，随便点我吧", open: true },
  { id: 11, pId: 1, name: "叶子节点 - 1", t: "我很普通，随便点我吧" },
  { id: 12, pId: 1, name: "叶子节点 - 2", t: "我很普通，随便点我吧" },
  { id: 13, pId: 1, name: "叶子节点 - 3", t: "我很普通，随便点我吧" },
  { id: 2, pId: 0, name: "NB的父节点", t: "点我可以，但是不能点我的子节点，有本事点一个你试试看？", open: true },
  { id: 21, pId: 2, name: "叶子节点2 - 1", t: "你哪个单位的？敢随便点我？小心点儿..", click: false },
  { id: 22, pId: 2, name: "叶子节点2 - 2", t: "我有老爸罩着呢，点击我的小心点儿..", click: false },
  { id: 23, pId: 2, name: "叶子节点2 - 3", t: "好歹我也是个领导，别普通群众就来点击我..", click: false },
  { id: 3, pId: 0, name: "郁闷的父节点", t: "别点我，我好害怕...我的子节点随便点吧...", open: true, click: false },
  { id: 31, pId: 3, name: "叶子节点3 - 1", t: "唉，随便点我吧" },
  { id: 32, pId: 3, name: "叶子节点3 - 2", t: "唉，随便点我吧" },
  { id: 33, pId: 3, name: "叶子节点3 - 3", t: "唉，随便点我吧" }
];

export default {
  name: 'vue-ztree-demo',
  components: {
    ZtreeVue
  },
  data() {
    return {
      ztreeSettings: ztreeSettings,   // ztree.js 配置项
      ztreeData: ztreeData,  // ztree数据项;
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>

