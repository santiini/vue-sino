<template lang="pug">
  .demo-masonry-scroller
    vue-better-scroller.scroller-container(ref="scroller" :scrollbar="{ fade: true }" :data="photoList"
      :startY="0"
      :pullUpLoad="{ threshold: 0, text: { more: '更多加载', noMore: '没有了' } }"
      @pullingUp="fetchData")
      group(gutter="0")
        .image-container(v-if="photoList.length > 0"
          v-masonry="" transition-duration="0.3s" item-selector=".previewer-demo-img")
          img.previewer-demo-img(v-masonry-tile="" v-for="(item, index) of photoList" :key="index"
            :ref="`img${index}`" :src="getImage(item.PhotoSrc)" width="100" @click="show(index)")
          div(v-transfer-dom="")
            previewer(:list="photoList" ref="photoWall" :options="options")
</template>

<script>
  /* eslint-disable */
  import { Group, Cell, Previewer, TransferDom } from 'vux'
  import { getPhotos } from '@/api/mock-meeting';
  import { getImageSize } from 'utils';

  export default {
    name: 'masonry-scroller',
    components: {
      Group, Cell, Previewer, TransferDom,
    },
    directives: {
      TransferDom,
    },
    methods: {
      fetchData() {
        if (!this.isMore) return this.$refs.scroller.forceUpdate()
        getPhotos(this.page)
          .then(result => {
            // this.photoList = []
            this.photoList = this.photoList.concat(result.rows)
            this.photoList = this.photoList.map( el => {
              el.src = this.getImage(el.PhotoSrc)
              let image = document.createElement('img')
              image.src = el.src
              image.onload = function () {
                el.h = image.height
                el.w = image.width
              }
              return el
            })
            this.page += 1
            if (result.rows.length < 10) {
              this.isMore = false
              return this.$refs.scroller.forceUpdate()
            }
          })
          .catch(err => {
            console.log(err)
          })
          .then(() => {
            this.isLoading = false
            this.$vux.loading.hide()
          })
      },
      show(index) {
        this.$refs.photoWall.show(index)
      },
      // 获取特定域名下的图片;
      getImage(url) {
        if (!url || url === '') return '';
          // return $store.state.domain + url
        return 'http://cnpcportal.sinoapps.cn' + url
      },
    },
    created() {
      this.fetchData()
    },
    data() {
      return {
        photoList: [],
        meetingId: null,
        page: 1,
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        },
        isMore: true,
        isLoading: true
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .scroller-container
    top 46px !important
  .image-container
    img
      width 50%
</style>
