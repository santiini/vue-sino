<template>
  <div class="">
    <h4>demo1</h4>
    <div>{{count}}</div>

    <button @click="muchMore(500)">Add 500</button>

    <button @click="minus(MinusDelta1)">Minus on click</button>

    <pre>{{$data}}</pre>
  </div>
</template>

<script>
  /* eslint-disable */
  import { XButton } from 'vux'
  import Rx from 'rxjs/Rx'

  export default {
    name: 'rxjs-demo1',
    data() {
      return {
        minusDelta1: -1,
        minusDelta2: -1
      }
    },

    observableMethods: {
      muchMore: 'muchMor$',
      minus: 'minus$'
    },

    subscriptions () {
      let count$ = Rx.Observable
          .merge(
            this.muchMore$,
            this.minus$
          )
          .startWith(0)
          .scan((total, change) => total + change)

      return {
        count: count$
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>

