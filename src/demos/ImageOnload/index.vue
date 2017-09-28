<template lang="pug">
  .image-onload
    h4 图片上传
    img.logo(:src="imgUrl" @load="imgLoaded")
</template>

<script>
  export default {
    name: 'image-onload',
    methods: {
      imgLoaded(e) {
        console.log('图片加载完毕')
        console.log(2222222222222222)
        console.log(e)
      },
    },
    created() {
      this.imgUrl = 'http://wmh.cnpc.com.cn/Upload/meetingLogo/201708031106381860253.jpg'
      // setTimeout(() => {
      //   this.imgUrl = 'http://wmh.cnpc.com.cn/Upload/meetingLogo/201708031106381860253.jpg'
      // }, 500)
      // this.imgUrl = require('assets/nav.jpg')
      console.log(1111111111111111)
    },
    data() {
      return {
        imgUrl: '', // 图片地址
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .logo
    width 100%
    height 100%
</style>

