<template lang="pug">
  .demo-stylus
    divider stylus的学习示例
    group.stylus-selector(title="选择器嵌套: 嵌套语法和 less,sass一致")
      .stylus-color1 选择器嵌套：层级关系
      .stylus-selector-color1 引用父级选择器的标记 `&-` 也相同
      .stylus-hover 伪元素，伪类 -- :hover, :last-child, ::after等
    group.stylus-scope(title="变量作用域：stylus和sass一致，倾向于命令式")
      .scope-demo1 color变量改变前的值
      .scope-demo2 color变量改变后的值
    group.stylus-default(title="!default -- 重写变量值来覆盖样式，重写第三方库的样式，需要第三方库的变量声明采用 !default")
      .default-demo1 color变量只有默认值
      .default-demo2 color变量重写
    group(title="选择器插值：三者差不多")
      .placeholder-demo1 first
      .placeholder-demo2 second
    group(title="属性名插值")
      .attr-demo1 border的四种颜色
    group(title="slot功能: stylus的两种slot方式")
      .slot-demo1 slot方式1
      .slot-demo2 slot方式2
    group(title="继承css,extend, stylus和sass一致")
      .extend-demo1 源css
      .extend-demo2 extend的使用类似sass
    group(title="placeholder: 选择器占位符, 参考sass中的使用")
      .placeholder-selector-demo1 占位符选择器1
      .placeholder-selector-demo2 占位符选择器2
    group(title="function: 函数的使用，三者比较像，sass通过@function, stylus则隐含@function,直接声明")
      .function-demo1 stylus的functio使用，如果有 prop: value格式内容，则会作为css样式输出, 和mixin等使用方式很像
      .function-demo2 Stylus 中大量的内容都是根据调用时的 context 去隐式推断该使用什么逻辑进行输出。
    group(title="stylus的属性查找：使用@符号")
      .search-props-demo2 属性查找2
    .search-props
      .search-props-demo1 属性查找1：居中对齐
    group(title="追加1：unit函数，无视单位换算。")
      cell(title="unit(a, px)")
    group(title="追加2：mixins,function中的匿名参数：arguments")
      .arguments-demo1 arguments的简单使用1
      .arguments-demo2 arguments的简单使用2
      .arguments-demo3 arguments的简单使用3
    group(title="追加3：测试用")
      .test-demo1 测试用
    group(title="官网样式库：sass和stylus")
      cell.sass-demo(title="Compass标准库" @click.native="openWin('sass')")
      cell.stylus-demo(title="nib标准库"  @click.native="openWin('stylus')")
</template>

<script>
  import { Group, Divider, Cell } from 'vux'

  export default {
    name: 'vue-stylus',
    components: {
      Group, Divider, Cell,
    },
    methods: {
      openWin(type) {
        if (type === 'sass') {
          return window.open('http://compass-style.org/')
        }
        if (type === 'stylus') {
          return window.open('http://tj.github.io/nib/')
        }
      },
    },
  }
</script>

<style lang="stylus" scoped>
  // 引入 .styl文件
  // @import '../../style/stylus/index.styl'; // 局部引用.styl文件，成功;
  // 1. 变量声明
  red = #FA4C3E;
  blue = #356DFC;
  small = 6px
  middle = 10px
  large = 15px
  // 2. 选择器的嵌套语法
  .stylus-selector
    .stylus-color1
      color red
      padding small
      background-color blue
    &-color1
      color blue
      padding small
      background-color red
    .stylus-hover
      // 伪类
      &:hover
        font-size middle
    // 伪类
    div
      &:last-child
        color purple
        text-align center
  // 3.变量作用域 和 变量默认值 !default
  // Less 更倾向接近 CSS 的声明式，计算过程弱化调用时机；而 Sass 和 Stylus 更倾向于指令式。
  scope-color = red
  // 3.1 变量作用域
  .scope-demo1
    color scope-color
  scope-color = blue
  .scope-demo2
    color scope-color
  // 3.2 变量默认值 !default
  default-color = red  // 重写的值: 提前引入配置进行覆盖，就可以按需重写默认配置
  default-color ?= blue // 默认的值：!default
  .default-demo1
    color default-color
  .default-demo2
    color default-color
  // 4. 选择器插值
  first = demo1
  second = demo2
  .placeholder-{first}
    color red
    text-align center
  .placeholder-{second}
    color blue
    text-align right
  // 5. 属性名插值
  // mixin的简单实用
  top-bottom-border(sides)
    for side in sides
      if side == top
        border-{side}-color orange
      else if side == bottom
        border-{side}-color #45c64f
      else if side == left
        border-{side}-color grey
      else if side == right
        border-{side}-color blue
  .attr-demo1
    margin middle
    text-align center
    border-width 3px
    border-style solid
    top-bottom-border(top bottom left right)
  // 6. mixin -- slot功能的两种使用方式
  // 6.1 方式一：类似于less
  slot-base1(more)
    color: red
    padding middle
    {more}
  .slot-demo1
    color: red
    more1 =
      border 3px solid black
      text-align center
      font-size 14px
      font-weight bold
    slot-base1(more1)
  // 6.2 方式2：类似于sass
  slot-base2()
    color blue
    background-color purple
    {block}
  .slot-demo2
    margin-top middle
    +slot-base2()
      border 2px solid red
      padding small
      border-radius 5px
  // 7. 继承 extend的使用
  .extend-demo1
    color purple
    font-size 14px
    text-align center
  .extend-demo2
    @extend .extend-demo1
    border 2px solid red
  // 8. 选择器占位符：placholder, 和sass一致, 通过@extend 调用
  // placeholder特点：不会在最终的 CSS 中输出; 一组「抽象」样式，只存在于预处理器的编译过程中; 可以被继承。
  $bg-blue
    background-color blue
    color #eee
    margin-bottom small
  .placeholder-selector-demo1
    text-align center
    @extend $bg-blue
  .placeholder-selector-demo2
    text-align right
    @extend $bg-blue
  // 9. function: 函数的使用
  // 三者使用基本一致，stylus隐式推断使用什么逻辑进行输出，使用上和mixin等基本一致, 而非less和sass一样显示声明
  // arguments是所有函数体都有的局部变量，包含传递的所有参数。
  // 9.1 函数中的运算
  sum()
    n = 0
    for num in arguments
      n = n + num
  .function-demo1
    // tips: 内置函数unit(number, unit), 把数字number 和 单位unit合并起来，作为属性值;
    // font-size sum(1px,2px,3px,4px,5px)
    font-size unit(sum(1,2,3,4,5), 'px')
  // 9.2 函数的传参：sass和stylus支持直接指定参数名的方式传入参数，有名参数
  // tips: 默认参数 key = value; 命名式的传参
  paramsFunc(mg = small, pd = middle, color = ref, bg = #eee, border = 1px solid black)
    margin mg
    padding pd
    color color
    background-color bg
    border border
  .function-demo2
    paramsFunc(pd: 10px, mg: 10px, bg: #77d677, color: blue, border: 2px solid red)
  // 10. stylus的属性查找的作用
  // 10.1 垂直居中的实现
  .search-props
    position relative
    height 200px
    width 100%
    &-demo1
      background-color blue
      color #eee
      text-align center
      width 140px
      height 100px
      position absolute
      top 50%
      left 50%
      margin-left -(@width / 2)
      margin-top -(@height / 2)
  // 10.2 属性查找的探索
  search-props(mg = 10px)
    // $border = mg / 3
    // margin mg
    // padding mg * 2
    // border $border solid red
    margin mg
    padding @margin * 2
    $border = @margin / 4
    border $border solid red
  .search-props-demo2
    color blue
    search-props(12px)
  // 11. mixin,function中的匿名参数： arguments
  // 11.1 $mixin, stylus中的占位符选择器，相当于sass中的 %mixin，可以被继承
  $arguments-base
    background-color blue
    color #a03f37
  border-radius()
    border-radius: arguments
  margin()
    margin arguments
  pd()
    padding arguments
  .arguments-demo1
    // 11.2 这里的border-radius，实际上是mixin,function 的隐式调用，而并非原生的css属性
    @extend $arguments-base;
    border-radius 5px 10px
  .arguments-demo2
    @extend $arguments-base;
    margin 5px 10px 8px 14px
  .arguments-demo3
    @extend $arguments-base;
    // 11.3 这里的pd, 对应mixin--pd, 隐式调用mixin,function, 并最终生成css属性：padding
    pd 10px 12px 11px 13px
  .test-demo1
    color test-color
</style>

<style lang="stylus">
  // 伪元素
  .stylus-selector
    .weui-cells
      &:after
        color red !important
        border-bottom 3px solid red !important
</style>



