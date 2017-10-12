//因为ES6写起来简洁，所以用ES6写法来作说明
//IDBTransacation接口由IndexedDB API提供，异步transaction使用数据库中的事件对象属性。
// 所有的读取和写入数据均在transactions中完成。由IDBDatabase发起transaction，
// 通过IDBTransaction 来设置transaction的模式（例如是否只读或读写），以及通过IDBObjectStore来获得一个request。同时你也可以使用它来中止transactions。

let idxDB = {
    db: {},
    transaction: {},
    startTransaction() {
        //一个IDBTransacation只能使用一次
        //创建transaction有3个要求，一、有connection(数据库连接)，二、storeName(读取的store名)、三、mode(包括readonly，readwrite和versionchange)
        this.transaction = this.db.transaction("diary", 'readwrite');
        this.transaction.oncomplete = () => console.log("transaction complete");
        this.transaction.onerror = e => console.dir(e);
    },
    initDB() {
        //下面一行代码，以数据库名(danote)和版本号(1)为参数，异步打开一个数据库
        let request = indexedDB.open('danote', 1);
        request.onerror = e => console.log(e.currentTarget.error.message);
        request.onsuccess = e => this.db = e.target.result;
        request.onupgradeneeded = e => {
            //如果之前数据库不存在，也会运行onupgradeneeded
            //新建objectStore
            let thisDB = e.target.result;
            if (!thisDB.objectStoreNames.contains("diary")) {
                let objStore = thisDB.createObjectStore("diary", {
                    keyPath: "id",
                    autoIncrement: true
                });
                //第一个参数是index名称，第二个参数是keyPath
                objStore.createIndex("by_create_date", "create_date", {
                    unique: false
                });
            }
        };
    },
    closeDB() {
        //主动close一个connection(其实没什么意义，在被垃圾回收机制清除或创建上下文被destroy，connection会自动close)
        db.close();
    },
    deleteDB() {
        indexedDB.deleteDatabase('danote');
    },
    addData(data, cb) {
        this.startTransaction();
        //Object Store是indexedDB的主要储存机制
        //IDBTransaction.objectStore()返回你查询的objectStore(IDBObjectStore对象)
        let objectStore = this.transaction.objectStore("diary");
        let request = objectStore.add(data);
        request.onsuccess = () => {
            if (cb) cb({
                error: 0,
                data: data
            })
        };
        request.onerror = () => {
            if (cb) cb({
                error: 1
            })
        };
    },
    clearObjectStore(id, cb) {
        this.startTransaction();
        let objectStore = this.transaction.objectStore("diary");
        let request = objectStore.clear();
        request.onsuccess = () => {
            if (cb) cb({
                error: 0,
                data: id
            });
        };
        request.onerror = () => {
            if (cb) cb({
                error: 1
            });
        };
    },
    addmData(mdata, cb) {
        this.startTransaction();
        let objectStore = this.transaction.objectStore("diary");
        for (let c = 0; c < mdata.length; c++) {
            let request = objectStore.add(mdata[c]);
            request.onerror = () => {
                if (cb) cb({
                    error: 1
                })
            }
        }
    },
    deleteData(id, cb) {
        this.startTransaction();
        let objectStore = this.transaction.objectStore("diary");
        let request = objectStore.delete(id);
        request.onsuccess = () => {
            if (cb) cb({
                error: 0,
                data: id
            })
        };
        request.onerror = () => {
            if (cb) cb({
                error: 1
            })
        }
    },
    getDataById(id, cb) {
        this.startTransaction();
        let objectStore = this.transaction.objectStore("diary");
        let request = objectStore.get(id);
        request.onsuccess = () => {
            if (cb) cb({
                error: 0,
                data: e.target.result
            })
        };
        request.onerror = () => {
            if (cb) cb({
                error: 1
            })
        }
    },
    getDataAll(cb) {
        this.startTransaction();
        let objectStore = this.transaction.objectStore("diary");
        let rowData = [];
        objectStore.openCursor(IDBKeyRange.lowerBound(0)).onsuccess = (e) => {
            let cursor = e.target.result;
            if (!cursor && cb) {
                cb({
                    error: 0,
                    data: rowData
                });
                return;
            }
            rowData.unshift(cursor.value);
            cursor.continue();
        };
    },
    updateData(id, updateData, cb) {
        this.startTransaction();
        let objectStore = this.transaction.objectStore("diary");
        let request = objectStore.get(id);
        request.onsuccess = e => {
            let thisDB = e.target.result;
            for (key in updateData) {
                thisDB[key] = updateData[key];
            }
            objectStore.put(thisDB);
            if (cb) cb({
                error: 0,
                data: thisDB
            })
        };
        request.onerror = e => {
            if (cb) cb({
                error: 1
            })
        }
    },
    getDataBySearch(keywords, cb) {
        this.startTransaction();
        let objectStore = this.transaction.objectStore("diary");
        let boundKeyRange = IDBKeyRange.only(keywords);
        let rowData = [];
        objectStore.index("folder").openCursor(boundKeyRange).onsuccess = e => {
            let cursor = e.target.result;
            if (!cursor) {
                if (cb) cb({
                    error: 0,
                    data: rowData
                })
                return;
            }
            rowData.push(cursor.value);
            cursor.continue();
        };
    },
    getDataByPager(start, end, cb) {
        this.startTransaction();
        let objectStore = transaction.objectStore("diary");
        let boundKeyRange = IDBKeyRange.bound(start, end, false, true);
        //关于keyRange https://www.w3.org/TR/IndexedDB/#dfn-key-range
        let rowData = [];
        objectStore.openCursor(boundKeyRange).onsuccess = e => {
            let cursor = e.target.result;
            if (!cursor && cb) {
                cb({
                    error: 0,
                    data: rowData
                });
                return;
            }
            rowData.push(cursor.value);
            cursor.continue();
        };
    }
}
//objectStore的名称在例子里全都写死了，因为我只建了一个objectStore，使用时建议还是以参数传进函数
