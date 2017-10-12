<template>
  <div class="">
    <h4>{{title}}</h4>
    <div>
      <div>{{ count }}</div>
      <button v-stream:click="plus$">++++++++</button>
      <button v-stream:click="minus$">-------</button>
      <my-component v-stream:more="more$"></my-component>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import Rx from 'rxjs/Rx'

Vue.component('my-component', {
  template: '<button v-on:click="more">Iwant more!</button>',
  methods:{
    more:function(){
      this.$emit('more',100)
    }
  }
})


export default {
  name: 'rxjs',

  data() {
    return {
      title: 'Rxjs的vue测试',
      minusDelta1: -1,
      minusDelta2: -1
    }
  },
  domStreams: ['plus$', 'minus$', 'more$'],
  subscriptions() {
    console.log(this) // Vue实例;
    var plus$ = this.plus$.map(() => 1)
    var minus$ = this.minus$.map(() => -1)
    var more$ = this.more$.map(() => 100)
    var count$ = Rx.Observable
      .merge(plus$, minus$, more$)
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

