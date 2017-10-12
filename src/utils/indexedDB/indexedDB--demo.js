/**
 * indexedDB的学习
 */
let _IDB_ = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

class IDBProvider {

  constructor() {
    // DB
    this._db = null
    // 实例
    this._instance = null
    // store Name
    this._storeName = IDBProvider._storeName
  }

  // 获取indexedDB事务;
  get transaction() {
    return this
      ._db
      .transaction([this._storeName], IDBTransaction.READ_WRITE || 'readwrite')
  }

  // 把indexedDB的方法转换为Promise
  _toPromise(method, ...args) {
    try {
      return new Promise((resolve, reject) => {
        // 获得事务
        let trans = this.transaction
        // 获得请求
        let req = trans.objectStore(this._storeName)[method](...args)
        // 请求成功
        req.onsuccess = event => resolve(event.target.result)
        // 请求失败
        req.onerror = event => reject(req.error)
        // 事务失败
        trans.onerror = event => reject(trans.error)
      })
    } catch (err) {
      Promise.reject(err)
    }
  }

  // 获取indexed数据库实例;
  static getInstance(dbVersion = 1.0) {
    if (this._instance) {
      Promise.resolve(this._instance)
    }
    return new Promise((resolve, reject) => {
      let request = _IDB_.open(IDBProvider._dbName, dbVersion)
      request.onerror = event => {
        return reject(null)
      }
      request.onsuccess = event => {
        let db = request.result
        // 老版本，新版本是onupgradeneeded
        if (db.setVersion && db.version !== dbVersion) {
          var setVersion = db.setVersion(dbVersion)
          setVersion.onsuccess = function () {
            db.createObjectStore(this._storeName)
            this._instance = new IDBProvider()
            this._instance._db = request.result
            return resolve(this._instance)
          }
        } else {
          this._instance = new IDBProvider()
          this._instance._db = request.result
          return resolve(this._instance)
        }
      }
      request.onupgradeneeded = event => {
        event
          .target
          .result
          .createObjectStore(this._storeName)
      }
    })
  }

  // 清除数据库
  clear() {
    return this
      ._toPromise('clear')
      .then(r => true)
  }

}

window.FileSystem = IDBProvider
