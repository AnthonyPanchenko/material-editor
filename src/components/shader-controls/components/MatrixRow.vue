<template>
  <div class="row">
    <info :name="name" :type="type" v-if="!isEditable" />

    <div :class="['matrix', type]">
      <input-number v-for="(val, index) in value" :name="index" :value="val" :step="0.01" :key="index" :onInput="onInputNumberValue" />
    </div>

    <custom-btn iconClass="icon-pencil" class="primary xs" :data="id" :onClick="onEdit" v-if="!isEditable && !isVisibleRemoveControl" />
    <custom-btn iconClass="icon-trash-bin" class="danger xs" :onClick="onTogleRemoveMode" v-if="!isEditable && !isVisibleRemoveControl" />
    <custom-btn iconClass="icon-checkmark" class="success xs" :data="id" :onClick="onRemove" v-if="!isEditable && isVisibleRemoveControl" />
    <custom-btn iconClass="icon-close" class="danger xs" :onClick="onTogleRemoveMode" v-if="!isEditable && isVisibleRemoveControl" />
  </div>
</template>

<script>
import Info from './Info.vue';
import { noop } from '../../../common/utils/base-helper';
import { matrices } from '../../../common/utils/math-helper';
import InputNumber from '../../../common/components/input-number/InputNumber.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'MatrixRow',
  props: {
    isEditable: { type: Boolean, default: false },
    onChange: { type: Function, default: noop },
    onRemove: { type: Function, default: noop },
    onEdit: { type: Function, default: noop },

    id: { type: String, default: '' },
    name: { type: String, default: '' },
    type: { type: String, default: 'mat3' },
    value: { type: Array, default: matrices.mat3 }
  },
  components: {
    Info,
    InputNumber,
    CustomBtn
  },
  data() {
    return {
      isVisibleRemoveControl: false
    };
  },
  methods: {
    onTogleRemoveMode() {
      this.isVisibleRemoveControl = !this.isVisibleRemoveControl;
    },
    onInputNumberValue(num, index) {
      const matrix = [...this.value];
      matrix[index] = num;

      this.onChange(matrix, 'value');
    }
  }
};
</script>
