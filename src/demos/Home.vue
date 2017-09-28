<template lang="pug">
  div
    .vux-demo
      img.logo(src="../assets/vux_logo.png")
    group(title="demos")
      cell(title="VUX" link="/demos" )
        <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
</template>

<script>
import { Group, Cell } from 'vux';

export default {
  components: {
    Group,
    Cell,
  },
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
    };
  },
};
</script>

<style lang="stylus">
  .vux-demo
    text-align center
  .logo
    width 100px
    height 100px
  .demo-icon
    margin-right 15px
</style>
