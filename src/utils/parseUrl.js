/**
 * url相关;
 */
/* eslint-disable */
/**
 * 获取url中的query对象的值;
 * @param {any} key  key='state', 则返回state的第一个参数; key = 'state0', 则返回state的第二个参数;
 * @returns value
 */
function parseUrl(key) {
    // var url = search,
    var url = window.location.href,
        request = {},
        result;
    try {
        if (url.indexOf('?') !== -1) {
            url = url.split('?')[1];
            var array = url.split('&');
            array.forEach(function(el, i) {
                request[el.split('=')[0]] = el.split('=')[1];
            })
        }
        var state = request['state'].split('_');
        if (key === 'state') {
            result = state[0]
        } else if (key === 'state0') {
            // 在微信浏览器中 vue的路由会影响到url的判断： http://cnpcportal.sinoapps.cn/html/qyh/html/Activity/index.html?code=dzuu39LKO6XXsdTPx7ct_a-i1HajjCLKhVvekBzgsL0&state=6_0#/list/1
            // 进行适当的处理: #符号后路由的处理;
            result = state[1].split('#')[0]
                // result = state[1]
        } else {
            result = request[key]
        }
    } catch (err) {
        // console.log(err)
    } finally {
        return result
    }
}

export {
    parseUrl
}
