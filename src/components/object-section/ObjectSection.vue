<script>
import ObjectControls from './ObjectControls.vue';

export default {
  name: 'ObjectSection',
  components: {
    ObjectControls
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<template>
  <div class="fieldset">
    <div class="type">
      <span class="label">Type:</span> BoxBufferGeometry</div>
    <div class="name">
      <span class="label">Name:</span> Box</div>

    <object-controls />
  </div>
</template>
