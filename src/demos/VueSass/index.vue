<template lang="pug">
  .demo-vue-sass
    group(title="vue中使用sass")
    .red-btn red-btn
    .test-title1 test-title测试变量
    .test-title2 test-title测试全局变量
    .test-title3  @extend 继承已有css
    .test-btn test-btn
    .test-text1 简单mixin
    .test-text2 mixin传参--默认参数
    .test-text3 mixin传参--自由传参: 定义参数
    .test-text4 mixin传参--自由传参: 全局sass变量
    .test-function1 @function函数：内置函数lighten减淡
    .test-function2 @function函数：内置函数和darken加深
    .test-function3 @function: 自定义函数pxToRem转化rem：10px
    .test-function4 @function: 自定义函数pxToRem转化rem: 16px
    .test-demo1
      .test-demo1-text demo1:测试内容的文字部分
    .test-slot 类似slot的功能，拓展类的css
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'demo-sass',
    components: {
      Group, Cell,
    },
    data() {
      return {
        testValue1: '',
      }
    },
  }
</script>

<style lang="scss" scoped>
  // 第一部分： 基础部分;
  // 1.Sass- 变量
  $purple: #db6cdb;
  $bottom: bottom;
  $left: 2px;
  // 1.1 组件内变量
  .border-blue {
    border: 1px solid $blue-base;
  }
  .test-title1 {
    color: $purple;
    font-size: 18px;
    font-weight: bold;
  }
  // 1.2 全局变量 -- 利用第三方库：sass-resources-loader
  .test-title2 {
    color: $red-drak;
  }
  // 2. sass-- & 实现选择器的继承
  .test-demo1 {
    background-color: $yellow-base;
    padding: $padding-10;
    &-text {
      background-color: $white-base;
      color: $red-drak;
    }
  }
  // 3.sass -- @extend 继承已有css
  .test-title3 {
    // 1. 一般写法;
    @extend .test-title1;
    @extend .border-blue;
    // 2. 简写:
    // @extend .test-title1, .border-blue;
  }
  // 4. sass -- @extend 引用占位符选择器 %foo
  .test-btn {
    @extend %bg-blue;
    text-align: center;
  }
  // 5. sass -- @include： mixin的使用
  //   5.1简单mixin
  .test-text1 {
    @include sass-demo1;
    // margin-top: 10px;
    // margin的mixin
    @include margin(top, 15px);
  }
  // 5.2 mixin传参：复杂mixin
  .test-text2 {
    @extend .test-text1;
    // 没有传参，采用默认参数;
    @include sass-demo2;
  }
  .test-text3 {
    @extend .test-text1;
    // 传入参数
    @include sass-demo2(#31c27c, #8E50F6);
  }
  .test-text4 {
    @extend .test-text1;
    // 传入参数
    @include sass-demo2($red-drak, $gray-default);
    @include margin(bottom, 15px);
  }
  // 6. sass函数： @function
  // 6.1 内置函数
  .test-function1 {
    @extend .test-text4;
    // 改变背景色
    background-color: lighten($red-drak, 10%);
  }
  .test-function2 {
    @extend .test-text4;
    // 改变背景色
    background-color: darken($red-drak, 10%);
  }
  // 6.1 自定义函数
  .test-function3 {
    @extend .test-text4;
    font-size: pxToRem(10px);
  }
  .test-function4 {
    @extend .test-text4;
    font-size: pxToRem(16px);
  }
  .test-slot {
    // @extend .test-text2;
    @include baseRed() {
      // 基于mixin - baseRed, 拓展css, 类似slot
      margin-top: 5px;
      border: 1px solid blue;
      border-radius: 5px;
    }
  }
</style>


