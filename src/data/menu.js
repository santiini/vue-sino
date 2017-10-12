/**
 * demos--菜单列表
 * tips---修改记录
 *   20171010: 为menus对应的路由添加meta字段：包括keepAlive是否缓存 和 isShown是否显示标题header;
 *     同时修改list, 子菜单的路由配置信息, meta信息;
 */
const menus = [
  {
    name: 'demo-class',
    icon: '&#xe62a',
  },
  {
    name: 'es6-class',
    icon: '&#xe62a',
  },
  {
    name: 'event-hub',
    icon: '&#xe62a',
    // list: ['parent', 'child', 'bus'],
    list: [
      { name: 'parent', meta: { keepAlive: true } },
      { name: 'child', meta: { keepAlive: true } },
      { name: 'bus', meta: { keepAlive: true } },
    ],
  },
  {
    name: 'filter-color',
    icon: '&#xe62a',
  },
  {
    name: 'image-onload',
    icon: '&#xe62a',
  },
  {
    name: 'indexedDB',
    icon: '&#xe62a',
    // list: ['index', 'dexie', 'indexedDB'],
    list: [
      { name: 'indexedDB-index', meta: { keepAlive: true } },
      { name: 'dexie', meta: { keepAlive: true } },
      { name: 'indexedDB', meta: { keepAlive: true } },
    ],
  },
  {
    name: 'inheritAttrs',
    icon: '&#xe62a',
  },
  {
    name: 'keep-alive',
    icon: '&#xe62a',
    list: [
      { name: 'keep-index', meta: { keepAlive: true } },
      { name: 'keep-alive', meta: { keepAlive: true } },
      { name: 'keep-not', meta: { keepAlive: true } },
    ],
  },
  {
    name: 'mock',
    icon: '&#xe62a',
    list: [
      { name: 'mock', meta: { keepAlive: true } },
      { name: 'mock-user' },
      { name: 'mock-article' },
    ],
  },
  {
    name: 'npm-plugins',
    icon: '&#xe62a',
    list: [
      { name: 'plugins-list', meta: { keepAlive: true } },
      { name: 'vue-better-scroll' },
    ],
  },
  {
    name: 'point-events',
    icon: '&#xe62a',
    list: [
      { name: 'point-events-list' },
      { name: 'none2' },
    ],
  },
  {
    name: 'video',
    icon: '&#xe62a',
  },
  {
    name: 'vue-masonry',
    icon: '&#xe62a',
    list: [
      { name: 'masonry-list' },
      { name: 'vue-masonry' },
      { name: 'scroll-masonry' },
    ],
  },
  {
    name: 'vue-slick',
    icon: '&#xe62a',
  },
  {
    name: 'vue-ztree',
    icon: '&#xe62a',
  },
];

export default menus;
