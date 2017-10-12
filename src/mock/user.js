/**
 * user
 */
/* eslint-disable */
import Mock from 'mockjs';
import querystring from '@/utils/querystring';

const List = [],
    count = 20;

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
      // 数据占位符
      // 1. @占位符 2.@占位符(参数 [, 参数])
        id: '@id',
        title: '@ctitle(10, 20)',
        'status|1': ['published', 'draft'],
        name: '@cname',
        display_time: '@datetime',
        pageviews: '@integer(300, 5000)',
        'isSigned|1': [0, 1, 2, 3],
        // mock-number 生成规则;
        // 1. 'name|+1': 100 属性值自动加 1，初始值为 100
        // 2. 'name|1-100': 100 生成一个大于等于 1、小于等于 100 的整数，属性值 100 只用来确定类型。
        // 3. 'name|1-100.1-10': 100 生成一个浮点数，整数部分大于等于 1、小于等于 100，小数部分保留 1 到 10 位。
        'number|1-100.1': 100,
        'amount|1-100': 1,
        // mock-boolean 生成规则;
        // 1. 'name|1': value 随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率是 1/2。
        // 2. 'name|min-max': value 随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是 max / (min + max)。
        'isFemale|1': true,
        'haveTreeChildren|2-7': true,
        address: '@province'
    }));
}

export default {
    // tips:
    getList: (options) => {
      // tips: 利用querystring.parse 获取url中的参数信息
      // console.log(options)
      // console.log(querystring.parse(options.url.split('?')[1]))
      const { pageSize } = querystring.parse(options.url.split('?')[1])
      const result = pageSize < 20 ? List.slice(0, pageSize) : List;
      console.log(result)
      return result;
    },
    getUserDetail: (options) => {
      const { id, name, address } = querystring.parse(options.url.split('?')[1])
      // console.log(id, name, address)
      return {
        id,
        name,
        address,
        description: `这是关于${name}的简单描述....`,
        source_name: '原创作者',
        category_item: [{ key: 'global', name: '全球' }],
        comment_disabled: false,
        content: '<p>我是测试数据我是测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>"',
        content_short: '我是测试数据',
        display_time: +new Date(),
        image_uri: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
        platforms: ['a-platform'],
        source_uri: 'https://github.com/PanJiaChen/vue-element-admin',
        status: 'published',
        tags: [],
        title: ''
    }
  }
}
