<template lang="pug">
  .demo-error
    group(title="自定义Error")
      x-button(@click.native="throwError1") 抛出错误11
      x-button(@click.native="throwError2") 抛出错误22
      x-button(@click.native="throwError3") 抛出错误33
      x-button(@click.native="throwError4") 异步中的异常
      x-button(@click.native="throwError5") Promise中的同步异常
      x-button(@click.native="throwError6") Promise中无法捕获异步异常
      x-button(@click.native="throwError7") Promise中的promise
      x-button(@click.native="testPromise") 测试返回Promise
      x-button(@click.native="testPromise2") 测试普通Promise
</template>

<script>
  /* eslint-disable no-unreachable */
  import { Group, XButton } from 'vux'
  import MyError from './myError'

  // window.onerror: 程序中其他代码产生的未被捕获的异常往往就会被 window.onerror 上面注册的监听函数捕获到
  window.onerror = function (message, source, lineno, colno, error) {
    // message：异常信息（字符串）
    // source：发生异常的脚本URL（字符串）
    // lineno：发生异常的行号（数字）
    // colno：发生异常的列号（数字）
    // error：Error对象（对象）
    console.log(`window.onerror：捕获异常，${message}`)
    console.log(error)
  }

  const testPromise = () => new Promise((resolve, reject) => {
    // setTimeout(() => {
    const nowTime = Date.now()
    console.log(nowTime)
    console.log(nowTime % 4)
    if (nowTime % 4 < 2) {
      resolve('正确的信息')
    } else {
      reject('异常的信息')
    }
    // }, 0)
  })

  export default {
    name: 'custom-error',
    components: {
      Group, XButton,
    },
    methods: {
      // try...catch...只能捕获到同步异常
      throwError1() {
        try {
          throw new MyError('我的error1')
        } catch (err) {
          console.error(`${err.name}: ${err.message}`)
        }
      },
      throwError2() {
        try {
          throw new MyError('我的error2')
        } catch (err) {
          console.error(`${err.name}: ${err.message}`)
        } finally {
          console.log('try...catch...finally, finally总会执行')
        }
      },
      // try...catch...中有return, finally仍然会执行
      throwError3() {
        try {
          throw new MyError('我的error3')
        } catch (err) {
          const a = '333333'
          console.error(`${err.name}: ${err.message}`)
          return a
        } finally {
          console.log('即使try...catch...中有return, finally也是可以执行到的')
        }
      },
      // try..catch..无法捕获异步中的error
      throwError4() {
        try {
          setTimeout(() => {
            throw new MyError('异步中的异常')
          }, 0)
        } catch (err) {
          console.error(`${err.name}: ${err.message}`)
        }
      },
      // Promise中，在 resolve / reject 之前加上 return 能阻止往下继续运行。
      throwError5() {
        Promise.resolve('promise中的return')
          .then((result) => {
            console.log(result)
            throw new Error('出错了')
            // return { type: 'error', message: '抛出异常了' } // 不会catch
            // return Promise.reject(new Error('抛出异常了'))
            // Promise.reject(new Error('抛出异常')) // 没有return, 所以不能在catch中捕获, 不能这样使用;
            console.log('promise.then()中...')
          })
          .catch(err => console.log(err.message))
      },
      // Promise中，无法捕获异步error
      throwError6() {
        Promise.resolve()
          .then(() => {
            setTimeout(() => {
              throw new Error('异步中的异常')
            }, 0)
          })
          .catch(err => console.log(err))
      },
      // 问题： ?????
      throwError7() {
        Promise.resolve('开始测试')
          .then((msg) => {
            console.log(msg)
            return testPromise()
              .then((result) => {
                console.log(`promise中的promise信息：${result}`)
                return 'promise中的promise信息22'
              })
          })
          .catch(err => console.log(err))
      },
      testPromise() {
        testPromise()
          .then((result) => {
            console.log(result)
          })
          .catch(err => console.log(err))
      },
      testPromise2() {
        const testPromise22 = new Promise((resolve, reject) => {
          const nowTime = Date.now()
          if (nowTime % 4 < 2) {
            resolve('正确的信息')
          } else {
            reject('异常的信息')
          }
        })
        testPromise22
          .then(result => console.log(result))
          .catch(err => console.log(err))
      },
    },
  }
</script>

