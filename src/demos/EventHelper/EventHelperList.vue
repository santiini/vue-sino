<template lang="pug">
  .demo-event-helper__list
    group(title="event-helper库的使用")
      cell(title="简单使用" @click.native="testEmit('test1', msg)")
      cell(title="once触发一次" @click.native="testEmit('test2', msg)")
      cell(title="绑定立即触发" @click.native="testEmit('test3', msg)")
      cell(title="点击3次才有回调" @click.native="testEmit('test4', count)")
      cell(title="点击5次触发一次回调" @click.native="testEmit('test5', count)")
      cell(title="group:点击4次触发一次回调" @click.native="emitGroup")
      cell(title="not:触发的事件不是not方法指定的事件" @click.native="testEmit('test7', count)")
      cell(title="done:返回(err,data)函数" @click.native="emitDone")
      cell(title="concurrent:测试" @click.native="emitLoadImg")
    group(title="改变的结果")
      x-input(title="内容" v-model="content")
      x-input(title="emit计数" v-model="count")
    group(title="result的结果集" v-if="list")
      cell(v-for="(item,i) of list" :key="i" :title="`count计数:${item}`")
    .btn-group
      x-button(@click.native="clearCount") count重置
    .images-list(ref="images")
</template>

<script>
  import { Group, Cell, XInput, XButton } from 'vux'
  // import { emmiterInit, eventEmit } from './index.js'
  import EventHelper from 'eventhelper'
  // import { EventHelper } from './index'

  // console.log(EventHelper)

  const emmiter = new EventHelper()
  // demo4: fail允许你统一处理错误
  // fail(errorMap:Object)
  emmiter.fail({
    test1(err) {
      console.error(`test1错误信息:${err}`)
    },
    test2(err) {
      console.error(`test2错误信息:${err}`)
    },
    test3(err) {
      console.error(`test3错误信息:${err}`)
    },
    test4(err) {
      console.error(`test4错误:${err}, 不计入计数`)
    },
    test5(err) {
      console.error(`test5错误:${err}, 不计入计数`)
    },
    test6(err) {
      console.error(`test6错误:${err}, 计入计数`)
    },
    test7(err) {
      console.error(`test6错误:${err}, 不计入计数`)
    },
    test8(err) {
      console.error(`test6错误:${err}, 计入计数`)
    },
    loadFinish(err) {
      console.log(err)
    },
  })
  // 图片加载函数
  const loadImg = (url, callback) => {
    const img = document.createElement('img')
    img.onload = () => callback(null, img)
    img.onerror = error => callback(error, null)
    img.src = url
  }

  export default {
    name: 'event-helper',
    components: {
      Group, Cell, XInput, XButton,
    },
    methods: {
      clearCount() {
        this.count = 0
      },
      handlerDemo1(msg) {
        console.log(`这是demo1内容：${msg}`)
        this.content = 'test1111'
      },
      handlerDemo2(msg) {
        console.log(`demo2只会触发一次：${msg}`)
        this.content = 'test2222'
      },
      handlerDemo3(msg) {
        console.log(`立即触发：${msg}`)
        this.content = 'test3333'
      },
      handlerDemo4(result) {
        // tips: result是一个数组，包含了每一次emit传入的参数;
        console.log(result)
        console.log(`demo4触发3次emit才会有回调${result}`)
        this.content = 'test4444'
        this.list = result
      },
      handlerDemo5(result) {
        console.log(`demo5触发5次emit才会有回调${result}`)
        console.log(result)
        this.content = 'test5555'
        this.list = result
      },
      emitGroup() {
        console.log('group')
        this.count += 1
        const data = Date.now() % 4 > 2 ? null : '错误信息'
        // emmiter.group(type, handler) 返回一个函数function(err,data)
        emmiter.group('test6')(data, this.count)
      },
      handlerDemo6(result) {
        console.log(`demo6触发4次emit才会有回调${result}`)
        console.log(result)
        this.content = 'test6666'
        this.list = result
      },
      handlerDemo7(result) {
        console.log(`当type类型不是指定类型时触发：${result}`)
        console.log(result)
        this.content = 'test7777'
      },
      emitDone() {
        emmiter.done('test8')(null, '测试demo888')
      },
      handlerDemo8(result) {
        console.log(`done测试：${result}`)
        console.log(result)
        this.content = 'test8888'
      },
      handlerDemo10(result) {
        console.log(result)
        const appentImageFn = (img) => {
          this.$refs.images && this.$refs.images.appendChild(img)
        }
        appentImageFn(result.result)
      },
      emitLoadImg() {
        emmiter.concurrent('loadFinish', 5, loadImg, this.images);
      },
      testEmit(type, msg) {
        const nowTime = Date.now()
        if (nowTime % 4 < 2) {
          this.count += 1
          emmiter.emit(type, msg)
        } else {
          emmiter.emit('error', type, msg)
        }
      },
    },
    created() {
      // demo1: on -- 事件监听
      emmiter.on('test1', this.handlerDemo1)
      // demo2: once -- 只会触发回调一次
      emmiter.once('test2', this.handlerDemo2)
      // demo3: immediate -- 事件监听，并且立即以第三个参数触发事件
      // emitLater(eventType:String, handler:Function, data:Any)
      emmiter.immediate('test3', this.handlerDemo3, '绑定函数的第三个参数为触发传参')
      // demo5: after -- 监听一个自定义事件，并在该事件被触发n/2n/3n/...次之后，执行回调函数
      // after(eventType:String, times:Number, handler:Function)
      emmiter.after('test4', 3, this.handlerDemo4)
      // demo6: afterOnce -- 监听一个自定义事件，并在该事件被触发n次之后，仅执行一次回调函数
      emmiter.afterOnce('test5', 5, this.handlerDemo5)
      // demo7: group -- group方法是after或afterOnce的助手方法，将同一个事件多次触发进行分组 -- ?????
      // group(eventType:String[,handler:Function]), 替代group方法
      emmiter.after('test6', 4, this.handlerDemo6)
      // demo8: not -- 当触发的事件不是not方法指定的事件时，执行回调方法
      // not(eventType:String, handler:Function)
      // emmiter.not('test7', this.handlerDemo7)
      // demo9: done返回一个error first风格的回调函数，内部进行错误处理及事件触发
      emmiter.on('test8', this.handlerDemo8)
      // demo10；concurrent -- 用于处理异步事件队列的并发
      // concurrent(eventType:String, limit:Number, asyncHandler:Function, asyncParams:Array)
      emmiter.on('loadFinish', this.handlerDemo10)
    },
    destroyed() {
      emmiter.un('test1', this.handlerDemo1)
      emmiter.un('test2', this.handlerDemo2)
      emmiter.un('test3', this.handlerDemo3)
    },
    data() {
      return {
        msg: '简单测试',
        content: '111111111',
        count: 0,
        list: undefined,
        images: [
          'https://www.baidu.com/img/bd_logo1.png',
          'https://www.baidu.com/img/baidu_jgylogo3.gif',
          'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=265704898,674087460&fm=58',
          'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3105518379,1723849651&fm=58',
          'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2292095202,1784829557&fm=58',
          'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1219708893,1812014204&fm=58',
          'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3669175269,2356096679&fm=58',
          'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=154063165,2016512383&fm=202&mola=new&crop=v1',
          'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3536541845,739399450&fm=27&gp=0.jpg',
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=594559231,2167829292&fm=27&gp=0.jpg',
          'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3138365389,851751545&fm=27&gp=0.jpg',
          'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3965705221,2010595691&fm=27&gp=0.jpg',
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1742626185,2547278809&fm=27&gp=0.jpg',
          'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1060387669,1498970204&fm=27&gp=0.jpg',
          'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4271053251,2424464488&fm=27&gp=0.jpg',
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4140230371,1584894266&fm=27&gp=0.jpg',
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2710025438,2030209695&fm=27&gp=0.jpg',
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3432487329,2901563519&fm=27&gp=0.jpg',
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2993396273,3023277058&fm=27&gp=0.jpg',
          'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2838934065,571280381&fm=27&gp=0.jpg',
        ],
      }
    },
  }
</script>

<style lang="stylus">
  .images-list img
    width 70%
    height 200px
    margin-left 15%
    margin-top 16px
</style>
