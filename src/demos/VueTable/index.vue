<template lang="pug">
  .demo-vue-table
    vue-table
    //- vue-table.table-container(:tdata="tableData" :tcolumns="tableColumns"
      //- :showHandle="true" :tdHeight="40" @clickItem="tableSelectItem")
      //- template(slot="operations" scope="scope")
      //-   span(@click="edit(scope.item)") 编辑
      //-   span(@click="edit(scope.item)") 删除
      //-   span(@click="edit(scope.item)") 禁用
</template>

<script>
  // tip: 参考链接：https://github.com/naihe138/vue-table, https://juejin.im/entry/59cca58cf265da06710dc9a5
  import vueTable from 'vue-table2'

  export default {
    name: 'vue-table',
    components: {
      vueTable,
    },
    methods: {
      tableSelectItem(item) {
        console.log(item)
      },
      edit(item) {
        console.log(item)
      },
    },
    data() {
      return {
        tableData: [
          { number: 11, name: '小学馆', type: 'cartoo', brand: 'hot' },
          { number: 22, name: 'A1', type: 'games', brand: 'popular' },
          { number: 33, name: 'V社', type: 'games', brand: 'popular' },
        ],
        tableColumns: [
          {
            title: '机构编号',
            key: 'number',
            width: 85,
            textAlign: 'left',
          },
          {
            title: '机构名称',
            key: 'name',
            width: 292,
            textAlign: 'left',
            textLine: 2,
            selectText: true,
          },
          {
            title: '类型',
            key: 'type',
            width: 180,
            textAlign: 'center',
          },
          {
            title: '状态',
            key: 'brand',
            width: 82,
            textAlign: 'center',
          },
        ],
      }
    },
  }
</script>

