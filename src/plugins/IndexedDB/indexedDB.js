/**
 * 基于类的测试： class
 */
/* eslint-disable  */
export default class IndexedDB {
  // 传入dexie的实例
  constructor(dexie) {
    this.db = dexie;
    this.tables = this.db.tables;
  }

  /**
   * 单个数据查询
   * @param {any} table 查询的table名
   * @param {any} params  参数信息
   * @memberof IndexedDB
   */
  async getOne(table, params) {
    const result = await this.db[table].where(params).toArray();
    // result: [] or [data]
    const data = result.length > 0 ? result[0]: { };
    return getRestApi(data, 1000);
  }

  async getOneByKey(table, key) {
    const result = await this.db[table].get(key);
    return getRestApi(result, 1008);
  }

  /**
   * 查询列表数据:
   * @param {any} table tableName
   * @param {any} { username, page, pageSize }
   * @returns
   * @memberof IndexedDB
   */
  async getAll(table, { page, pageSize, ...params } = {}) {
    // 判断是否有传入参数 -- 获取所有列表
    // console.log(params)
    if (!params || Object.keys(params).length < 1) {
      console.log('没有参数')
      const list = await this.db[table].toArray();
      return getRestApi({ list }, 1001);
    }
    // 判断是否根据参数查询
    if (!page) {
      const list = await this.db[table].where(params).toArray();
      return getRestApi({ list }, 1001);
    }
    // 查询排序
    // db.friends.orderBy('lastName').reverse().offset(10).limit(5);
    let count, list;
    const offset = (page - 1) * pageSize;
    if(Object.keys(params).length > 0) {
      count = this.db[table].where(params).count()
      list = await this.db[table].where(params)
        .offset(offset)
        .limit(pageSize)
        .toArray()
    } else {
      count = this.db[table].count()
      list = await this.db[table]
      .offset(offset)
      .limit(pageSize)
      .toArray()
    }
    const current = list.length;
    return getRestApi({ list, count, current }, 1001);
  }

  /**
   * 添加单项数据
   * @param {any} table
   * @param {any} data 添加时有唯一的keyPath, 不用indexedDB生成
   * @returns
   * @memberof IndexedDB
   */
  async addOne(table, data) {
    const result = await this.db[table].put(data)
    return getRestApi(data, 1002);
  }

  /**
   * 添加列表数据
   * @param {any} table
   * @param {any} list
   * @returns
   * @memberof IndexedDB
   */
  async addList(table, list) {
    const result = await this.db[table].bulkPut(list);
    return getRestApi(list, 10003);
  }

  /**
   * 查询并删除一个
   * @param {any} table
   * @param {any} params
   * @memberof IndexedDB
   */
  async deleteByParams(table ,params) {
    const result = await this.db[table].where(params).delete()
  }

  /**
   * 删除一个， Primary key： 唯一键
   * @param {any} table
   * @param {any} key
   * @returns
   * @memberof IndexedDB
   */
  async deleteOne(table, key) {
    const result = await this.db[table].delete(key)
    return getRestApi(result, 1004);
  }

  /**
   * 删除多个
   * @param {any} table
   * @param {any} keys
   * @returns
   * @memberof IndexedDB
   */
  async bulkDelete(table, keys) {
    const result = await this.db[table].bulkDelete(keys)
    return getRestApi(result, 1005);
  }

  /**
   * 清除某张表的所有内容
   * @param {any} table
   * @memberof IndexedDB
   */
  async clearTable(table) {
    const result = await this.db[table].clear()
  }

  /**
   * 更新一个
   * @param {any} table
   * @param {any} key 唯一key
   * @param {any} changes
   * @returns
   * @memberof IndexedDB
   */
  async updateOne(table, key, changes) {
    // update 和 put 的区别:
    // update: 数据更新; put: 完全的数据覆盖, 以前的多余属性会消失掉;
    const result = await this.db[table].update(key, changes)
    const newData = await this.db[table].get(key);
    return getRestApi(newData, 1006);
  }

  /**
   * 按条件更新 -- 无法获取唯一key, 根据条件获取数据，更新数据
   * @param {any} table
   * @param {any} {key, value, changes}
   * @returns
   * @memberof IndexedDB
   */
  async updateByParams(table, {key, value, changes}) {
    const result = await this.db[table].where(key).equals(value).modify(changes);
    return getRestApi(result, 1007);
  }

  /**
   * 有则更新，没有就添加 -- 查询条件多样化;
   * @param {any} table
   * @param {any} params  查询条件
   * @param {any} data
   * @memberof IndexedDB
   */
  async putData (table, params, data) {
    const result = await this.db[table].where(params).toArray()
    if (!!result && result.length > 0) {
      await this.db[table].where(params).modify(data);
    } else {
      await this.db[table].add(data);
    }
  }
}


/**
 * 根据code 返回错误信息;
 * @param {any} code
 * @returns
 */
function getErrorMsg(code) {
  let msg;
  switch (code) {
    case 10001:
      msg = '用户不存在';
      break;
    default:
      msg = '请求错误'
  }
  return msg;
}

/**
 * 把在线，离线封装成一个错误处理出口;
 * @param {any} func
 * @returns
 */
function getRestApi(data, code) {
  console.log(data)
  if (!data) {
    return { status: -1, msg: getErrorMsg(code) };
  }
  // 用户data：包涵所有数据结果，与后台形式保持一致;
  return { status: 200, msg: 'success', data };
  // return { status: 200, msg: 'success', ...result };
}
