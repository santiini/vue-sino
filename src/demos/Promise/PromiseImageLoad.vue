<template lang="pug">
  .demos-images-load
    //- img.logo(:src="imgUrl" @load="imgLoaded")
    divider(ref="divider") 测试图片img的插入
    x-button(@click.native="clearImage") 清除图片
    x-button(@click.native="loadOne") 插入一个img-demo1
    x-button(@click.native="loadMore") 插入多个img-demo2
    x-button(@click.native="loadPromise") 利用Promise.all()处理并发请求
    x-button(@click.native="loadArrayReques") 并发请求，按顺序处理结果, 避免Promise.all中一个promises出错就reject
    x-button(@click.native="loadTwoSteps") 分两批加载图片
    x-button(@click.native="loadAsyncImages") 抽象方法，分n批加载图片，每一批m张
    x-button(@click.native="loadRecursiveImages") 用递归实现，分n批加载图片，每一批m张
    x-button(@click.native="loadRaceImages") Promise.race()，分n批加载图片，每一批m张
    x-button(@click.native="eventhelperLoad") 第三方库eventhelper
    .images-list(ref="images")
      //- img.logo(:src="imgUrl")
</template>

<script>
  /* eslint-disable no-plusplus,no-undef */
  import { Divider, XButton } from 'vux'
  import EventHelper from 'eventhelper'

  // 图片加载的Promise
  const loadImage = url => new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve(img)
    }
    img.onerror = (err) => {
      reject(err)
    }
    img.classList.add('demo-image')
    img.src = url
  })
  // 异步加载多张图片函数
  // fn: 异步的Promise, arr: 图片地址数组, handler: 图片加载完成后的回调,参数是img元素;
  const asyncLoadImage = (fn, arr, handler) => {
    if (Object.prototype.toString.call(fn) !== '[object Function]') {
      return console.warn('第一个参数必须是function')
    }
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
      return console.warn('第二个参数必须是array')
    }
    if (arr.length < 1) {
      return console.warn('请传入图片地址数组')
    }
    // 错误集合
    const errors = []
    // 数组的递归函数
    const loadArray = (index) => {
      // 递归的终止条件 -- arr数组遍历完成
      if (index >= arr.length) {
        // 最后一次递归的返回值
        return errors.length > 0 ? Promise.reject(errors) : Promise.resolve()
      }
      return fn(arr[index])
        .then(data => handler(data))
        .catch((err) => {
          console.log(err)
          errors.push(arr[index])
          // tips: 这里和下面的then() 重复 ???
          // return loadArray(index + 1)
        })
        .then(() => loadArray(index + 1))
    }
    return loadArray(0)
  }
  // 分批加载图片--循环： 函数返回一个 Promise，还可以继续处理全部都图片加载完后的异步回调。
  // urls: 图片地址数组, handler: 异步加载图片的Promise,
  // stepNum: 每一批的数量, addToHtml: 图片加载完成后的回调处理, 参数是img元素;
  const loadStepImages = (urls, handler, stepNum, addToHtml) => {
    // 创建promises 数组
    const createPromises = (now) => {
      const last = Math.min(stepNum + now, urls.length)
      return urls.slice(now, last).map(handler)
    }
    let step = Promise.resolve()
    for (let i = 0; i < urls.length; i += stepNum) {
      step = step
        .then(() => {
          const promises = createPromises(i, stepNum)
          return promises.reduce((task, imgPromise, index) => task
            .then(() => imgPromise.then(addToHtml).catch(err => console.log(err)))
            .catch(err => console.log(err))
            .then(() => {
              console.log(`第 ${index + 1 + i} 张图片加载完成.`)
            }), Promise.resolve())
        })
        .then(() => {
          const current = Math.min(i + stepNum, urls.length)
          console.log(`>> 总共${current}张已经加载完成`)
        })
        .catch(err => console.log(err))
    }
  }
  // 使用递归 -- 分批加载图片
  const recursiveLoad = (urls, handler, limit, addToHtml) => {
    const sequence = [].concat(urls) // 对数组做一个拷贝
    let count = 0
    const promises = []

    const loadImg = () => {
      if (sequence.length <= 0 || count > limit) return
      count += 1
      console.log(`当前并发数${count}`)
      return handler(sequence.shift())
        .then(addToHtml)
        .catch(err => console.error(err))
        .then(() => {
          count -= 1
          console.log(`当前并发数${count}`)
        })
        .then(() => loadImg())
    }

    for (let i = 0; i < limit && i < sequence.length; i += 1) {
      promises.push(loadImg())
    }
    return Promise.all(promises)
  }
  // 使用Promise.race(), 分批加载图片
  // tip: 1. 加载顺序不是urls数组的顺序
  //  2. 不是太好使, 不推荐;
  const raceLoad = (urls, handler, limit, addToHtml) => {
    const sequence = [].concat(urls) // 对数组做一个拷贝
    let count = 0
    let promises = []
    // const wrapHandler = (url, index) => handler(url).then(img => ({ img, index }))
    // 封装图片加载Promise，处理数组;
    const wrapHandler = (url) => {
      const promise = handler(url)
        .then(img => ({ img, index: promise }))
        // .catch(err => ({ index: promise }))
        .catch((err) => {
          console.log(err)
          console.log('加载失败')
          return { index: promise }
        })
      return promise
    }
    // 并发请求到达最大数
    // 根据limit决定一次最多请求的数量
    promises = sequence.splice(0, limit).map(wrapHandler)
    // limit 大于全部图片数量，并发全部请求
    if (sequence.length < 0) {
      console.log('所有图片已加载')
      return Promise.all(promises)
    }
    // 遍历urls, 根据Promise.race()返回的Promise，从数组删除请求，知道 urls为空
    return sequence.reduce((last, url) => last
      .then(() => Promise.race(promises))
      .then((res) => {
        console.log('图片加载')
        console.log(res)
        if (res.img) {
          count += 1
          addToHtml(res.img)
          console.log(`第${count}张图片加载完成`)
        }
        const pos = promises.findIndex(item => item === res.index)
        promises.splice(pos, 1)
        promises.push(wrapHandler(url))
        return promises
      }), Promise.resolve())
    .then(() => Promise.all(promises))
    .then((result) => {
      console.log(result)
      result.forEach((el) => {
        if (el.img) {
          addToHtml(el.img)
          count += 1
          console.log(`第${count}张图片加载完成`)
        }
      })
      console.log(sequence)
      console.log(promises)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // 利用第三方库eventhelper来实现
  const emmiter11 = new EventHelper()
  const loadImgs = (url, callback) => {
    const img = document.createElement('img')
    img.onload = () => callback(null, img)
    img.onerror = error => callback(error, null)
    img.src = url
  }
  emmiter11.fail({
    loadImages(error) {
      console.log(error)
    },
  })

  export default {
    name: 'promise-images-onload',
    components: {
      Divider, XButton,
    },
    methods: {
      imgLoaded(e) {
        console.log('图片加载完毕')
        console.log(2222222222222222)
        console.log(e)
      },
      // 清除图片
      clearImage() {
        this.$refs.images.innerHTML = ''
      },
      // demo1 -- 加载一张图片
      loadOne() {
        // 测试插入img
        loadImage(this.imgUrl)
          .then((img) => {
            console.log(img)
            this.$refs.images && this.$refs.images.appendChild(img)
            console.log('加载完成')
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // demo2 -- 加载多张图片
      loadMore() {
        const appentImageFn = (img) => {
          this.$refs.images && this.$refs.images.appendChild(img)
        }
        asyncLoadImage(loadImage, this.urls, appentImageFn)
          .then(() => {
            console.log('全部加载完成')
          })
          .catch((err) => {
            console.log(err)
            console.log('没有加载完全')
          })
      },
      // demo3 -- Promise.all()处理并发
      // tips: 一旦有一张加载失败，所有图片都不会插入Dom中
      loadPromise() {
        // promises是一个Promise数组
        const promises = this.urls.map(loadImage)
        const appentImageFn = (img) => {
          this.$refs.images && this.$refs.images.appendChild(img)
        }
        Promise.all(promises)
          .then((images) => {
            images.forEach(appentImageFn)
            console.log('加载完成')
          })
          .catch((err) => {
            console.log(err)
            console.error('Promise.all 当其中一个出现错误，就会reject。')
          })
      },
      // demo4: 并发请求，按顺序处理结果, 避免Promise.all中一个promises出错就reject
      // 利用数组遍历 promises -- Promise请求的数组
      loadArrayReques() {
        const promises = this.urls.map(loadImage)
        const appentImageFn = (img) => {
          this.$refs.images && this.$refs.images.appendChild(img)
        }
        const errors = []
        // 方式1： for循环
        let task = Promise.resolve()
        for (let i = 0; i < promises.length; i++) {
          task = task.then(() => promises[i]
            .then(appentImageFn)
            .catch((err) => {
              console.log(err)
              errors.push(this.urls[i])
              if (i === this.urls.length - 1) {
                console.log(errors)
              }
            }))
        }
        // 方式2： reduce循环
        // promises.reduce((task, imgPromise) => task
        //   .then(() => imgPromise.then(appentImageFn))
        //   .catch((err) => {
        //     console.log(err)
        //   }), Promise.resolve())
      },
      // demo5: 控制最大并发数
      // 分两次加载20张图片, 但是用 Promise.all 没办法侦听到每一张图片加载完成的事件。
      // 而使用demo4中的方法,既能并发请求，又能按顺序响应图片加载完成的事件。
      loadTwoSteps() {
        let index = 0
        const step1 = []
        const step2 = []
        const images = this.images
        const appentImageFn = (img) => {
          this.$refs.images && this.$refs.images.appendChild(img)
        }
        while (index < 10) {
          step1.push(loadImage(images[index]))
          index += 1
        }
        step1.reduce((task, imgPromise, i) => task
          .then(() => imgPromise.then(appentImageFn).catch(err => console.log(err)))
          .catch(err => console.log(err))
          .then(() => {
            console.log(`第${i}张图片加载完成.`)
          }, Promise.resolve()))
          .then(() => {
            console.log('1. 前面10张已经加载完成')
          })
          .then(() => {
            while (index < 20) {
              step2.push(loadImage(images[index]))
              index += 1
            }
            return step2.reduce((task, imgPromise, k) => task
              .then(() => imgPromise.then(appentImageFn).catch(err => console.log(err)))
              .catch(err => console.log(err))
              .then(() => {
                console.log(`第${k + 11}张图片加载完成`)
              }, Promise.resolve()))
          })
          .then(() => {
            console.log('2. 后面10张已经加载完成')
          })
      },
      // demo6: 抽象demo5代码，写一个通用的方法出来，这个函数返回一个 Promise，还可以继续处理全部都图片加载完后的异步回调。
      loadAsyncImages() {
        const appentImageFn = (img) => {
          this.$refs.images && this.$refs.images.appendChild(img)
        }
        // loadStepImages(this.images, loadImage, 10, appentImageFn)
        loadStepImages(this.images, loadImage, 5, appentImageFn)
      },
      // demmo7：使用递归 -- 分批加载图片
      loadRecursiveImages() {
        const appentImageFn = (img) => {
          this.$refs.images && this.$refs.images.appendChild(img)
        }
        recursiveLoad(this.images, loadImage, 4, appentImageFn)
          .then(() => {
            console.log('全部加载完成')
          })
          .catch(err => console.error(err))
      },
      // demo8: Promise.race
      loadRaceImages() {
        const appentImageFn = (img) => {
          this.$refs.images && this.$refs.images.appendChild(img)
        }
        raceLoad(this.images, loadImage, 4, appentImageFn)
      },
      // demo9: 利用第三方库： eventhelper
      eventhelperLoad() {
        emmiter11.concurrent('loadImages', 4, loadImgs, this.images)
      },
      handlerLoadImages(result) {
        console.log(result)
        if (!result.result) {
          return console.log(`第${result.index}张图片加载失败`)
        }
        const appentImageFn = (img) => {
          this.$refs.images && this.$refs.images.appendChild(img)
        }
        appentImageFn(result.result)
      },
    },
    created() {
      this.imgUrl = 'http://wmh.cnpc.com.cn/Upload/meetingLogo/201708031106381860253.jpg'
      // setTimeout(() => {
      //   this.imgUrl = 'http://wmh.cnpc.com.cn/Upload/meetingLogo/201708031106381860253.jpg'
      // }, 500)
      // this.imgUrl = require('assets/nav.jpg')
      console.log(emmiter11)
      emmiter11.on('loadImages', this.handlerLoadImages)
    },
    mounted() {
      // 1. ref -- 指向html元素自身，挂载在html上;
      // console.log(this.$refs.images)
      // 2. ref -- 指向 Vue组件VueComponent对象，可以调用组件和方法和属性;
      // console.log(this.$refs.divider)
      // 3. ref -- 指向组件挂载的根元素，挂载在组件上, 是个html元素;
      // console.log(this.$refs.divider.$el)
    },
    data() {
      return {
        imgUrl: '', // 图片地址,
        urls: [
          'https://www.baidu.com/img/bd_logo1.png',
          'https://www.baidu.com/img/baidu_jgylogo3.gif',
          'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=265704898,674087460&fm=58',
          'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3105518379,1723849651&fm=58',
          'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2292095202,1784829557&fm=58',
          'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1219708893,1812014204&fm=5832222',
          'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3669175269,2356096679&fm=58123122',
        ],
        images: [
          'https://www.baidu.com/img/bd_logo1.png',
          'https://www.baidu.com/img/baidu_jgylogo3.gif',
          'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=265704898,674087460&fm=58',
          'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3105518379,1723849651&fm=58',
          'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2292095202,1784829557&fm=58',
          'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1219708893,1812014204&fm=5832222',
          'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3669175269,2356096679&fm=58123122',
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
  // .images-list img,
  .logo
    // width 100%
    // height 400px
    width 70%
    height 200px
    margin-left 15%
    // margin-left (100% - @width)/2
  // 对于原生方法插入的html元素(appendChild), 层级css好像无效
  // tips: extend继承 -- 继承生成的代码和上面的css生成的代码一样，不会生成多余的重复代码，而反复使用mixin会生成多余的重复代码;
  .images-list img
      margin-top 16px
      @extend .logo
  // .demo-image
  //   width 100%
  //   height 300px
</style>

