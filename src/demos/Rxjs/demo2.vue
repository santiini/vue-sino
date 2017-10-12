<template>
  <div>
    <div>{{ count }}</div>

    <button v-stream:click="plus$">Add on click</button>
    <!-- <button v-stream:click="minus$">Add on click</button> -->

    <button v-stream:click="{subject: plus$,data: minusDelta1, options: { once: true}}">Add on click</button>

    <button
      v-stream:click="{ subject: minus$, data: minusDelta1 }"
      v-stream:mousemove="{ subject: minus$, data: minusDelta2}"
      >Minus on click; Mousemove</button>

    <pre>{{ $data }}</pre>

    <my-button v-stream:click="plus$"></my-button>
  </div>
</template>

<script>
  /* eslint-disable */
  import Rx from 'rxjs/Rx'

  export default {
    name: 'rxjs-dmeo2',
    data() {
      return {
        minusDelta1: -1,
        minusDelta2: -1
      }
    },
    components: {
      myButton: {
        template: '<button>MyButton</button>'
      }
    },
    created() {
      setTimeout(() => {
        this.minusDelta1 = -5
      }, 5000)
    },
    domStreams: ['plus$', 'minus$'],

    subscriptions() {
      var count$ = Rx.Observable
          .merge(
            this.plus$.map(() => 1),
            this.minus$.pluk('data')
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

