/**
 * dexie --indexedDB的封装库;
 */
/* eslint-disable import/no-extraneous-dependencies */
import Dexie from 'dexie';
import IndexedDB from './IndexedDb';

export default {
  install(Vue, options = {}) {
    const db = new Dexie(options.name || 'database');
    const indexedDB = new IndexedDB(db);
    // Define a schema -- 建表
    Dexie.exists(name)
      .then((isExist) => {
        if (!isExist) {
          db.version(1).stores({
            // circle: '&id,name,beginTime,endTime', // 巡检列表;
            // circleTask: '&id,userName,beginTime,endTime,buildings,path,pathDetail', // 巡检详情
            // room: '&id,checks,types,checkValueJson', // 机房
            // submit: 'taskId,url,method,params',
            // roomSubmit: '++id,taskId,roomId,url,method,data,[taskId+roomId]', // 机房检查项提交
            // equipmentSubmit: '++id,taskId, type,url,method,data,[taskId+type]', // 设备检查项提交
            // errorSubmit: '++id,taskId,facilityId,url,method,data,[taskId+facilityId]', // 设备错误提交
            // formSubmit: '++id,taskId,facilityId,url,method,data,[taskId+facilityId]', // 机房form提交
            // circleTask: '$id,userName,createTime,beginTime,buildings',
            // message: '&id,name,time,username',
            // operator: '&id,name,beginTime,endTime', // 操作票列表
            // operatorTask: '&id,name,beginTime,endTime', // 操作票详情
            // errorFile: '&facilityId,imgPaths,audioPaths,videoPaths', // 待上传文件的路径;

            // friends: '&id, name, age', // id来源于已经有的id
            friends: '++id, name, age', // id是有indexedDB自生成的id -- id必须传入
            gameSessions: '&id, score',
          });
          db.open()
            .catch((err) => {
              console.log(err);
            })
        }
      })
      .catch((err) => {
        console.error(err.stack || err);
      })
    /* eslint-disable no-param-reassign */
    Vue.prototype.$DB = indexedDB; // 指向封装库
    Vue.prototype.$db = db; // 指向dexie的实例
    Vue.$database = indexedDB;
  },
};
