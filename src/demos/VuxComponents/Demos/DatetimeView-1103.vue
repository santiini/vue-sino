<template>
  <div class="datetime-view">
    <div class="weui-cells__title" v-if="title && title !== ''">{{title}}</div>
    <div class="datetime-range">
      <div class="datetime-range__start" :class="{'active': type === 1}" @click="changeStart">
        {{ startTime === '' ? '开始时间' : startTime }}
      </div>
      <div class="datetime-range__link">至</div>
      <div class="datetime-range__end" :class="{'active': type === 2}" @click="changeEnd">
        {{ endTime === '' ? '结束时间' : endTime }}
      </div>
    </div>
    <div class="datetime-view__clear">
      <div class="clear-btn" @click="resetDate">
        <x-icon type="ios-trash" class="icon-clear" size="20"></x-icon>
      </div>
    </div>
    <div class="datetime-view__container" v-show="type !== 0">
      <datetime-view class="vux-1px-b vux-1px-t" v-model="dateValue" ref="datetime" :format="format"></datetime-view>
    </div>
  </div>
</template>

<script>
  import { Group, DatetimeView } from 'vux'
  import formatDate from 'utils/date/format'

  export default {
    name: 'datetime-view-demo',
    components: {
      DatetimeView, Group,
    },
    props: {
      title: String,
      value: {
        type: Array,
        default: () => [],
      },
    },
    watch: {
      // datetime-view 的值
      dateValue(newVal, oldVal) {
        if (this.type === 0) return
        if (this.type === 1) {
          this.startTime = newVal
        }
        if (this.type === 2) {
          this.endTime = newVal
        }
      },
      // 开始时间

      // 结束时间
    },
    methods: {
      // 重置
      resetDate() {
        this.startTime = ''
        this.endTime = ''
        this.type = 0
      },
      // 开始时间
      changeStart() {
        this.type = 1
        this.startTime = this.startTime === ''
          ? formatDate(new Date(), 'YYYY-MM-DD HH:mm') : formatDate(this.startTime, 'YYYY-MM-DD HH:mm')
        this.dateValue = this.startTime
        this.$refs.datetime.render()
      },
      // 结束时间
      changeEnd() {
        this.type = 2
        this.endTime = this.endTime === '' ?
          formatDate(new Date(), 'YYYY-MM-DD HH:mm') : formatDate(this.endTime, 'YYYY-MM-DD HH:mm')
        this.dateValue = this.endTime
        this.$refs.datetime.render()
      },
    },
    data() {
      return {
        startTime: '',
        endTime: '',
        format: 'YYYY-MM-DD HH:mm',
        dateValue: '2017-10-11 12:12',
        type: 0,
      }
    },
  }
</script>

<style lang="scss">
  .datetime-range {
    background-color: #fff;
    display: flex;
    align-items: center;
    &__start, &__end {
      flex: 1;
      text-align: center;
      padding: 10px;
      margin: 0 15px;
      color: #999;
      // font-size: 14px;
      white-space: nowrap;
    }
    .active {
      color: #398aff;
      border-bottom: 1px solid #398aff;
    }
  }
  .datetime-view__container {
    margin: 1px;
    position: relative;
  }
  .datetime-view__clear {
    text-align: right;
    background-color: #fcfcfc;
    .clear-btn {
      padding: 4PX;
    }
    .icon-clear {
      fill: #999;
    }
  }
</style>
