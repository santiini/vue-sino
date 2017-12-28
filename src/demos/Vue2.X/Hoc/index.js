/**
 * vue-hoc 探索
 */

/* eslint-disable no-unused-vars */

const Hoc1 = WrappedComponent => ({
  // props 继承
  props: typeof WrappedComponent === 'function'
    ? WrappedComponent.options.props
    : WrappedComponent.props,
  // render 函数
  render(h) {
    // slots 渲染
    const slots = Object.keys(this.$slots).reduce((arr, key) => arr.concat(this.$slots[key]), []);
    return h(
      WrappedComponent, {
        attrs: this.$attrs,
        props: this.$props,
        on: this.$listeners,
      },
      slots,
    );
  },
});


const Hoc2 = WrappedComponent => ({
  props: typeof WrappedComponent === 'function'
    ? WrappedComponent.options.props
    : WrappedComponent.props,
  render(h) {
    const slots = this.$slots;
    const scopedSlots = {};
    // Object.keys(slots).map(key => (scopedSlots[key] = () => slots[key]));
    Object.keys(slots).forEach((key) => { scopedSlots[key] = () => slots[key] });
    return h(
      WrappedComponent,
      {
        attrs: this.$attrs,
        props: this.$props,
        on: this.$listeners,
        scopedSlots,
      });
  },
});


const Hoc3 = WrappedComponent => ({

});

