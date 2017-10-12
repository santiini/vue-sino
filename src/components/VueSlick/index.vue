<template>
  <div class="slick-container">
    <div  class="slick">
       <div class="" v-for="(item,i) of list" :key="i">
         <h4>名称{{item.name}}</h4>
        <img :src="require('@/assets/logo.png')">
      </div>
    </div>
  </div>
</template>

<script>
// 引入slick响应触摸式幻灯片插件;
/* eslint-disable */
import 'node/slick-carousel/slick/slick.js'

export default {
  name: 'vue-slick',
  methods: {
    sliderFn() {
      $('.slick').slick({
        autoplay: false,  // 自动播放
        dots: true,   // 提示远点：
        infinite: true, // 无限播放
        autoplaySpeed: 500, // 自动播放频率
        speed: 300,   // 动画速度
        slidesToShow: 1,  //
        slidesToScroll: 1
      })
    }
  },
  mounted() {
    // 组件加载后执行;
    this.sliderFn()
  },
  data() {
    return {
      list: [
        {name: 1, id: 1},
        {name: 2, id: 1},
        {name: 3, id: 1},
        {name: 4, id: 1},
        {name: 5, id: 1},
        {name: 6, id: 1},
        {name: 7, id: 1},
      ],
      number: 7
    }
  }
}
</script>

<style>
  @import '../../../node_modules/slick-carousel/slick/slick.css';
  @import '../../../node_modules/slick-carousel/slick/slick-theme.css';
  .slick-container img {
    width: 100%;
  }
  .slick-container {
    background-color: #eee;
  }
</style>


