/**
 * 创建活动Api;
 */
/* eslint-disable */
import axios from 'utils/axios';
import qs from 'qs';
import { parseUrl } from 'utils/parseUrl';
import store from 'store';

/**
 *  获取内部用户列表 -- 支持搜索;
 * @param {Sring} searchKey
 * @returns axios;
 */
function getAllUsers(searchKey) {
    return axios({
        method: 'get',
        url: '/PhoneUser/GetPhoneUserListWX',
        params: {
            QYAccRelId: store.state.qyhRelId || parseUrl('state'),
            userName: store.state.userId,
            pageIndex: 1,
            pageSize: 2000,
            orderby: 'RealName',
            '[Equal]UserType': 0, // 内部用户;
            '{group}[Contains]RealName': searchKey // 搜索字段;
        }
    })
}

/**
 *  根据 depId获取部门和人员;
 * @param {Number} depId
 * @returns  经处理后的depId;
 */
function getDepUsers(depId) {
    let params;
    if (!depId) {
        params = {
            QYAccRelId: store.state.qyhRelId || parseUrl('state'),
            userName: store.state.userId
        };
    } else {
        params = { depId }
    }
    return axios({
            method: 'get',
            url: '/Department/GetDepartmentAndDepartmentUsersWX',
            params
        })
        .then(result => {
            // 处理部门，排除depId的部门自己, 获取自己以外的其他部门;
            let selfDep, // 部门自己;
                departments; // 部门的子部门;
            if (result.data.deps.length === 1) {
                result.data.selfDep = result.data.deps[0];
                result.data.deps = [];
            } else if (result.data.deps.length > 1) {
                const firstDep = result.data.deps[0],
                    filters = result.data.deps.filter(el => el.Pid === firstDep.Id);
                if (filters.length > 0) {
                    result.data.deps = filters;
                    result.data.selfDep = firstDep;
                } else {
                    result.data.selfDep = (result.data.deps.filter(el => el.Id === firstDep.Pid))[0];
                    result.data.deps = result.data.deps.filter(el => el.Pid === firstDep.Pid);
                }
            } else {
                throw new Error('没有部门');
            }

            return result;
        })
}

/**
 * 新建会议或保存草稿;
 * @param {Object} model  会议模型
 * @returns
 */
function submitActy(model) {
    let params = {
        QYAccRelId: store.state.qyhRelId || parseUrl('state'),
        userId: store.state.userId,
    };
    Object.assign(params, model);
    return axios({
        method: 'post',
        url: '/WXQY_Activity/ActivityEditWX',
        data: qs.stringify(params)
    })
}

/**
 * 获取活动类型;
 * @returns
 */
function getActyTypeList() {
    return axios({
        method: 'get',
        url: '/WXQY_Activity/ActivityTypeListWX',
        params: {
            QYAccRelId: store.state.qyhRelId || parseUrl('state'),
        }
    })
}
export {
    getAllUsers,
    getDepUsers,
    getActyTypeList,
    submitActy
};
