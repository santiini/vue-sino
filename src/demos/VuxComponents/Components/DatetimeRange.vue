<template lang="pug">
  div.demo-datetime-picker
    date-picker(title="datetime选择")
</template>

<script>
import DatePicker from '@/components/DatetimeRange'

export default {
  name: 'demo-datetime-range',
  components: {
    DatePicker,
  },
  data() {
    return {
      startTime: '',
      endTime: '',
    }
  },
}
</script>

