<template>
  <div class="fieldset" v-if="!Object.keys(object).length" />

  <div v-else class="fieldset">
    <div class="type">
      <span class="label">Type:</span>
      <span class="title">{{ object['type'] }}</span>
    </div>

    <item-name-row :name="object['name']" :onApply="onSetNewObjectName" />

    <div class="controls scroll-box">
      <div class="row">
        <label class="label">Position</label>
        <input-number prefix="X:" :name="0" :value="getValue(oProps.POSITION, 0)" :onChange="onChangePosition" />
        <input-number prefix="Y:" :name="1" :value="getValue(oProps.POSITION, 1)" :onChange="onChangePosition" />
        <input-number prefix="Z:" :name="2" :value="getValue(oProps.POSITION, 2)" :onChange="onChangePosition" />
      </div>

      <div class="row">
        <label class="label">Rotation</label>
        <input-number prefix="X:" sufix="°" :name="0" :value="getValue(oProps.ROTATION, 0)" :onChange="onChangeRotation" />
        <input-number prefix="Y:" sufix="°" :name="1" :value="getValue(oProps.ROTATION, 1)" :onChange="onChangeRotation" />
        <input-number prefix="Z:" sufix="°" :name="2" :value="getValue(oProps.ROTATION, 2)" :onChange="onChangeRotation" />
      </div>

      <div class="row">
        <label class="label">Scale</label>
        <input-number prefix="X:" :name="0" :value="getValue(oProps.SCALE, 0)" :onChange="onChangeScale" />
        <input-number prefix="Y:" :name="1" :value="getValue(oProps.SCALE, 1)" :onChange="onChangeScale" />
        <input-number prefix="Z:" :name="2" :value="getValue(oProps.SCALE, 2)" :onChange="onChangeScale" />
      </div>

      <div class="row">
        <label class="label">Frustum Culled</label>
        <checkbox-btn :name="oProps.FRUSTUMCULLED" :checked="object[oProps.FRUSTUMCULLED]" :onChange="onChangeCheckBox" />
      </div>

      <div class="row">
        <label class="label">Cast shadow</label>
        <checkbox-btn :name="oProps.CASTSHADOW" :checked="object[oProps.CASTSHADOW]" :onChange="onChangeCheckBox" />
      </div>

      <div class="row">
        <label class="label">Receive shadow</label>
        <checkbox-btn :name="oProps.RECEIVESHADOW" :checked="object[oProps.RECEIVESHADOW]" :onChange="onChangeCheckBox" />
      </div>

      <div class="row">
        <label class="label">Visible</label>
        <checkbox-btn :name="oProps.VISIBLE" :checked="object[oProps.VISIBLE]" :onChange="onChangeCheckBox" />
      </div>
    </div>
  </div>
</template>

<script>
import { noop, emptyObject } from '../../common/utils/base-helper';
import oProps from '../../common/constants/object-properties';

import ItemNameRow from '../item-name-row/ItemNameRow.vue';
import InputNumber from '../../common/components/input-number/InputNumber.vue';
import CheckboxBtn from '../../common/components/checkbox-btn/CheckboxBtn.vue';

export default {
  name: 'ObjectEditor',
  props: {
    onSetNewObjectName: { type: Function, default: noop },
    onChange: { type: Function, default: noop },
    object: { type: Object, default: emptyObject }
  },
  components: {
    ItemNameRow,
    InputNumber,
    CheckboxBtn
  },
  data() {
    return {
      oProps
    };
  },
  methods: {
    getValue(valueOf, index) {
      return this.object[valueOf] && this.object[valueOf][index] || 0;
    },
    onChangePosition(value, index) {
      const copyArr = [...this.object[this.oProps.POSITION]];
      copyArr[index] = value;

      this.onChange({ value: copyArr, fieldName: this.oProps.POSITION, id: this.object.id });
    },
    onChangeRotation(value, index) {
      const copyArr = [...this.object[this.oProps.ROTATION]];
      copyArr[index] = value;

      this.onChange({ value: copyArr, fieldName: this.oProps.ROTATION, id: this.object.id });
    },
    onChangeScale(value, index) {
      const copyArr = [...this.object[this.oProps.SCALE]];
      copyArr[index] = value;

      this.onChange({ value: copyArr, fieldName: this.oProps.SCALE, id: this.object.id });
    },
    onChangeCheckBox(value, fieldName) {
      this.onChange({ value, fieldName, id: this.object.id });
    }
  }
};
</script>
