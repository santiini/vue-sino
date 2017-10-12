// axios请求;
/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
// export function getAxios(url, param = {}, type = 'get') {
//     if (type === 'get') {
//         return axios.get(url, {
//             params: param
//         })
//     } else {
//         return axios.post(url, qs.stringify(param))
//     }
// }

function get(url, params) {
    return axios.get(url, {
        params
    })
}

function post(url, params) {
    return axios.post(url, qs.stringify(params))
}

export {
    get,
    post
}
