<template>
  <div class="">
    <group title="indexedDB">
      <x-input placeholder="name" v-model="name"></x-input>
     </group>
    <group>
        <x-number  title="age" v-model="age" :min="10" :max="100"></x-number>
    </group>
    <group>
      <x-button @click.native="addData">addData</x-button>
      <x-button @click.native="addData2">addData222</x-button>
      <x-button @click.native="addArray">addArray</x-button>
      <x-button @click.native="putData">putData</x-button>
      <x-button @click.native="deleteData">deleteData</x-button>
      <x-button @click.native="deleteData">deleteData</x-button>
      <x-button @click.native="updateData">updateData</x-button>
      <x-button @click.native="where">where</x-button>
      <x-button @click.native="whereByKey">whereByKey</x-button>
      <x-button @click.native="whereData">whereData</x-button>
      <x-button @click.native="getAll">getAll</x-button>
      <x-button @click.native="getLimit">getLimit</x-button>
    </group>
  </div>
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
        name: '',
        age: 10,
      }
    },
  }
</script>

<style lang="stylus" scoped>

</style>

