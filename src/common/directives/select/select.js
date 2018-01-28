const select = {
  bind(el, obj, vNode) {
    console.log('bind');
    console.log(el);
    console.log(obj.value);
    console.log(vNode);
  },
  inserted(el, obj, vNode) {
    console.log('inserted');
    // if (!binding.value) {
    //   return;
    // }
    console.log(el);
    console.log(obj.value);
    console.log(vNode);
  },
  update() {
    console.log('update');
  },
  componentUpdated() {
    console.log('componentUpdated');
  },
  unbind() {
    console.log('unbind');
  }
};

export default select;
