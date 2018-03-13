<script>
import Info from './Info.vue';
import noop from '../../../common/utils/noop';
import { matrices } from '../../../common/utils/matrix';
import InputNumber from '../../../common/components/input-number/InputNumber.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'MatrixRow',
  props: {
    _id: { type: String, required: true },
    isEditable: { type: Boolean, default: false },
    onChange: { type: Function, default: noop },
    onRemove: { type: Function, default: noop },
    onEdit: { type: Function, default: noop },
    name: { type: String, default: '_matrix3x3' },
    type: { type: String, default: 'mat3' },
    matrix: { type: Array, default: matrices.mat3 }
  },
  components: {
    Info,
    InputNumber,
    CustomBtn
  },
  methods: {
    onInputNumberValue(value, index) {
      const matrix = [...this.matrix];
      matrix[index] = value;

      this.onChange(matrix, this._id);
    }
  }
};
</script>

<template>
  <div class="row">
    <info :name="name" :type="type" v-if="!isEditable" />

    <div :class="['matrix', type]">
      <input-number v-for="(value, index) in matrix" :name="index" :value="value" :step="0.01" :key="index" :onInput="onInputNumberValue" />
    </div>

    <custom-btn iconClass="icon-pencil" class="primary xs" :data="_id" :onClick="onEdit" v-if="!isEditable" />
    <custom-btn iconClass="icon-trash-bin" class="danger xs" :data="_id" :onClick="onRemove" v-if="!isEditable" />
  </div>
</template>
