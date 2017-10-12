<template>
  <div class="demo-point-none2">
    <ul class="demo-container">
      <li class="grad_top poniter_event_none">
      </li>
      <li class="flex">
        <a href="#"  class="item-image">
          <img :src="require('@/assets/logo.png')">
        </a>
        <div class="flex-1 flex">
          <div><a href="#">链接</a></div>
          <div>此情可待成追忆，只是当时已惘然。无边落木萧萧下，不尽长江滚滚来</div>
        </div>
      </li>
      <li class="flex">
        <a href="#" class="item-image">
          <img :src="require('@/assets/logo.png')">
        </a>
        <div class="flex-1 flex">
          <div><a href="#">链接</a></div>
          <div>此情可待成追忆，只是当时已惘然。无边落木萧萧下，不尽长江滚滚来</div>
        </div>
      </li>
      <li class="flex">
        <a href="#" class="item-image">
          <img :src="require('@/assets/logo.png')">
        </a>
        <div class="flex-1 flex">
          <div><a href="#">链接</a></div>
          <div>此情可待成追忆，只是当时已惘然。无边落木萧萧下，不尽长江滚滚来</div>
        </div>
      </li>
      <li class="flex">
        <a href="#" class="item-image">
          <img :src="require('@/assets/logo.png')">
        </a>
        <div class="flex-1 flex">
          <div><a href="#">链接</a></div>
          <div>此情可待成追忆，只是当时已惘然。无边落木萧萧下，不尽长江滚滚来</div>
        </div>
      </li>
      <li class="grad_bottom poniter_event_none"></li>
    </ul>
    <!--渐变-->
    <divider>分割线</divider>
    <div class="linear-demo"></div>
  </div>
</template>

<style lang="stylus" scoped>
  .demo-point-none2
    padding 10px
    font-size 14px
  a {
    white-space: nowrap;
  }
  .item-image img {
    width: 50px;
    height: 50px;
  }
  .demo-container {
    position: relative;
    margin-top: 20px;
    li:not(:first-child) {
      margin-top: 10px;
    }
  }
  .grad_top, .grad_bottom {
    height: 80px;
    width: 100%;
    position: absolute;
    pointer-events: none;
  }
  .grad_top {
      /* 上渐变 */
    top: 0;
    // background: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(rgba(255, 255, 255, 0)));
    // background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(rgba(255, 255, 255, 0)));
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(rgba(255, 255, 255, 0)));
  }
  .grad_bottom {
      /* 下渐变 */
      bottom: 0;
      background: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(255, 255, 255, 0)), to(#fff));
  }
  .poniter_event_none {
    pointer-events: none;
  }
  .item-icon {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('../../assets/logo.png');
    height: 40px;
    max-width: 40px;
    width: 100%;
  }
  .linear-demo {
    width: 130px;
    height: 130px;
    border: 1px solid green;
    padding: 10px;
    background: -webkit-gradient(linear, left top, left bottom, from(#00abeb), to(#fff));
    -webkit-background-origin: padding;
    -webkit-background-clip: content;
  }
  .flex
    display flex
    position positive
  .flex-1
    flex 1
</style>

<script>
  // tips: point-events:none值还指示鼠标事件穿过该元素，并指向位于元素下面的元素
  // ul中的第一个和最后一个li，虽然挡住了中间的内容部分，但是并不影响中间内容的点击事件
  // 因为：point-events:none 使第一个和最后一个li鼠标事件无效，点击事件直接穿透到下面的元素;
  import { XButton, Divider } from 'vux';

  export default {
    name: 'point-events',
    components: {
      XButton, Divider,
    },
  }
</script>
