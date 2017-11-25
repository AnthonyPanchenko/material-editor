<script>
import GeometryControls from './GeometryControls.vue';

export default {
  name: 'GeometrySection',
  components: {
    GeometryControls
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
      <span class="label">Type:</span> Mesh</div>
    <div class="name">
      <span class="label">Name:</span> Plane 18</div>

    <geometry-controls />
  </div>
</template>
