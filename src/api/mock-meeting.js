/**
 * axios API
 */
/* eslint-disable */
import axios, { _axios } from 'utils/axios'


/**
 * 获取照片墙;
 * @param {any} id
 * @returns
 */
function getPhotos(page) {
    return axios({
        url:  'http://cnpcportal.sinoapps.cn/Service_Meeting_MeetingInfo/GetPhotoListPage',
        method: 'get',
        params: {
            id: 31,
            pageIndex: page,
            pageSize: 10,
            orderBy: 'CreateTime',
            sort: true
        }
    })
}

export {
  getPhotos
}
