/**
 * 业务相关的数据变量和函数;
 */
/* eslint-disable */
const domain = 'http://cnpcportal.sinoapps.cn';

/**
 * 返回的图片地址;
 * @param {any} url
 * @returns
 */
function getImage(url) {
    if (!url || url === '') return;
    return domain + url;
}

/**
 * mock模拟请求时，获取url中参数的方法;
 * @param {any} url
 * @returns
 */
function param2Obj(url) {
   const search = url.split('?')[1];
   if (!search) {
     return {}
   }
   return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
 }

 // 获取图片尺寸;
function getImageSize(img) {
    if (!img.naturalWidth) return
    return {
        width: img.naturalWidth,
        height: img.naturalWidth
    }
    // ie6/7/8 处理;
    // const imgEle = document.createElement('img');
    // imgEle.src = domain + uri;
    // imgEle.onload = () => {
    //     console.log(imgEle.width)
    //     console.log(imgEle.height)
    // }
}

// 获取dom元素的边框大小对象;
function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

export {
    getImage,
    param2Obj,
    getImageSize,
    getRect,
}
