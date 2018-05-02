<script>
import noop from '../../common/utils/noop';
import emptyObject from '../../common/utils/emptyObject';

import gProps from '../../common/constants/geometry-properties';

import CheckboxBtn from '../../common/components/checkbox-btn/CheckboxBtn.vue';
import InputNumber from '../../common/components/input-number/InputNumber.vue';
import ItemNameRow from '../item-name-row/ItemNameRow.vue';

export default {
  name: 'GeometryEditor',
  props: {
    onChangeInputNumber: { type: Function, default: noop },
    onApplyNewGeometryName: { type: Function, default: noop },
    onChangeCheckBox: { type: Function, default: noop },
    geometry: { type: Object, default: emptyObject }
  },
  components: {
    CheckboxBtn,
    ItemNameRow,
    InputNumber
  },
  data() {
    return {
      gProps
    };
  }
};
</script>

<template>
  <div class="fieldset">
    <div class="type">
      <span class="label">Type:</span>
      <span class="title">{{ geometry['type'] }}</span>
    </div>

    <item-name-row :name="geometry['name']" :onApply="onApplyNewGeometryName" />

    <div class="controls scroll-box">
      <div class="row">
        <label class="label">Radius</label>
        <input-number :name="gProps.RADIUS" :value="geometry[gProps.RADIUS]" :onChange="onChangeInputNumber" />
      </div>

      <div class="row">
        <label class="label">Tube</label>
        <input-number :name="gProps.TUBE" :value="geometry[gProps.TUBE]" :onChange="onChangeInputNumber" />
      </div>

      <div class="row">
        <label class="label">Segments</label>
        <input-number :name="gProps.SEGMENTS" :value="geometry[gProps.SEGMENTS]" :onChange="onChangeInputNumber" />
      </div>

      <div class="row">
        <label class="label">Radius top</label>
        <input-number :name="gProps.RADIUSTOP" :value="geometry[gProps.RADIUSTOP]" :onChange="onChangeInputNumber" />
      </div>

      <div class="row">
        <label class="label">Radius bottom</label>
        <input-number :name="gProps.RADIUSBOTTOM" :value="geometry[gProps.RADIUSBOTTOM]" :onChange="onChangeInputNumber" />
      </div>

      <div class="row">
        <label class="label">Height</label>
        <input-number :name="gProps.HEIGHT" :value="geometry[gProps.HEIGHT]" :onChange="onChangeInputNumber" />
      </div>

      <div class="row">
        <label class="label">Width</label>
        <input-number :name="gProps.WIDTH" :value="geometry[gProps.WIDTH]" :onChange="onChangeInputNumber" />
      </div>

      <div class="row">
        <label class="label">Depth</label>
        <input-number :name="gProps.DEPTH" :value="geometry[gProps.DEPTH]" :onChange="onChangeInputNumber" />
      </div>

      <div class="row">
        <label class="label">Radial segments</label>
        <input-number :name="gProps.RADIALSEGMENTS" :value="geometry[gProps.RADIALSEGMENTS]" :onChange="onChangeInputNumber" />
      </div>

      <div class="row">
        <label class="label">Height segments</label>
        <input-number :name="gProps.HEIGHTSEGMENTS" :value="geometry[gProps.HEIGHTSEGMENTS]" :onChange="onChangeInputNumber" />
      </div>

      <div class="row">
        <label class="label">Width segments</label>
        <input-number :name="gProps.WIDTHSEGMENTS" :value="geometry[gProps.WIDTHSEGMENTS]" :onChange="onChangeInputNumber" />
      </div>

      <div class="row">
        <label class="label">Depth segments</label>
        <input-number :name="gProps.DEPTHSEGMENTS" :value="geometry[gProps.DEPTHSEGMENTS]" :onChange="onChangeInputNumber" />
      </div>

      <div class="row">
        <label class="label">Theta start</label>
        <input-number :name="gProps.THETASTART" :value="geometry[gProps.THETASTART]" :onChange="onChangeInputNumber" />
      </div>

      <div class="row">
        <label class="label">Theta length</label>
        <input-number :name="gProps.THETALENGTH" :value="geometry[gProps.THETALENGTH]" :onChange="onChangeInputNumber" />
      </div>

      <div class="row">
        <label class="label">Detail</label>
        <input-number :name="gProps.DETAIL" :value="geometry[gProps.DETAIL]" :onChange="onChangeInputNumber" />
      </div>

      <div class="row">
        <label class="label">Arc</label>
        <input-number :name="gProps.ARC" :value="geometry[gProps.ARC]" :onChange="onChangeInputNumber" />
      </div>

      <div class="row">
        <label class="label">Open ended</label>
        <checkbox-btn :name="gProps.OPENENDED" :checked="geometry[gProps.OPENENDED]" :onChange="onChangeCheckBox" />
      </div>
    </div>
  </div>
</template>
