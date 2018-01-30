<script>
import Info from './Info.vue';
import noop from '../../../common/utils/noop';
import InputNumber from '../../../common/components/input-number/InputNumber.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'MatrixRow',
  props: {
    isEditable: { type: Boolean, default: false },
    onChange: { type: Function, default: noop },
    onRemove: { type: Function, default: noop },
    onEdit: { type: Function, default: noop },
    name: { type: String, default: '' },
    type: { type: String, default: '' },
    value: { type: Number, default: 0 }
  },
  components: {
    Info,
    InputNumber,
    CustomBtn
  },
  methods: {
    onInputNumberValue(value) {
      this.onChange(value, this.name);
    }
  },
};
</script>

<template>
  <div class="row">
    <info :name="name" :type="type" v-if="isEditable" />

    <div class="matrix">
      <div v-for="(row, index) in matrices.mat3" :key="index" class="mat-row">
        <input-number v-for="item in row" :name="type" :value="item.value" :min="-1" :max="1" :step="0.01" :key="item.id" :onInput="onInputNumberValue" />
      </div>
    </div>

    <custom-btn iconClass="icon-pencil" class="secondary xs" :onClick="onEdit" v-if="isEditable" />
    <custom-btn iconClass="icon-trash-bin" class="danger xs" :onClick="onRemove" v-if="isEditable" />
  </div>
</template>
