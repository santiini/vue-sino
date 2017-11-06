<template lang="pug">
  div.demo-datetime-picker
    date-picker(title="datetime选择" v-model="dateValue" :format="format")
    group(title="测试")
      .btn-group
        x-button(@click.native="test1") format改变
        x-button(@click.native="test2") 赋值1
        x-button(@click.native="test3") 赋值2
</template>

<script>
  import { Group, XButton } from 'vux'
  import DatePicker from '@/components/DatetimeRange/sync'

  export default {
    name: 'demo-datetime-range',
    components: {
      DatePicker, Group, XButton,
    },
    methods: {
      test1() {
        this.format = 'YYYY-MM-DD'
      },
      test2() {
        console.log('赋值测试')
        this.dateValue = ['2017-10-11 12:12', '2017-11-11 20:12']
      },
      test3() {
        console.log('赋值测试')
        this.dateValue = ['2017-09-11 12:12', '2017-10-22 20:12']
      },
    },
    data() {
      return {
        startTime: '',
        endTime: '',
        dateValue: [],
        // dateValue: ['2017-10-11 12:12', '2017-11-11 20:12'],
        format: 'YYYY-MM-DD HH:mm',
      }
    },
  }
</script>

