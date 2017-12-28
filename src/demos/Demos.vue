<template lang="pug">
  .demo-list-box#demo_list_box(:style="{height: `${height}px`}" ref="demolist")
    flexbox(:gutter="0" v-for="(list,index) of components" :key="index")
      flexbox-item.cbox.vux-1px-t.vux-tap-active(
        :span="1/3" v-for="(component,i) of list" :key="getComponentName(component,i)" @click.native="go(component)")
        //- :span="1/3" v-for="component of list" :key="component.name" @click.native="go(component.name.toLowerCase())")
        .vux-1px-r.cbox-inner
          span.demo-icon.demo-icon-big(v-html="component.icon || '&#xe62a'" :style="{ color: component.color }")
          br
          span(:style="{fontSize: component.name.length > 12 ? '12px' : ''}") {{ component.name | camelCase }}
</template>

<script>
  import { Flexbox, FlexboxItem } from 'vux'
  import { mapState } from 'vuex'
  import { menus } from '@/data'

  // filters function
  /* eslint-disable prefer-arrow-callback */
  function camelCase(input) {
    let str = input.toLowerCase().replace(/-(.)/g, (match, group1) => group1.toUpperCase())
    str = str.replace(/_(.)/g, (match, group1) => group1.toUpperCase())
    return str.slice(0, 1).toUpperCase() + str.slice(1)
  }

  export default {
    name: 'demo-list',
    components: {
      Flexbox, FlexboxItem,
    },
    computed: {
      components() {
        return this.splitArray(this.menus)
      },
      ...mapState({
        demoTop: state => state.vux.demoScrollTop,
      }),
    },
    filters: {
      camelCase,
    },
    methods: {
      // 路由跳转
      go(demo) {
        const { name, list } = demo
        const routeName = demo.list ? `${name}/${list[0].name}` : `${name}`
        const path = demo.path || `/demos/${routeName}`
        // console.log(routeName)
        this.$router.push(path)
        // this.$router.push(`/demos/${routeName}`)
      },
      // 菜单列表分割
      splitArray(array) {
        const list = array.reduce((prev, cur, i) => {
          const index = Math.floor(i / 3)
          // prev[index].push(cur)
          /* eslint-disable no-param-reassign,no-plusplus */
          prev[index] ? prev[index].push(cur) : prev[index] = [cur]
          return prev
        }, [])
        // console.log(list)
        const lastLength = list[list.length - 1].length
        if (lastLength < 3) {
          for (let i = 0; i < 3 - lastLength; i++) {
            list[list.length - 1].push({ name: '---', icon: '' })
          }
        }
        return list
      },
      // getComponentName 获取组件名称
      getComponentName(component, i) {
        if (component.name === '---') {
          return `${component.name}-${i}`
        }
        return component.name
      },
    },
    activated() {
      document.querySelector('#demo_list_box').scrollTop = this.demoTop
      // this.$refs.demolist.scrollTop = this.demoTop
    },
    data() {
      return {
        height: window.innerHeight - 46 - 53,
        // components: this.splitArray(this.menus),
        menus,
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .demo-list-box
    margin-bottom 10px
    background-color #fff
    width 100%
    overflow scroll
    -webkit-overflow-scrolling touch
  .cbox
    text-align center
  .cbox-inner
    padding 15px 0
    width 100%
    height 100%
</style>
