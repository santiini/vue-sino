/**
 * Mock 模拟数据;
 */
/* eslint-disable */
import Mock from 'mockjs';

import loginAPI from './login';
import articleAPI from './article';
import article_tableAPI from './article_table';
import remoteSearchAPI from './remoteSearch';
import user from './user';

// Mock.mock()的使用: Mock.mock( rurl?, rtype?, template|function( options ) )
//   Mock.mock( rurl, rtype, function( options ) )
//   当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。
//   options: 指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性

// 登录相关
Mock.mock(/\/login\/loginbyemail/, 'post', loginAPI.loginByEmail);
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getInfo)

// // 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList);
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle);

// // table example相关
Mock.mock(/\/article_table\/list/, 'get', article_tableAPI.getList);
Mock.mock(/\/article_table\/p/, 'get', article_tableAPI.getPv);

// 用户信息;
Mock.mock(/\/user\/list/, 'get', user.getList);
Mock.mock(/\/user\/detail/, 'get', user.getUserDetail);
Mock.mock(/\/user\/p/, 'get', user.getPv);

// // 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser);


export default Mock;
