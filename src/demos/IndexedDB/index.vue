<template lang="pug">
  .demo-indexedDB
    //- list列表
    group(title="indexedDB的数据")
      template(v-if="list")
        cell(v-for="(item,i) of list" :key="i" :title="item.name" @click.native="chooseFriend(item)") {{item.age}}
          .item-desc(slot="inline-desc") id:{{item.id}}
    //- form填写
    group(title="form表单")
      cell(title="唯一不可修改id" :value="friend.id")
      x-input(title="姓名" placeholder="输入name" v-model="friend.name")
      x-number(title="年龄" placeholder="输入age" v-model="friend.age")
    .btn-box
      x-button(type="primary") 保存
    //- indexedDB的操作
    group(title="indexedDB的增删改查")
      .btn-box
        x-button(@click.native="addData") addData
        x-button(@click.native="putData") pushData
      .btn-group
        x-button 修改
        x-button 修改
</template>

<script>
  import { Group, Cell, XButton, XInput, XNumber } from 'vux'

  export default {
    name: 'indexedDB',
    components: {
      Group, Cell, XButton, XInput, XNumber,
    },
    methods: {
      // idnexedDB的方法测试;
      chooseFriend(friend) {
        this.friend = friend
      },
      addData() {
        console.log('添加')
        // this.$idb.toPromise('students', 'add', {id: 10001, name: '小涛', age: 27})
        //   .then(result => {
        //     console.log(result)
        //   })
        //   .catch(err => console.log(err))

        // const result = this.$db.friends.add({ name: this.name, age: this.age})
        // console.log(result)

        // 非事务形式：
        this.$db.friends.add({ name: this.name, age: this.age })
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
      // 添加大量--数组;
      addArray() {
        this.$db.friends.bulkAdd(this.students)
          .then(result => console.log(result))
          .catch(err => console.log(err))
      },
      // 更新操作， 存在则更新，不存在则新建;
      // tips: db.objectStore.bulkPut([...args]), 批量操作;
      putData() {
        this.$db.friends.put({
          id: 24, name: 'put14', age: 21,
        })
        .then(result => console.log(result))
        .catch(err => console.log(err))
      },
      // 删除
      // db.friends.bulkDelete([1,2,4]) -- 批量删除id
      deleteData() {
        this.$db.friends.delete(4)
          .then((result) => {
            console.log(result)
          })
          .catch(err => console.log(err))
      },
      // 修改
      updateData() {
        // Equivalent to Table.where(":id").equals(key).modify(changes);
        this.$db.friends.update(1, { name: '白改' })
          .then((result) => {
            console.log(result)
          })
          .catch(err => console.log(err))
      },
      where() {
        // equalsIgnoreCase 比较字符串;
        this.$db.friends.where('name').equalsIgnoreCase('yin')
        // this.$db.friends.where('id').equalsIgnoreCase(4)  // 不能这样用;
          // 形式一：转化为数组;
          .toArray()
          // 形式二: 遍历结果;
          // .each(friend => {
          //   // 单个或者多个;
          //   console.log(friend)
          // })
          .then(result => console.log(result))
          .catch(err => console.log(err))
      },
      whereByKey() {
        // table.where(indexOrPrimKey).equals(key)
        this.$db.friends.where('id').equals(10)
          .toArray()
          .then(result => console.log(result))
          .catch(err => console.log(err))
      },
      // 批量查找操作;
      whereData() {
        this.$db.friends.where('age').between(15, 19)
          .modify({ name: '少年' })
          // 修改的数量 -- 没有修改则为0;
          .then(result => console.log(result))
          .catch(err => console.log(err))
      },
      // 获取Array形式;
      getAll() {
        // const friends = this.$db.friends.where('age').equalsIgnoreCase('david');
        // console.log(friends)

        // 获取b开头的friends -- each()
        // this.$db.friends.where('name').startsWithIgnoreCase('b').toArray(function(friends) {
        //     console.log(friends)
        //     console.log("Found: " + friends.length + " friends starting with d");
        // });

        // 获取所有数据的数组形式 -- toArray();
        this.$db.friends.toArray((friends) => {
          console.log(friends)
        })
      },
      getLimit() {
        // offset/limit
        this.$db.friends.where('age').above(12).offset(1).limit(1)
            .toArray((friends) => {
              console.log(friends)
            })
      },

    },
    created() {
      this.$store.dispatch('setHeader', {
        title: 'indexedDB',
      })
      // indexedDB的操作;
      console.log(this.$db.friends)
    },
    data() {
      return {
        students: [
          { name: '小涛2', age: 24 },
          { name: '小白2', age: 21 },
          { name: '小红2', age: 15 },
        ],
        friend: {
          id: '',
          name: '',
          age: 10,
        },
        list: [
          { id: 1, name: '小涛1', age: 24 },
          { id: 2, name: '小白1', age: 21 },
          { id: 3, name: '小红1', age: 15 },
        ],
      }
    },
  }
</script>

<style lang="stylus" scoped>

</style>

