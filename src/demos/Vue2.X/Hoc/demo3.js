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

const HOC04 = WrappedComponent => ({
  props: typeof WrappedComponent === 'function'
    ? WrappedComponent.options.props
    : WrappedComponent.props,
  mounted() {
    console.log('mouted!');
  },
  // abstract: true,
  render(_) {
    const h = this.$parent.$createElement
    const slots = Object.keys(this.$slots).reduce((arr, key) => arr.concat(this.$slots[key]), []);
    console.log(slots)
    return h(WrappedComponent, {
      attrs: this.$attrs,
      props: this.$props,
      on: this.$listeners,
    }, slots);
  },
});

console.log(typeof Vue.extend({}), Vue.extend({}))

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
    EnhancedComponent4: HOC04(BaseComponent),
  },
});
