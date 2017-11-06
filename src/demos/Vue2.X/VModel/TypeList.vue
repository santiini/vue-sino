<template lang="pug">
  .demo-vue-model-typelist
    group(:title="`typeList的测试: type-${type}`")
      radio(title="type的值" :options="types" v-model="type" @on-change="changeType")
    group(title="value的值各种类型")
      x-input(title="type-1" @on-change="changeInput" v-model="inputValue")
      datetime(title="日期选择" @on-change="changeDate" v-model="datetimeValue")
      x-switch(title="开关" @on-change="changeSwitch" v-model="switchValue")
</template>

<script>
  import { Group, Cell, Radio, XInput, Datetime, XSwitch } from 'vux'

  export default {
    name: 'demo-model-typelist',
    // v-model 的配置项
    model: {
      prop: 'typeVal',
      event: 'changeVal',
    },
    components: {
      Group, Cell, Radio, XInput, Datetime, XSwitch,
    },
    props: {
      typeVal: {
        type: Object,
        value: () => {},
      },
    },
    watch: {
      typeVal: {
        immediate: true,
        deep: true,
        handler(newVal, oldVal) {
          console.log('传入值')
          if (newVal === oldVal) return
          console.log('传入值变化了')
          if (!newVal.type && !newVal.value) {
            this.type = ''
            this.inputValue = ''
            this.datetimeValue = ''
            this.switchValue = false
            return
          }
          const { type, value } = newVal
          if (type === 1) {
            this.type = 1
            this.inputValue = value
          }
          if (type === 2) {
            this.type = 2
            this.datetimeValue = value
          }
          if (type === 3) {
            this.type = 3
            this.switchValue = typeof value === 'boolean' ? value : false
          }
          // 传入值的初始化
        },
      },
    },
    methods: {
      // typ1: 1
      changeInput(val) {
        console.log(1111)
        if (this.type !== 1) return
        this.$emit('changeVal', {
          type: this.type,
          value: val,
        })
      },
      // type: 2
      changeDate(val) {
        console.log(2222)
        if (this.type !== 2) return
        this.$emit('changeVal', {
          type: this.type,
          value: val,
        })
      },
      // type: 3
      changeSwitch(val) {
        console.log(3333)
        if (this.type !== 3) return
        this.$emit('changeVal', {
          type: this.type,
          value: val,
        })
      },
      changeType(type) {
        const defaultVal = (type === 1 && this.inputValue)
          || (type === 2 && this.datetimeValue)
          || (type === 3 && this.switchValue)
          || ''
        console.log(`type变化:${type}`)
        console.log(`value值:${defaultVal}`)
        let value = defaultVal
        if (type === 3) {
          value = typeof value === 'boolean' ? value : false
        }
        this.$emit('changeVal', {
          type,
          value,
          // value: this.currentValue,
        })
      },
    },
    data() {
      return {
        types: [
          { key: 1, value: '111' },
          { key: 2, value: '222' },
          { key: 3, value: '333' },
        ],
        type: 1,
        currentValue: '',
        inputValue: '',
        datetimeValue: '',
        switchValue: false,
      }
    },
  }
</script>

