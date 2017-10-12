/**
 * 时间相关的函数格式;
 */
/* eslint-disable */
/**
 * 获取时间string的格式化形式;
 * @param {String, Date} time 时间string或者Date对象;
 * @param {string} fmt  [fmt='yyyy-MM-dd HH:mm:ss']
 * @returns
 */
function formatTime(time, fmt = 'yyyy-MM-dd HH:mm') {
    if (!time || time === '') return ''
        // time = parseInt(time);
    var t = new Date(time);
    var tf = function(i) {
        return (i < 10 ? '0' : '') + i
    };
    return fmt.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
            case 'MM':
                return tf(t.getMonth() + 1);
            case 'mm':
                return tf(t.getMinutes());
            case 'dd':
                return tf(t.getDate());
            case 'HH':
                return tf(t.getHours());
            case 'ss':
                return tf(t.getSeconds());
            default:
                return ''
        };
    });
}

/**
 * 获取时间的秒数，可用于比较大小;
 * @param {String, Date} time 时间string或者Date对象;
 * @returns  {Number}  秒数;
 */
function getTime(time, hour = 0) {
    const date = new Date(time);
    return new Date(time).getTime() + hour * 3600 * 1000
}

function isLater(time1, time2) {
    return new Date(time1).getTime() < new Date(time2).getTime()
}


export {
    formatTime,
    getTime,
    isLater
}
