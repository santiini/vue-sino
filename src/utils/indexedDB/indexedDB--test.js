/**
 * indexedDB的封装;
 */
// 公共变量;
let database;

/**
 * 创建数据库;
 * @param {any} DBName
 * @param {any} tableName
 * @param {any} options
 * @returns
 */
function creatDatabase(DBName, tableName, options) {
    return new Promise((resolve, reject) => {
        // 创建数据库;
        const resource = window.indexedDB.open(DBName, 1);
        resource.onsuccess = (event) => {
          // resolve(resource.result);
          database = resource.result;
        };
        resource.onerror = (event) => {
          reject(resource.error);
        };
        // 第一次创建数据库时，创建一张表;
        resource.onupgradeneeded = (event) => {
          const db = resource.result,
          objectStore = db.createObjectStore(tableName, options);
          resolve(objectStore);
        };
    })
}

function saveToDB() {

}
