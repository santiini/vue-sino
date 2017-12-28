import Vue from 'vue'

const BaseComponent = {
  props: ['foo'],
  template: `
  <div>
    <h5 @click="emitHello">① emit event (must be alert twice time)</h5>
    <code>② props:{{JSON.stringify(this.$props)}}</code>
    <slot name="test"></slot>
    <p>④ between slots</p>
    <slot></slot>
  </div>
  `,
  methods: {
    emitHello() {
      this.$emit('hello');
    },
  },
}

/* const HOC01 = WrappedComponent => ({
   render (h) {
      return h(WrappedComponent, {props: this.$props});
   }
});

const HOC02 = WrappedComponent => ({
   props: WrappedComponent.props,
   render (h) {
      return h(WrappedComponent, { props: this.$props });
   }
});

const HOC03 = WrappedComponent => ({
  functional: true,
  render (h, c) {
      return h(WrappedComponent, c.data, c.children);
   }
}); */

const HOC04 = WrappedComponent => ({
  props: typeof WrappedComponent === 'function'
    ? WrappedComponent.options.props
    : WrappedComponent.props,
  mounted() {
    console.log('mounted!');
  },
  render(h) {
    return h(WrappedComponent, {
      attrs: this.$attrs,
      props: this.$props,
      on: this.$listeners,
      scopedSlots: {
        default: () => this.$slots.default,
        test: () => this.$slots.test,
      },
    });
  },
});

/*
const HOC05 = WrappedComponent => ({
  template: `<wrapped v-on="$listeners" v-bind="$attrs"><slot/></wrapped>`,
  components: {
      'wrapped': WrappedComponent,
  },
});
*/

// console.log(typeof Vue.extend({}),Vue.extend({}))

export default new Vue({
  el: '#demo',
  methods: {
    hello() {
      alert('Hello!!');
    },
    native() {
      alert('Native!!');
    },
  },
  components: {
    BaseComponent,
//        EnhancedComponent1: HOC01(BaseComponent),
//        EnhancedComponent2: HOC02(BaseComponent),
//        EnhancedComponent3: HOC03(BaseComponent),
    EnhancedComponent4: HOC04(BaseComponent),
//        EnhancedComponent5: HOC05(BaseComponent),
  },
});
