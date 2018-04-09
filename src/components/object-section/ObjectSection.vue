<script>
import emptyObject from '../../common/utils/emptyObject';

import ItemNameRow from '../item-name-row/ItemNameRow.vue';
import InputNumber from '../../common/components/input-number/InputNumber.vue';
import CheckboxBtn from '../../common/components/checkbox-btn/CheckboxBtn.vue';

export default {
  name: 'ObjectSection',
  props: {
    object: { type: Object, default: emptyObject }
  },
  components: {
    ItemNameRow,
    InputNumber,
    CheckboxBtn
  },
  data() {
    return {};
  },
  methods: {
    onChangeNumberInput(value, name, min, max, step) {
      console.log(value, name, min, max, step);
    },
    onChangeCheckBox(state, value, name) {
      console.log(state, value, name);
    }
  }
};
</script>

<template>
  <div class="fieldset">
    <div class="type">
      <span class="label">Type:</span>
      <span class="title">BoxBufferGeometry</span>
    </div>

    <item-name-row name="Box" />

    <div class="controls scroll-box">
      <div class="row">
        <label class="label">Position</label>
        <input-number prefix="X:" />
        <input-number prefix="Y:" />
        <input-number prefix="Z:" />
      </div>

      <div class="row">
        <label class="label">Rotation</label>
        <input-number prefix="X:" sufix="°" />
        <input-number prefix="Y:" sufix="°" />
        <input-number prefix="Z:" sufix="°" />
      </div>

      <div class="row">
        <label class="label">Scale</label>
        <input-number prefix="X:" />
        <input-number prefix="Y:" />
        <input-number prefix="Z:" />
      </div>

      <div class="row">
        <label class="label">Shadow</label>
        <checkbox-btn class="check-box" sufix="cast" name="n2ame31" value="value1" :onChange="onChangeCheckBox" />
        <checkbox-btn class="check-box" sufix="receive" name="n2ame31" value="value1" :onChange="onChangeCheckBox" />
      </div>

      <div class="row">
        <label class="label">Visible</label>
        <checkbox-btn name="visible" :checked="false" />
      </div>

      <div class="row">
        <label class="label">Frustum Culled</label>
        <checkbox-btn name="frustumCulled" :checked="false" />
      </div>
    </div>
  </div>
</template>
