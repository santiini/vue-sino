/**
 * 活动详情接口;
 */
/* eslint-disable */
import axios from 'utils/axios';
import { parseUrl } from 'utils/parseUrl';
import store from 'store';
import qs from 'qs';

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
 *  活动详情提交评论;
 * @param {Number, Sttring} actyId
 * @param {String} comment
 * @returns
 */
function submitComment(actyId, comment) {
    return axios({
        method: 'post',
        url: '/WXQY_Activity/ActivityCommentAddWX',
        data: qs.stringify({
            ActivityID: actyId,
            QYAccRelId: store.state.qyhRelId || parseUrl('state'),
            userId: store.state.userId,
            Comment: comment
        })
    })
}

/**
 * 获取评论列表， 分页显示;
 * @param {Number} actyId
 * @param {number} [page=1]
 * @returns
 */
function getComments(actyId, page = 1) {
    return axios({
        method: 'get',
        url: '/WXQY_Activity/ActivityCommentList',
        params: {
            '[Equal]ActivityID': actyId,
            page,
            rows: 5
        }
    })
}

/**
 * 活动报名/取消参加;
 * @param {any} type
 * @param {any} actyId
 * @returns
 */
function actyRigistration(type, actyId) {
    const params = {
        Id: type,
        ActivityID: actyId,
        QYAccRelId: store.state.qyhRelId || parseUrl('state'),
        userId: store.state.userId
    };
    return axios({
        method: 'post',
        url: '/WXQY_Activity/ActivityRegistrationWX',
        data: qs.stringify(params)
    })
}

/**
 *  取消活动 -- 只有发起者可以取消活动
 * @param {any} actyId 活动Id;
 * @returns
 */
function cancelActy(actyId) {
    return axios({
        method: 'post',
        url: '/WXQY_Activity/ActivityCancel',
        params: {
            id: actyId
        }
    })
}

export {
    getActivity,
    submitComment,
    // comment as submitComment
    getComments,
    actyRigistration,
    cancelActy
}
