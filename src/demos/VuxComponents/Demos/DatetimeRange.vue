<template>
  <div class="date-change">
    <group title="test">
      <datetime-range title="" start-date="2017-01-01" format="YYYY年MM月DD日" end-date="2017-02-02" v-model="startTime" @on-change="getStartTime"></datetime-range>
    </group>
    <group title="时间选择：daterange"></group>
    <div class="flex-cell">
      <div class="flex-1">
        <datetime-range
          title=""
          start-date="2017-01-01"
          format="YYYY年MM月DD日"
          end-date="2017-02-02"
          placeholder="开始时间"
          v-model="time1"
          @on-change="getStartTime"></datetime-range>
      </div>
      <div class="">至</div>
      <div class="flex-1">
        <datetime-range
          title=""
          start-date="2017-01-01"
          format="YYYY年MM月DD日"
          end-date="2017-02-02"
          placeholder="结束时间"
          v-model="time2"
          @on-change="getStartTime"></datetime-range>
      </div>
    </div>
  </div>
</template>

<script>
  import { Group, DatetimeRange } from 'vux'

  export default {
    name: 'datetime-range-demo',
    components: {
      DatetimeRange, Group,
    },
    methods: {
      getStartTime(timeStr) {
        console.log(timeStr)
      },
    },
    data() {
      return {
        startTime: ['2017-01-15', '03', '05'],
        endTime: ['2017-01-15', '03', '05'],
        endTime1: ['2017-01-15', '03', '05'],
        time1: [],
        time2: [],
      }
    },
  }
</script>

<style lang="scss">
  .flex-cell {
    display: flex;
    align-items: center;
    background-color: #fff;
    .flex-1 {
      flex: 1;
      .vux-popup-picker-select {
        text-align: center !important;
      }
      .weui-cell__ft {
        &:after {
          display: none;
        }
      }
    }
  }
</style>
