/* eslint-disable */
import fetch from 'utils/axios';

export function getList() {
  return fetch({
    url: '/article/list',
    method: 'get'
  });
}

export function getArticle() {
  return fetch({
    url: '/article/detail',
    method: 'get'
  });
}

