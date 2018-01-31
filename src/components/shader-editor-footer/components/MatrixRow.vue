<script>
import Info from './Info.vue';
import noop from '../../../common/utils/noop';
import { matrices } from '../../../common/utils/matrix';
import InputNumber from '../../../common/components/input-number/InputNumber.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'MatrixRow',
  props: {
    uuid: { type: String, required: true },
    isEditable: { type: Boolean, default: false },
    onChange: { type: Function, default: noop },
    onRemove: { type: Function, default: noop },
    onEdit: { type: Function, default: noop },
    name: { type: String, default: '' },
    type: { type: String, default: '' },
    matrix: { type: Array, default: matrices.mat3 }
  },
  components: {
    Info,
    InputNumber,
    CustomBtn
  },
  methods: {
    onInputNumberValue(value, rc) {
      const matrix = [...this.matrix];
      matrix[rc[0]][rc[2]] = value;

      this.onChange(matrix, this.uuid);
    }
  },
};
</script>

<template>
  <div class="row">
    <info :name="name" :type="type" v-if="isEditable" />

    <div class="matrix">
      <div v-for="(row, i) in matrix" :key="i" class="mat-row">
        <input-number v-for="(value, j) in row" :name="`${i}-${j}`" :value="value" :step="0.01" :key="`${i}-${j}`" :onInput="onInputNumberValue" />
      </div>
    </div>

    <custom-btn iconClass="icon-pencil" class="secondary xs" :data="uuid" :onClick="onEdit" v-if="isEditable" />
    <custom-btn iconClass="icon-trash-bin" class="danger xs" :data="uuid" :onClick="onRemove" v-if="isEditable" />
  </div>
</template>
