/**
 * 生产环境的引入;
 */
/* eslint-disable  prefer-template */
module.exports = file => () => import('@/demos/' + file + '.vue');
