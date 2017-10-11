<template lang="pug">
  .app
    .loading(v-transfer-dom="")
      loading(v-model="isLoading")
      //- 自定义指令在pug中的使用：v-transfer="" 需要传入默认的''参数;
    .actionsheet(v-transfer-dom="")
      actionsheet(:menus="menus" v-model="showMenu")
      //- :drawer-style="{'background-color':'#35495e', width='200px'}"
    drawer(width="200px" :show.sync="drawerVisibility" :show-mode="showModeValue"
      :placement="showPlacementValue")
      //- drawer content
      .drawer-content(slot="drawer")
        group.demo1
          cell(title="demo11" value="demo1" @click.native="drawerVisibility = false")
          cell(title="demo22" value="demo1" @click.native="drawerVisibility = false")
          cell(title="demo33" value="demo1" @click.native="drawerVisibility = false")
        group(title="showMode")
          radio(v-model="showMode" :options="['push', 'overlay']" @on-change="onshowModeChange")
        group(title="placeholder")
          radio(v-model="showPlacement" :options="['left', 'right']" @on-change="onPlacementChange")
      //- main content
      view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="55px")
        x-header.sino-header(slot="header" :left-options="leftOptions" :right-options="rightOptions"
          :title="title" :transition="headerTransition" @on-click-more="onClickMore")
          span(v-if="route.path === '/' || route.path === '/component/drawer'" slot="overwrite-left"
            @click="drawerVisibility = !drawerVisibility")
            x-icon(type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;")
        //- transition(@after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
        //-   :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')")
          //- 组件缓存--keep-alive的两种形式
          //- 1.keep-alive的 include/exclude属性，参数是组件名称，适用于简单应用
            //- keep-alive(include="a,b" exclude="c,d")
          //- 2.keep-alive 结合 v-if和 route.meta的判断, 适用于复杂项目
          //- tips: 问题在于 下面正确的使用方式和 transition组件的冲突;
        keep-alive
          router-view.router-view(v-if="$route.meta && $route.meta.keepAlive")
        router-view.router-view(v-if="!$route.meta || !$route.meta.keepAlive")

          //- tips: template(v-if)会导致其他问题的出现：详见keep-index中的2和3;
          //- template(v-if="$route.meta && $route.meta.keepAlive")
          //-   keep-alive
          //-     router-view.router-view(v-if="$route.meta.keepAlive")
          //- template(v-else)
          //-   router-view.router-view
            //- router-view.router-view(v-if="!$route.meta.keepAlive")

          //- keep-alive(include="event-hub")
          //-   router-view.router-view
        tabbar.vux-demo-tabbar(icon-class="vux-enter" v-show="!isTabbarDemo" slot="bottom")
          tabbar-item(:link="{path: '/'}" :selected="route.path === '/'")
            span.demo-icon-22.vux-demo-tabbar-icon-home(slot="icon" style="position:relative;top:-2px") &#xe637;
            span(slot="label") Home
          tabbar-item(:link="{path: '/demos'}" :selected="isDemo" badge="9")
            span.demo-icon-22(slot="icon") &#xe633;
            span(slot="label")
              span.vux-demo-tabbar-component(v-if="componentName") {{ componentName }}
              span(v-else) Demos
          tabbar-item(:link="{path: '/'}" :selected="route.path === '/project/donate'" show-dot)
            span.demo-icon-22(slot="icon") &#xe630;
            span(slot="label") Donate
</template>

<script>
  /* eslint-disable max-len,comma-dangle */
  import {
    Radio, Group, Cell, Badge, Drawer, Actionsheet, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDom
  } from 'vux'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'home',
    components: {
      Radio, Group, Cell, Badge, Drawer, Actionsheet, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDom,
    },
    directives: {
      TransferDom,
      // 'transfer': TransferDom,
    },
    methods: {
      onshowModeChange(val) {
        /* hide drawer before changing showMode */
        this.drawerVisibility = false
        setTimeout(() => {
          this.showModeValue = val
        }, 400)
      },
      onPlacementChange(val) {
        this.drawerVisibility = false
        setTimeout(() => {
          this.showPlacementValue = val
        }, 400)
      },
      onClickMore() {
        this.showMenu = true
      },
      ...mapActions(['updateDemoPosition']),
    },
    watch: {
      path(path) {
        if (path === '/component/demo') {
          return this.$router.replace('/demo')
        }
        if (path === '/demo') {
          setTimeout(() => {
            this.box = document.querySelector('#demo_list_box')
            if (this.box) {
              this.box.removeEventListener('scroll', this.handler, false)
              this.box.addEventListener('scroll', this.hanlder, false)
            }
          }, 1000)
        } else {
          this.box && this.box.removeEventListener('scroll', this.handler, false)
        }
      },
    },
    computed: {
      isShowBar() {
        if (/component/.test(this.path)) {
          return true
        }
        return false
      },
      leftOptions() {
        return {
          showBack: this.route.path !== '/',
        }
      },
      rightOptions() {
        return {
          showMore: true,
        }
      },
      headerTransition() {
        return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
      },
      componentName() {
        if (this.route.path) {
          const parts = this.route.path.split('/')
          if (/component/.test(this.route.path) && parts[2]) return parts[2]
        }
      },
      isDemo() {
        return /component|demo/.test(this.route.path)
      },
      isTabbarDemo() {
        return /tabbar/.test(this.route.path)
      },
      title() {
        if (this.route.path === '/') return 'Home'
        if (this.route.path === '/project/donate') return 'Donate'
        if (this.route.path === '/demo') return 'Demo list'
        return this.componentName ? `Demo/${this.componentName}` : 'Demo/~~'
      },
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        deviceready: state => state.app.deviceready,
        demoTop: state => state.vux.demoScrollTop,
        isLoading: state => state.vux.isLoading,
        direction: state => state.vux.direction,
      }),
    },
    data() {
      return {
        menus: {
          'language.noop': '<span class="menu-title">Language</span>',
          'zh-CN': '中文',
          en: 'English',
        },
        drawerVisibility: false,
        showModeValue: 'push',
        showMode: 'push',
        showMenu: false,
        showPlacement: 'left',
        showPlacementValue: 'left',
      }
    },
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';

  @font-face {
    font-family: 'vux-demo';  /* project id 70323 */
    src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot');
    src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot?#iefix') format('embedded-opentype'),
    url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.woff') format('woff'),
    url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.ttf') format('truetype'),
    url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.svg#iconfont') format('svg');
  }
</style>

<style lang="stylus">
  body
    background-color #fbf9fe
  html,body {
    height 100%
    width 100%
    overflow-x hidden
  }
  .app
    height 100%
  .demo1
    margin-top 200px
  .sino-header
    width 100%
    position absolute !important
    left 0
    top 0
    z-index 100
  .demo-icon-22
    font-family 'vux-demo'
    font-size 22px
    color #888
  .vux-demo-tabbar
    .weui-bar__item_on
      .demo-icon-22
        color: #F70968
    .weui-tabbar_item.weui-bar__item_on
      .vux-demo-tabbar-icon-home
        color rgb(53, 73, 94)
  .demo-icon-22
    &:before
      content: attr(icon)
  .vux-demo-tabbar-component
    background-color #F70968
    color #fff
    border-radius 7px
    padding 0 4px
    line-height 14px
  .weui-tabbar__icon
    & + .weui-tabbar__label
      margin-top 0
  .vux-demo-header-box
    z-index 100
    position absolute
    width 100%
    left 0
    top 0
  .demo-icon
    font-family 'vux-demo'
    font-size 20px
    color #04BE02
  .demo-icon-big
    font-size 28px
  .demo-cion
    &:before
      content attr(icon)
  .router-view
    width 100%
    top 46px
  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change transform
    transition all 500ms
    height 100%;
    top 46px
    position absolute
    backface-visibility hidden
    perspective 1000
  }
  .vux-pop-out-enter
    opacity 0
    transform translate3d(-100%, 0, 0)
  .vux-pop-out-leave-active
    opacity 0
    transform translate3d(100%, 0, 0)
  .vux-pop-in-enter
    opacity 0
    transform translate3d(100%, 0, 0)
  .vux-pop-in-leave-active
    opacity 0
    transform translate3d(-100%, 0, 0)
  .menu-title
    color #888
  // 先写到主页的全局css
  // 1. 底部按钮的css
  .btn-box
    padding 10px
    display flex
    .weui-btn
      & + .weui-btn
        margin-top 0
        margin-left 10px
  .btn-group
    padding 10px
</style>
