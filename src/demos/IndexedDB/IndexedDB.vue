<template lang="pug">
  .demo-indexedDB
    //- list列表
    group(title="indexedDB的数据")
      //- 1. 形式一：只有cell的list
      //- template(v-if="list")
      //-   cell(v-for="(item,i) of list" :key="i" :title="item.name" @click.native="chooseFriend(item)") {{item.age}}
      //-     .item-desc(slot="inline-desc") id:{{item.id}}
      //- 2. 形式二: swipeout形式的cell的list
      swipeout(v-if="list")
        swipeout-item(v-for="(item,i) of list" :key="i")
          .slot-right(slot="right-menu")
            swipeout-button(type="primary" @click.native="chooseFriend(item)") 修改
            swipeout-button(type="warn" @click.native="deleteFriend(item)") 删除
          //- .slot-content(slot="content" :class="{'vux-1px-b': i !== list.length - 1, 'vux-1px-t': i === 0 }")
          .slot-content(slot="content" :class="{'vux-1px-b': i !== list.length - 1, 'vux-1px-t': i !== 0 }")
            cell(:title="item.name" @click.native="chooseFriend(item)" :inline-desc="`id: ${item.id}`")
              .item-desc(slot="inline-desc") id:{{item.id}}
    //- form填写
    group(title="form表单")
      cell(title="唯一不可修改id" :value="friend.id")
      x-input(title="姓名" placeholder="输入name" v-model.trim="friend.name")
      x-number(title="年龄" placeholder="输入age" v-model.trim="friend.age")
    .btn-box
      x-button(type="primary" @click.native="saveFriends") 保存
      x-button(type="warn" @click.native="resetForm") 清空
    .btn-box
      x-button(type="primary" @click.native="saveToList") 添加到保存列表
    //- indexedDB的操作
    swipeout
      swipeout-item(v-for="(item,i) of toAddArrayData" :key="i")
        .slot-right(slot="right-menu")
          swipeout-button(type="primary" @click.native="editToAdd(item)") 修改
          swipeout-button(type="warn" @click.native="deleteToAdd(item)") 删除
        .slot-content(slot="content" :class="{'vux-1px-b': i !== toAddArrayData.length - 1, 'vux-1px-t': i === 0 }")
          cell(:title="item.name")
    .btn-box
      x-button(@click.native="addArrayData" type="primary") 批量添加
    checklist(title="2.批量删除" :options="operateList" v-model="chosenArray")
    .btn-box
      x-button(@click.native="deleteArray" type="warn") 批量删除
    group(title="indexedDB的增删改查")
      //- 按钮组合一： 横向排列的按钮组合
      .btn-box
        x-button(@click.native="addData") addData
        x-button(@click.native="putData") pushData
      //- 按钮组合二： 纵向排列的组合
      .btn-group
        x-button 修改
        x-button 修改
        .btn-box
          x-button addData
          x-button pushData
</template>

<script>
  import { Group, Cell, XButton, XInput, XNumber, Swipeout, SwipeoutItem, SwipeoutButton, Checklist } from 'vux'

  export default {
    name: 'indexedDB',
    components: {
      Group, Cell, XButton, XInput, XNumber, Swipeout, SwipeoutItem, SwipeoutButton, Checklist,
    },
    computed: {
      operateList() {
        if (!this.list) return []
        return this.list.map(el => Object.assign({ key: el.id, value: el.name }, el))
      },
      // toAddList() {
      //   if (!this.toAddArrayData || this.toAddArrayData.length < 1) return []
      //   return this.toAddArrayData.map(el => el.name)
      // },
    },
    methods: {
      // idnexedDB的方法测试;
      chooseFriend(friend) {
        // 数据的深度clone
        // this.friend = friend
        this.friend = Object.assign({}, friend)
      },
      addData() {
        console.log('添加')
        // 非事务形式：
        this.$db.friends.add(this.friend)
          .then((result) => {
            // 新添加项id;
            console.log(result)
          })
          .catch((err) => {
            console.lo(err)
          })
      },
      addData2() {
        this.$db.transaction('rw', this.$db.friends, (storeState) => {
          // console.log(e)   -- this.$db.friends
          // 添加数组形式的值;
          // console.log(this)  // vue实例
          this.students.forEach((item) => {
            storeState.add(item)
          })
        })
        .catch(err => console.log(err))
      },
      // 添加到待保存列表
      saveToList() {
        if (this.friend.id) {
          return this.$vux.toast.show({
            text: '该记录已存在，只能修改',
            type: 'warn',
            time: 1500,
            isShowMask: true,
          })
        }
        if (this.friend.name === '') {
          return this.$vux.toast.show({
            text: '名称不能为空',
            type: 'warn',
            time: 1500,
            isShowMask: true,
          })
        }
        // 用数组长度作为唯一索引，指向特性数据;
        const filters = this.toAddArrayData.filter(item => item.index === this.friend.index)
        if (filters.length > 0) {
          // 测试：利用引用类型的特性改变 -- 并不能行;
          // filters[0] = Object.assign({}, this.friend)
          // tips: VueJS中不能检测到的数组变化：
          // 1. vm.items[indexOfItem] = newValue 2. vm.items.length = newLength
          // this.toAddArrayData[this.friend.index] = Object.assign({}, this.friend)
          this.toAddArrayData.splice(this.friend.index, 1, this.friend)
        } else {
          // Object.clone 使数据避免引用产生的问题;
          this.toAddArrayData.push(Object.assign({ index: this.toAddArrayData.length }, this.friend))
        }
      },
      // 修改待保存列表
      editToAdd(item) {
        this.friend = Object.assign({}, item)
      },
      // 删除待保存项
      deleteToAdd(item) {
        this.toAddArrayData = this.toAddArrayData.filter(el => el.name !== item.name)
      },
      // 初始化indexedDB中的数据
      async initIndexedDB() {
        try {
          const friends = await this.$DB.getAll('friends')
          console.log(friends)
          if (friends.data.list.length < 1) {
            await this.$DB.addList('friends', this.listData)
            const data = await this.$DB.getAll('friends')
            this.list = data.data.list
          } else {
            this.list = friends.data.list
          }
        } catch (err) {
          console.log(err)
          this.$vux.toast.show({
            type: 'warn',
            text: 'indexedDB初始化失败',
          })
        }
      },
      // 保存修改内容或添加新内容
      async saveFriends() {
        if (this.friend.name === '') {
          return this.$vux.toast.show({
            type: 'warn',
            text: '请输入姓名',
            isShowMask: true,
            time: 1500,
          })
        }
        try {
          let msg
          const { id, ...data } = this.friend
          // this.$DB.addOne('friends', this.friend)
          // this.$DB.addOne('friends', { name: '小花2', age: 22 })
          // this.$DB.addOne('friends', { id: 5, name: '小花2', age: 22 })
          if (id) {
            // 修改
            msg = '修改成功'
            await this.$DB.updateOne('friends', this.friend.id, data)
          } else {
            msg = '添加成功'
            await this.$DB.addOne('friends', data)
          }
          await this.initIndexedDB()
          this.$vux.toast.show({
            text: msg,
            isShowMask: true,
            time: 1500,
          })
        } catch (err) {
          console.log(err)
        }
      },
      // 删除friend
      async deleteFriend(friend) {
        try {
          await this.$DB.deleteOne('friends', friend.id)
          this.$vux.toast.show('删除成功！')
          await this.initIndexedDB()
        } catch (err) {
          console.log(err)
        }
      },
      // 批量删除
      async deleteArray() {
        try {
          await this.$DB.bulkDelete('friends', this.chosenArray)
          this.$vux.toast.show({
            text: '批量删除成功',
            type: 'success',
            isShowMask: true,
            time: 1500,
          })
          const result = await this.$DB.getAll('friends')
          this.list = result.data.list
        } catch (err) {
          console.log(err)
        }
      },
      // 批量添加
      async addArrayData() {
        try {
          const data = this.toAddArrayData.map(el => Object.assign({ name: el.name, age: el.age }))
          await this.$DB.addList('friends', data)
          const result = await this.$DB.getAll('friends')
          this.list = result.data.list
          this.$vux.toast.show({
            type: 'success',
            text: '批量添加成功',
            isShowMask: true,
            time: 1500,
          })
        } catch (err) {
          console.log(err)
        }
      },
      // 初始化表格数据
      resetForm() {
        this.friend = {
          id: undefined,
          name: '',
          age: 0,
        }
      },
    },
    created() {
      this.$store.dispatch('setHeader', {
        title: 'indexedDB',
      })
      // indexedDB的操作;
      // console.log(this.$db.friends)
      this.initIndexedDB()
    },
    data() {
      return {
        students: [
          { name: '小涛2', age: 24 },
          { name: '小白2', age: 21 },
          { name: '小红2', age: 15 },
        ],
        friend: {
          id: undefined,  // id自增长
          name: '',
          age: 10,
        },
        listData: [
          { name: '小涛1', age: 24 },
          { name: '小白1', age: 21 },
          { name: '小红1', age: 15 },
          // { id: 1, name: '小涛1', age: 24 },
          // { id: 2, name: '小白1', age: 21 },
          // { id: 3, name: '小红1', age: 15 },
        ],
        list: undefined,
        // toAddList: [], // 待添加的数组形式的数据
        chosenArray: [], // 要删除的数组形式的数据ids
        toAddArray: [], // 待添加的数组形式的数据的选中项的值
        toAddArrayData: [], // 待添加的数据内容
      }
    },
  }
</script>

<style lang="stylus" scoped>

</style>

