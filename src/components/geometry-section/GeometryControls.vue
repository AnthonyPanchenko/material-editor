<script>
import InputNumber from '../../common/components/input-number/InputNumber.vue';

export default {
  name: 'GeometryControls',
  components: {
    InputNumber,
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
  <div class="controls scroll-box">
    <div class="row">
      <span class="label">Height</span>
      <input-number />
    </div>

    <div class="row">
      <span class="label">Width</span>
      <input-number />
    </div>
  </div>
</template>
