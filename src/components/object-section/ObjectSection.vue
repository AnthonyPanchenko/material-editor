<script>
import noop from '../../common/utils/noop';
import emptyObject from '../../common/utils/emptyObject';

import oProps from '../../common/constants/object-properties';

import ItemNameRow from '../item-name-row/ItemNameRow.vue';
import InputNumber from '../../common/components/input-number/InputNumber.vue';
import CheckboxBtn from '../../common/components/checkbox-btn/CheckboxBtn.vue';

export default {
  name: 'ObjectSection',
  props: {
    onApplyNewObjectName: { type: Function, default: noop },
    onChangePosition: { type: Function, default: noop },
    onChangeRotation: { type: Function, default: noop },
    onChangeScale: { type: Function, default: noop },
    onChangeCheckBox: { type: Function, default: noop },
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
  }
};
</script>

<template>
  <div class="fieldset">
    <div class="type">
      <span class="label">Type:</span>
      <span class="title">{{ object['type'] }}</span>
    </div>

    <item-name-row :name="object['name']" :onApply="onApplyNewObjectName" />

    <div class="controls scroll-box">
      <div class="row">
        <label class="label">Position</label>
        <input-number prefix="X:" :name="0" :value="object[oProps.POSITION] && object[oProps.POSITION][0] || 0" :onChange="onChangePosition" />
        <input-number prefix="Y:" :name="1" :value="object[oProps.POSITION] && object[oProps.POSITION][1] || 0" :onChange="onChangePosition" />
        <input-number prefix="Z:" :name="2" :value="object[oProps.POSITION] && object[oProps.POSITION][2] || 0" :onChange="onChangePosition" />
      </div>

      <div class="row">
        <label class="label">Rotation</label>
        <input-number prefix="X:" sufix="°" :name="0" :value="object[oProps.ROTATION] && object[oProps.ROTATION][0] || 0" :onChange="onChangeRotation" />
        <input-number prefix="Y:" sufix="°" :name="1" :value="object[oProps.ROTATION] && object[oProps.ROTATION][1] || 0" :onChange="onChangeRotation" />
        <input-number prefix="Z:" sufix="°" :name="2" :value="object[oProps.ROTATION] && object[oProps.ROTATION][2] || 0" :onChange="onChangeRotation" />
      </div>

      <div class="row">
        <label class="label">Scale</label>
        <input-number prefix="X:" :name="0" :value="object[oProps.SCALE] && object[oProps.SCALE][0] || 0" :onChange="onChangeScale" />
        <input-number prefix="Y:" :name="1" :value="object[oProps.SCALE] && object[oProps.SCALE][1] || 0" :onChange="onChangeScale" />
        <input-number prefix="Z:" :name="2" :value="object[oProps.SCALE] && object[oProps.SCALE][2] || 0" :onChange="onChangeScale" />
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
