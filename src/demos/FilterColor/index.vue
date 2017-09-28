<template lang="pug">
  div
    .demo-filter
      //- 测试1
      h4 测试filter 颜色1
      p
      strong 原始图标
      i.icon.icon-del
      p
      strong 可以变色的图标
      i.icon
        i.icon.icon-del.changeColor
      //- 测试2
      h4 测试filter 颜色2
      p
      div 原始图标
      .icon2.icon-type
      p
      div 可以变色的图标
      .icon2
        .icon2.icon-type.changeColor2
      //- 测试3
      h4 测试filter 颜色3
      p
      div 原始图标
      .icon2.icon-color
      p
      div 可以变色的图标
      .icon2
        .icon2.icon-color.changeColor2
</template>

<script>
  export default {
    name: 'filter-color',
  }
</script>

<style lang="stylus">
  .icon
    display: inline-block;
    width: 20px;
    height: 20px;
    overflow: hidden;
  .icon-del
    background: url(../../assets/filter.png) no-repeat center;
  .icon > .icon {
      position: relative;
      left: -20px;
      border-right: 20px solid transparent;
      -webkit-filter: drop-shadow(20px 0);
      filter: drop-shadow(20px 0);
  }
  .changeColor
    filter: drop-shadow(blue 20px 0)!important;
  .demo-filter
    padding 10px
  .icon-type
    background: url(../../assets/type.png) no-repeat center;
    background-size contain
  .icon-color
    background: url(../../assets/filter-color.png) no-repeat center;
    background-size contain
  .icon2
    display inline-block
    width 40px
    height 40px
    overflow hidden
    .icon2
      position relative
      left -40px
      border-right -40 solid transparent
      -webkit-filter drop-shadow(40px 0)
      filter drop-shadow(40px 0)
  .changeColor2
    filter drop-shadow(blue 40px 0) !important
</style>

