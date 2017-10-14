<template lang="pug">
  .demo-promise-images
    group(title="异步加载20张图片图片")
      cell(title="详情参考链接" @click.native="toLink" is-link)
    .btn-group
      x-button(@click.native="startLoad") demo1--for循环
</template>

<script>
  /* eslint-disable */
  import { Group, Cell, XButton } from 'vux'

  // Promise实现一个单个 Image 来加载的 thenable 函数和一个处理函数返回结果的函数。
  // const loadImg = url => new Promise((resolve, reject) => {
  //   debugger
  //   const img = new Image();
  //   img.onload = () => {
  //     resolve(img)
  //   };
  //   img.onerror = reject;
  //   img.src = url;
  // })
  const loadImg = function (url) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = function () {
        resolve(img)
      }
      img.onerror = reject
      img.src = url
    })
}
  export default {
    name: 'promise-images',
    components: {
      Group, Cell, XButton,
    },
    methods: {
      toLink() {
        // 更多查看链接： Promise 异步流程控制- https://juejin.im/post/59cdb6526fb9a00a4e67c7fb
        window.open('https://juejin.im/post/59cdb6526fb9a00a4e67c7fb')
      },
      addToHtml(img) {
        this.imgList.push(img)
      },
      // demo1 -- for循环
      solutionOne() {
        let promise = Promise.resolve()
        for (let i = 0; i < this.urls.length; i++) {
          promise = promise
                      .then(() => loadImg(this.urls[i]))
                      .then(this.addToHtml)
        }
      },
      // demo2 -- Array.reduce(), promise 变量就像是一个迭代器，不断指向最新的返回的 Promise
      solutionTwo() {
        this.urls.reduce((promise, url) => promise
                 .then(() => loadImg(url))
                 .then(this.addToHtml), Promise.resolve())
      },
      // demo3 -- 在程序设计中，是可以通过函数的递归来实现循环语句的。所以我们将上面的代码改成递归:
      solutionThree() {

      },
      // 递归来实现数组循环
      syncLoadOne(index) {
        if (index >= this.urls.length) return
        loadImg(this.urls[index])
          .then((img) => {
            this.addToHtml(img)
            this.syncLoadOne(index + 1)
          })
          .catch(err => console.log(err))
      },
      // 完善上面的递归函数，接受异步函数、异步函数需要的参数数组、异步函数的回调函数三个参数，并且会记录调用失败的参数，在最后返回到函数外部。
      syncLoadTwo(fn, arr, handler) {
        if (typeof fn !== 'function') throw TypeError('第一个参数必须是function')
        if (!Array.isArray(arr)) throw TypeError('第二个参数必须是数组')
        handler = typeof fn === 'function' ? handler : function () {}
        // 错误集合，开始递归;
        const errors = []
        return load(0)
        // 递归函数
        function load(index) {
          if (index > arr.length) {
            return errors.length > 0 ? Promise.reject(errors) : Promise.resolve()
          }
          return fn(arr[index])
            .then(data => handler(data))
            .catch((err) => {
              console.log(err)
              errors.push(arr[index])
              return load(index + 1)
            })
            .then(() => load(index + 1))
        }
      },
      // 调用的函数的实现
      startLoad() {
        this.syncLoadOne(0)
          .then(() => {
            console.log('加载完毕')
            // document.querySelector('.loading').style.display = 'none'
          })
          .catch(err => {
            console.log(err)
          })
      },
    },
    data() {
      return {
        urls: [
          'https://www.baidu.com/img/bd_logo1.png',
          'https://www.baidu.com/img/baidu_jgylogo3.gif',
          'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=265704898,674087460&fm=58',
          'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3105518379,1723849651&fm=58',
          'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2292095202,1784829557&fm=58',
          'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1219708893,1812014204&fm=5832222',
          'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3669175269,2356096679&fm=58123122',
          // 'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=154063165,2016512383&fm=202&mola=new&crop=v1',
          // 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3536541845,739399450&fm=27&gp=0.jpg',
          // 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=594559231,2167829292&fm=27&gp=0.jpg',
          // 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3138365389,851751545&fm=27&gp=0.jpg',
          // 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3965705221,2010595691&fm=27&gp=0.jpg',
          // 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1742626185,2547278809&fm=27&gp=0.jpg',
          // 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1060387669,1498970204&fm=27&gp=0.jpg',
          // 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4271053251,2424464488&fm=27&gp=0.jpg',
          // 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4140230371,1584894266&fm=27&gp=0.jpg',
          // 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2710025438,2030209695&fm=27&gp=0.jpg',
          // 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3432487329,2901563519&fm=27&gp=0.jpg',
          // 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2993396273,3023277058&fm=27&gp=0.jpg',
          // 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2838934065,571280381&fm=27&gp=0.jpg',
        ],
        imgList: [],
      }
    },
  }
</script>

