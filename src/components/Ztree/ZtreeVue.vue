<template>
  <div :id="treeId" ref="ztree" class="ztree">
  </div>
</template>
<script>
  /* eslint-disable */
  // 引入Vue 和 jquery.ztree.js
  import Vue from 'vue'
  import '../../../node_modules/ztree/js/jquery.ztree.core';

  // 变量声明和配置;
  var index = 0
  var defaultSetting = {
    async: {
      enable: false,
      contentType: 'application/json',
      type: 'post',
      dataType: 'json'
    },

    data: {
      key: {
        name: 'label'
      }
    },

    callback: {}
  };

  export default {
    props: {
      // ztree 原生配置 参考 http://www.treejs.cn/v3/api.php
      setting: {
        type: Object,
        default: function () {
          return {}
        }
      },
      /**
       * options.url [String] 获取节点数据的接口
       * options.dataFilter [Function] 对接口返回数据对处理函数
       * options.params [Object] 调用接口时的参数
       */
      extraSetting: {
        type: Object,
        default: function () {
          return {}
        }
      },

      // 非懒加载
      data: {
        type: Array,
        default: function () {
          return []
        }
      }
    },

    data: function () {
      return {
        treeId: 'ztree-' + index++,
        currentSelectedNodeId: ''
      }
    },

    created() {
      var event = ['onDblClick', 'onMouseDown', 'onCheck', 'onCollapse',
        'onDblClick', 'onCollapse', 'onDrag', 'onDragMove', 'onDrop', 'onMouseUp', 'onNodeCreated', 'onRemove',
        'onRename', 'onRightClick', 'onClick', 'onExpand', 'onAsyncError', 'onAsyncSuccess']

      // _.each(event, (item) => {
      //     defaultSetting.callback[item] = this._treeEvent(item)
      // })
      event.forEach(item => {
        defaultSetting.callback[item] = this._treeEvent(item)
      })

      // 如果不是使用ztree自带的async做懒加载
      if (this.extraSetting.url) {
        defaultSetting.callback.onExpand = this._onExpand
        defaultSetting.callback.onClick = this._onClick
      }
    },

    mounted() {
      var setting = $.extend({}, defaultSetting, this.setting)
      this._setting = setting
      if (this.data.length > 0) {
        $.fn.zTree.init($(this.$el), setting, this.data)
      } else if (this.extraSetting.url) {
        $.fn.zTree.init($(this.$el), setting)
        this._load(null, true)
      }
    },

    methods: {
      // 初始化：
      _load(treeNode, inited) {
        $.ajax({
          type: this._setting.async.type,
          contentType: this._setting.async.contentType,
          url: this.extraSetting.url,
          data: this.extraSetting.params
        }).done((res) => {
          var treeNodes = []
          if (this.extraSetting.dataFilter) {
            treeNodes = this.extraSetting.dataFilter(res)
          }

          var treeObj = $.fn.zTree.getZTreeObj(this.treeId);
          treeObj.addNodes(treeNode, treeNodes);

          if (inited) {
            Vue.nextTick(() => {
              this.$emit('inited', treeNodes)
            })
          }
        })
      },
      // 展开;
      _onExpand(event, treeId, treeNode) {
        var treeObj = $.fn.zTree.getZTreeObj(this.treeId);

        this.$emit('on-expand', treeNode, event, treeId)

        if (this.extraSetting.url) {
          Vue.nextTick(() => {
            this._load(treeNode)
          })
        }
      },
      // 点击事件：
      _onClick(event, treeId, treeNode) {
        // 已选中节点避免重复选中
        if (treeNode.tId != this.currentSelectedNodeId) {
          this.$emit('on-click', treeNode, event, treeId)
          this.currentSelectedNodeId = treeNode.tId
        }
      },

      /***
       * 调用ztree的原生方法
       * @param actionName 必选 需要调用的原生ztree方法名称
       * @param args 可选参数 调用方法时传入的参数
       * @returns 调用ztree原生方法的返回值
       */
      action(actionName, ...args) {
        var treeObj = $.fn.zTree.getZTreeObj(this.treeId);
        return treeObj[actionName](...args);
      },

      _treeEvent(eventName) {
        return (...args) => {
          // Vue.util 上的方法在新版本 有些移除了
          // this.$emit(Vue.util.hyphenate(eventName), ...args)
          this.$emit(eventName.replace(/([a-zA-Z])([A-Z])/g, '$1-$2').toLowerCase(), ...args)
        }
      }
    }
  }
</script>

<style scoped>
/*第一套  */


/* @import '../../../node_modules/ztree/css/zTreeStyle/zTreeStyle.css';
	@import '../../../node_modules/ztree/css/metroStyle/metroStyle.css';  */


/*第二套  */

@import '../../assets/fontawesome/css/font-awesome.min.css';
@import './css/zTreeStyle/zTreeStyle.css';
@import './css/font-awesome-zTree.css';


/* 无用的css*/


/* @import '../../../node_modules/ztree/css/awesomeStyle/awesome.css';  */
</style>

