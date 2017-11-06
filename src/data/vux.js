/**
 * vux 组件的相关路由页面
 */
const vux = [
  // { name: 'vux-list', isHome: true },
  {
    name: 'selector',
    meta: {
      keepAlive: false,
    },
  },
  { name: 'datetime-range' },
  { name: 'datetime-view' },
  { name: 'datetime-picker', component: 'VuxComponents/Components/DatetimeRange' },
  { name: 'picker-datetime', component: 'VuxComponents/Components/DatetimePicker' },
];

export default vux;
