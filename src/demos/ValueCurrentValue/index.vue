<template>
  <div class="type-list">
    <el-row v-for="(item,i) of typeArray" :key="i" :class="{ 'el-row-top': i !== 0 }">
      <el-radio class="radio-label" :label="item.type" :value="item.value" v-model="listType">{{item.label}}</el-radio>
      <template v-if="i === 0">
        <slot name="slot-type0"></slot>
      </template>
      <template v-if="i === 1">
        <el-select @change="getWeekDate" v-model="weekDate" :disabled="listType !== 1">
          <el-option v-for="(item,i) of weekday" :key="i" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </template>
      <template v-if="i === 2">
        <el-date-picker ref="month" :editable="false" v-model="monthDate" @change="getMonthDate" :disabled="listType !== 2" type="date" placeholder="开始时间" format="dd"></el-date-picker>
      </template>
      <template v-if="i === 3">
        <el-date-picker ref="season" :editable="false" v-model="seasonDate" @change="getSeasonDate" :disabled="listType !== 3" type="date" placeholder="开始时间" format="MM-dd"></el-date-picker>
      </template>
      <template v-if="i === 4">
        <el-date-picker ref="year" :editable="false" v-model="yearDate" @change="getYearDate" :disabled="listType !== 4" type="date" placeholder="开始时间" format="MM-dd"></el-date-picker>
      </template>
    </el-row>
  </div>
</template>

<script>
// tips: 双向绑定的 props和watch
export default {
  name: 'type-value-choose',
  props: {
    typeList: {
      type: Array,
      default: () => [],
    },
    type: [String, Number],
    typeValue: {
      type: String,
      default: 'day',
    },
  },
  watch: {
    listType(newVal, oldVal) {
      const typeValue = (newVal === 0 && 'day') || (newVal === 1 && this.weekCheck) || (newVal === 2 && this.monthCheck)
        || (newVal === 3 && this.seasonCheck) || (newVal === 4 && this.yearCheck) || ''
      this.$emit('type-change', newVal)
      this.$emit('type-value-change', typeValue)
    },
    type(newVal, oldVal) {
      if (newVal === oldVal || !newVal) return
      this.listType = newVal || 0
    },
    typeValue: {
      immediate: true,
      /* eslint-disable space-before-function-paren,object-shorthand */
      handler: function(newVal, oldVal) {
        if (newVal === oldVal) return
        this.currentValue = newVal
        if (this.listType === 1) {
          this.weekCheck = newVal
          this.weekDate = newVal
        }
        if (this.listType === 2) {
          this.monthCheck = newVal
          this.monthDate = this.getEleDate(newVal, this.listType)
        }
        if (this.listType === 3) {
          this.seasonCheck = newVal
          this.seasonDate = this.getEleDate(newVal, this.listType)
        }
        if (this.listType === 4) {
          this.yearCheck = newVal
          this.yearDate = this.getEleDate(newVal, this.listType)
        }
      },
    },
    currentValue(newVal, oldVal) {
      // if (!newVal || newVal === '') return
      this.$emit('type-value-change', newVal)
    },
  },
  methods: {
    getWeekDate(value) {
      this.weekCheck = value
      if (!value || value === '') return
      this.currentValue = value
    },
    getMonthDate(value) {
      this.monthCheck = value
      if (!value || value === '') return
      this.currentValue = value
    },
    getSeasonDate(value) {
      this.seasonCheck = value
      if (!value || value === '') return
      this.currentValue = value
    },
    getYearDate(value) {
      this.yearCheck = value
      if (!value || value === '') return
      this.currentValue = value
    },
    // 根据不同type获取不同的时间;
    getEleDate(date, type) {  // type: 0--时分; 1--周; 2--月检; 3--季; 4-- 年;
      if (date === undefined) return undefined
      if (date === '') return ''
      const year = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      let day = new Date().getDate()
      let hour = new Date().getHours()
      let minute = new Date().getMinutes()
      if (type === 0) {
        const dateData = date.split(':')
        hour = dateData[0]
        minute = dateData[1]
      }
      if (type === 2) {
        day = date
      }
      if (type === 3 || type === 4) {
        const dateData = date.split('-')
        month = dateData[0] - 1
        day = dateData[1]
      }
      return new Date(year, month, day, hour, minute)
    },
    // 重置check 数据
    resetCheckValue(type, typeValue) {
      this.listType = type
      this.currentValue = typeValue
      this.weekCheck = undefined
      this.monthCheck = undefined
      this.seasonCheck = undefined
      this.yearCheck = undefined
      this.weekDate = undefined
      this.monthDate = undefined
      this.seasonDate = undefined
      this.yearDate = undefined
      if (this.listType === 0) {
        this.$emit('type-value-change', 'day')
      }
      if (this.listType === 1) {
        this.weekCheck = this.typeValue
        this.weekDate = this.typeValue
      }
      if (this.listType === 2) {
        this.monthCheck = this.typeValue
        this.monthDate = this.getEleDate(this.typeValue, this.listType)
      }
      if (this.listType === 3) {
        this.seasonCheck = this.typeValue
        this.seasonDate = this.getEleDate(this.typeValue, this.listType)
      }
      if (this.listType === 4) {
        this.yearCheck = this.typeValue
        this.yearDate = this.getEleDate(this.typeValue, this.listType)
      }
    },
  },
  mounted() {
  },
  data() {
    return {
      typeArray: [
        { type: 0, vaule: 'day', label: '日检' },
        { type: 1, vaule: '', label: '周检' },
        { type: 2, vaule: '', label: '月检' },
        { type: 3, vaule: '', label: '季检' },
        { type: 4, vaule: '', label: '年检' },
      ],
      weekday: [
        { name: '周日', value: '日' },
        { name: '周一', value: '一' },
        { name: '周二', value: '二' },
        { name: '周三', value: '三' },
        { name: '周四', value: '四' },
        { name: '周五', value: '五' },
        { name: '周六', value: '六' },
      ], // 星期
      listType: this.type || 0, // 列表对应的类型,
      // listType: undefined, // 列表对应的类型,
      currentValue: this.typeValue, // 当前的初始值;
      // tips: 保存多个数值是有必要的;
      dayCheck: 'day', // 日检的值
      weekCheck: undefined, // 周检的值; -- 对应的String
      monthCheck: undefined, // 月检
      seasonCheck: undefined,  // 季检
      yearCheck: undefined, // 年检
      weekDate: undefined, // 对应Date对象;
      monthDate: undefined,
      seasonDate: undefined,
      yearDate: undefined,
    }
  },
}
</script>

<style lang="scss" scoped>
.radio-label {
  margin-right: 5px;
}
</style>
