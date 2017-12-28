// extends 和 mixins 基本相同，其不同之处在于:
// 1. extends 优先级高于 mixins;
// 2. extends 在实例组件中，只能是一个对象或函数，mixins可以是数组;
export default {
  created() {
    console.log('extend22的created');
  },
  data() {
    return {
      name: 'extend2',
    }
  },
}

// 导出函数
export function getData(dataSource, getMethod) {
  return {
    created() {
      this.list = dataSource;
    },
    methods: {
      changeData() {
        this.list = getMethod();
      },
    },
    data() {
      return {
        list: [],
      }
    },
  }
}
