<script>
import emptyObject from '../../common/utils/emptyObject';

import CheckboxBtn from '../../common/components/checkbox-btn/CheckboxBtn.vue';
import InputNumber from '../../common/components/input-number/InputNumber.vue';
import ItemNameRow from '../item-name-row/ItemNameRow.vue';

export default {
  name: 'GeometrySection',
  props: {
    geometry: { type: Object, default: emptyObject }
  },
  components: {
    CheckboxBtn,
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
      <span class="title">Mesh</span>
    </div>

    <item-name-row name="Mesh" />

    <div class="controls scroll-box">

      <div class="row">
        <label class="label">Radius</label>
        <input-number />
      </div>

      <div class="row">
        <label class="label">Tube</label>
        <input-number />
      </div>

      <div class="row">
        <label class="label">Segments</label>
        <input-number />
      </div>

      <div class="row">
        <label class="label">Radius top</label>
        <input-number />
      </div>

      <div class="row">
        <label class="label">Radius bottom</label>
        <input-number />
      </div>

      <div class="row">
        <label class="label">Height</label>
        <input-number />
      </div>

      <div class="row">
        <label class="label">Width</label>
        <input-number />
      </div>

      <div class="row">
        <label class="label">Depth</label>
        <input-number />
      </div>

      <div class="row">
        <label class="label">Radial segments</label>
        <input-number />
      </div>

      <div class="row">
        <label class="label">Height segments</label>
        <input-number />
      </div>

      <div class="row">
        <label class="label">Width segments</label>
        <input-number />
      </div>

      <div class="row">
        <label class="label">Depth segments</label>
        <input-number />
      </div>

      <div class="row">
        <label class="label">Theta start</label>
        <input-number />
      </div>

      <div class="row">
        <label class="label">Theta length</label>
        <input-number />
      </div>

      <div class="row">
        <label class="label">Detail</label>
        <input-number />
      </div>

      <div class="row">
        <label class="label">Arc</label>
        <input-number />
      </div>

      <div class="row">
        <label class="label">Open ended</label>
        <checkbox-btn />
      </div>
    </div>
  </div>
</template>
