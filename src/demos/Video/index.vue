<template lang="pug">
  .demo-video
    group(title="video插件vue-dplayer")
      d-player(:video="video" :autoplay="autoplay" :contextmenu="contextmenu"
        :screenshot="true" @play="play" ref="player")
      .btn-box
        x-button(type="primary" @click.native="switchHandle") switch
</template>

<script>
  import VueDPlayer from 'vue-dplayer'
  import { XButton, Group } from 'vux'

  export default {
    name: 'demo-video-player',
    components: {
      XButton,
      Group,
      'd-player': VueDPlayer,
    },
    methods: {
      play() {
        console.log('play callback')
      },
      switchHandle() {
        this.player.switchVideo({
          url: 'http://static.smartisanos.cn/common/video/video-jgpro.mp4',
        })
      },
    },
    mounted() {
      this.player = this.$refs.player.dp
    },
    data() {
      return {
        video: {
          url: 'http://static.smartisanos.cn/common/video/t1-ui.mp4',
          pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg',
        },
        videoUrl: 'http://static.smartisanos.cn/common/video/video-jgpro.mp4',
        autoplay: false,
        player: null,
        contextmenu: [
          {
            text: 'GitHub',
            link: 'https://github.com/MoePlayer/vue-dplayer',
          },
        ],
      }
    },
  }
</script>
