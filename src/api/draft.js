/**
 * Api
 */
/* eslint-disable */
import axios from '../utils/axios';
import qs from 'qs';
import { parseUrl } from 'utils/parseUrl';
import { formatTime } from 'utils/timeformat';
import store from 'store';

// 常量设置;
const actyListPageSize = 10; // 活动列表分页显示数量;
// 活动列表;
function getActyList(params) {
    console.log(store.state.qyhRelId)
    console.log(store.state.userId)
        // function getDraft(params) {
    return axios({
        method: 'get',
        url: '/WXQY_Activity/ActivityAttendListWX',
        params
    })
}

/**
 * 获取草稿列表;
 * @param {number} [page=1]
 * @param {string} [searchKey='']
 * @returns
 */
function getDraft(page = 1, searchKey = '') {
    return axios({
        method: 'get',
        url: '/WXQY_Activity/ActivityAttendListWX',
        params: {
            QYAccRelId: store.state.qyhRelId || parseUrl('state'),
            userId: store.state.userId,
            type: 1,
            '[Equal]IfDraft': true,
            '[Contains]ActivityTitle': searchKey,
            rows: 10,
            // rows: actyListPageSize,
            page
        }
    })
}

/**
 * 获取发布的活动列表;
 * @param {number} [page=1]
 * @param {string} [searchKey='']
 * @returns
 */
function getReleasedActy(page = 1, searchKey = '') {
    return axios({
        method: 'get',
        url: '/WXQY_Activity/ActivityAttendListWX',
        params: {
            QYAccRelId: store.state.qyhRelId || parseUrl('state'),
            userId: store.state.userId,
            type: 1,
            '[Equal]IfDraft': false,
            '[Contains]ActivityTitle': searchKey,
            rows: 10,
            // rows: actyListPageSize,
            page
        }
    })
}

/**
 *  获取参加的活动列表;
 * @param {number} [page=1]
 * @param {string} [searchKey='']
 * @returns
 */
function getAttendedActy(page = 1, searchKey = '') {
    return axios({
        method: 'get',
        url: '/WXQY_Activity/ActivityAttendListWX',
        params: {
            QYAccRelId: store.state.qyhRelId || parseUrl('state'),
            userId: store.state.userId,
            type: 2,
            '[Equal]Business.IfDraft': false,
            '[Contains]Business.ActivityTitle': searchKey,
            rows: 10,
            // rows: actyListPageSize,
            page
        }
    })
}

/**
 *  获取待进行的活动;
 * @param {number} [page=1]
 * @param {string} [searchKey='']
 * @returns
 */
function getActyToStart(page = 1, searchKey = '') {
    return axios({
        method: 'get',
        url: '/WXQY_Activity/ActivityAttendListWX',
        params: {
            QYAccRelId: store.state.qyhRelId || parseUrl('state'),
            userId: store.state.userId,
            type: 2,
            '[Equal]Business.IfDraft': false,
            '[Contains]Business.ActivityTitle': searchKey,
            '[Equal]Business.Status': 1,
            '[GreaterThanOrEqual]Business.StartDate': formatTime(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            // rows: atyLstPageSize,
            rows: 10,
            page
        }
    })
}

/**
 * 进行中的活动;
 * @param {number} [page=1]
 * @param {string} [searchKey='']
 * @returns
 */
function getActyInProgress(page = 1, searchKey = '') {
    return axios({
        method: 'get',
        url: '/WXQY_Activity/ActivityAttendListWX',
        params: {
            QYAccRelId: store.state.qyhRelId || parseUrl('state'),
            userId: store.state.userId,
            type: 2,
            '[Equal]Business.IfDraft': false,
            '[Contains]Business.ActivityTitle': searchKey,
            '[Equal]Business.Status': 1,
            '[LessThanOrEqual]Business.StartDate': formatTime(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            '[GreaterThanOrEqual]Business.EndDate': formatTime(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            // rows: atyLstPageSize,
            rows: 10,
            page
        }
    })
}

/**
 * 已结束的活动;
 * @param {number} [page=1]
 * @param {string} [searchKey='']
 * @returns
 */
function getFinishedActy(page = 1, searchKey = '') {
    return axios({
        method: 'get',
        url: '/WXQY_Activity/ActivityAttendListWX',
        params: {
            QYAccRelId: store.state.qyhRelId || parseUrl('state'),
            userId: store.state.userId,
            type: 2,
            '[Equal]Business.IfDraft': false,
            '[Contains]Business.ActivityTitle': searchKey,
            '[Equal]Business.Status': 1,
            '[LessThanOrEqual]Business.EndDate': formatTime(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            // rows: atyLstPageSize,
            rows: 10,
            page
        }
    })
}

/**
 * 已取消的活动;
 * @param {number} [page=1]
 * @param {string} [searchKey='']
 * @returns
 */
function getCanceledActy(page = 1, searchKey = '') {
    return axios({
        method: 'get',
        url: '/WXQY_Activity/ActivityAttendListWX',
        params: {
            QYAccRelId: store.state.qyhRelId || parseUrl('state'),
            userId: store.state.userId,
            type: 2,
            '[Equal]Business.IfDraft': false,
            '[Contains]Business.ActivityTitle': searchKey,
            '[Equal]Business.Status': 2,
            // rows: atyLstPageSize,
            rows: 10,
            page
        }
    })
}


/**
 * 单一活动详情
 * @param {Number} id
 */
function getActivity(id) {
    return axios({
        method: 'get',
        url: '/WXQY_Activity/ActivityModel',
        params: {
            id
        }
    })
}

/**
 * 获取用户信息对象;
 * @returns {} object;
 */
function getUserInfo() {
    return axios({
        method: 'get',
        url: '/WXQY_Account/GetUser',
        params: {
            relId: parseUrl('state'),
            code: parseUrl('code')
        }
    })
}

/**
 * 获取微信用户userid;
 * @returns String;
 */
function getUserId() {
    return axios({
        method: 'get',
        url: '/WXQY_Account/GetUserId',
        params: {
            relId: parseUrl('state'),
            code: parseUrl('code')
        }
    })
}

export {
    getActyList,
    getActivity,
    getUserInfo,
    getUserId,
    getDraft,
    getReleasedActy,
    getAttendedActy,
    getActyToStart,
    getActyInProgress,
    getFinishedActy,
    getCanceledActy
}
