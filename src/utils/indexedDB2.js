/**
 * indexedDB的封装
 */
/* eslint-disable */
let localDatabase = {};
localDatabase.indexedDB =  window.indexedDB || window.mozIndexedDB  || window.webkitIndexedDB  || window.msIndexedDB;

export default {
  // window.indexedDB对象只有一个open方法，用于打开指定的数据库
  // 1、打开或创建数据库
  initIndexedDB(dbName, dbVersion = 1.0) {
    return new Promise((resolve, reject) => {
      let request = localDatabase.indexedDB.open(dbName, dbVersion);
      // request.result是执行指定操作的结果
      // 打开失败;
      request.onerror = (event) => {
        return reject(null)
      };
      // 打开成功;
      request.onsuccess = event => {
        // event.target.result = request.result;
        localDatabase._db = request.result;
        return resolve(request.result)
      };
      // 版本更新时
      // 通过request.onupgradeneeded可以执行改变数据库结构的操作函数（包括创建对象存储空间）
      request.onupgradeneeded = event => {
        // 获得数据库实例对象
        let db = request.result;
        localDatabase._db = db;
        //判断对象存储空间名称是否已经存在
        if (!db.objectStoreNames.contains('students')) {
          // 创建demo1对象存储空间;指定keyPath选项为id（即主键为id）
          const objectStore = db.createObjectStore('students', { keyPath: 'id'});
          // 对象存储空间students的列email上创建一个唯一索引email,可以创建多个索引。
          // 3个参数--
            // 1: 索引名;  2: 创建索引的列（即keyPath,索引属性字段名） 3: 索引选项(索引属性值是否唯一:true or false)
          objectStore.createIndex('nameIndex', 'name', { unique: true})
          objectStore.createIndex('ageIndex', 'age', { unique: false})

          console.log('objectstore created')
        }
        return resolve(request.result)
      }
    })
  },
  //  indexedDB的方法使用;
  // 参数1-dbName， 事务相关的objectstore，单个时可以用字符串，多个用数组形式;
  // method: 事务的操作方法;
  // ..args: 事务的相关参数;
  toPromise(dbName ,method, ...args) {
    try {
      return new Promise((resolve, reject) => {
        // 获取事务
        // localDatabase._db指向打开数据库后的是数据库实例;
        console.log(localDatabase._db)
        let transaction = localDatabase._db.transaction(dbName, 'readwrite');
        // 获取objectStore
        let objectStore = transaction.objectStore(dbName);
        // 获取事务请求
          // let req = trans.objectStore(this._storeName)[method](...args)
        let request = objectStore[method](...args);
        // 请求成功;
        request.onsuccess = event => resolve(event.target.result)
        // 请求失败;
        request.onerror = event => reject(request.error)
        // 事务失败
        transaction.onerror = event => reject(transaction.error)
      })
    } catch (err) {
      return Promise.reject(err);
    }
  },
  // 获取到事务和相关的objectStore

}

