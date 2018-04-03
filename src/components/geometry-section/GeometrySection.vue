<script>
import InputNumber from '../../common/components/input-number/InputNumber.vue';

export default {
  name: 'GeometrySection',
  components: {
    InputNumber
  },
  data() {
    return {};
  },
  methods: {
    onChangeNumberInput(value, name, min, max, step) {
      console.log(value, name, min, max, step);
    }
  }
};
</script>

<template>
  <div class="fieldset">
    <div class="type">
      <span class="label">Type:</span> Mesh</div>
    <div class="name">
      <span class="label">Name:</span> Plane 18</div>

    <div class="controls scroll-box">
      <div class="row">
        <label class="label">Height</label>
        <input-number />
      </div>

      <div class="row">
        <label class="label">Width</label>
        <input-number />
      </div>
    </div>
  </div>
</template>
