/* eslint-disable */
import fetch from 'utils/axios';

export function getList(pageSize) {
  return fetch({
    url: '/user/list',
    method: 'get',
    params: {
      pageSize,
    }
  });
}

export function getUserDetail(params) {
  return fetch({
    url: '/user/detail',
    method: 'get',
    params,
  });
}

