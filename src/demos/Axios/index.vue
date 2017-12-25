<template lang="pug">
  .demo-axios-cancel
    group(title="axios")
      x-button(@click.native="requestCancel") demo1-cancel
</template>

<script>
  import { Group, Cell, XButton } from 'vux'
  import axios, { CancelToken } from 'axios'

  export default {
    name: 'demo-axios-cancel',
    components: {
      Group, Cell, XButton,
    },
    methods: {
      requestCancel() {
        const connectToServer = (ip) => {
          const source = CancelToken.source();
          setTimeout(() => {
            source.cancel();
          }, 250);
          return axios.get('https://cnodejs.org/api/v1/topics', { cancelToken: source.token })
            .then((result) => {
              console.log('11111111111')
            })
            .catch((err) => {
              console.log(2222222222222)
            })
        };
        connectToServer()
      },
    },
  }
</script>
