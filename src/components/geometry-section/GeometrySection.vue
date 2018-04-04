<script>
import InputNumber from '../../common/components/input-number/InputNumber.vue';
import ItemNameRow from '../item-name-row/ItemNameRow.vue';

export default {
  name: 'GeometrySection',
  components: {
    ItemNameRow,
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
      <span class="label">Type:</span>
      Mesh
    </div>

    <item-name-row name="Mesh" />

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
