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
    list: ['parent', 'child', 'bus'],
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
    list: ['index', 'dexie', 'indexedDB'],
  },
  {
    name: 'inheritAttrs',
    icon: '&#xe62a',
  },
];

export default menus;
