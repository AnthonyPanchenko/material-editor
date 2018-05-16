<template>
  <div class="controls">
    <div v-if="isEditable" class="row">
      <custom-select
        name="dataType"
        :onChange="onChangeSelect"
        :options="selectOptions"
        :selectedOptionId="ctrlData.dataType"
        class="data-type-select"
      />
      <radio-btn
        sufix="color"
        value="color"
        name="mode"
        :picked="ctrlData.mode"
        :onChange="onChangeControl"
        v-if="ctrlData.dataType === 'vec3' || ctrlData.dataType === 'vec4'"
      />
      <radio-btn
        sufix="vector"
        value="vector"
        name="mode"
        :picked="ctrlData.mode"
        :onChange="onChangeControl"
        v-if="ctrlData.dataType === 'vec3' || ctrlData.dataType === 'vec4'"
      />
      <input-text name="name" placeholder="name..." :onInput="onChangeControl" :value="ctrlData.name" />
      <custom-btn iconClass="icon-checkmark" class="success xs" :data="ctrlData._id" :onClick="onCreate" />
      <custom-btn iconClass="icon-close" class="danger xs" :data="ctrlData._id" :onClick="onCancel" />
    </div>

    <texture-row
      :id="ctrlData._id"
      :name="ctrlData.name"
      :type="ctrlData.dataType"
      :value="ctrlData.value"
      :isEditable="isEditable"
      :onChange="onChangeControl"
      :onRemove="onRemove"
      :onEdit="onEdit"
      v-if="ctrlData.dataType === 'sampler2D'"
    />
    <number-row
      :id="ctrlData._id"
      :name="ctrlData.name"
      :type="ctrlData.dataType"
      :value="ctrlData.value"
      :isEditable="isEditable"
      :onChange="onChangeControl"
      :onRemove="onRemove"
      :onEdit="onEdit"
      v-if="ctrlData.dataType === 'int' || ctrlData.dataType === 'float'"
    />
    <matrix-row
      :id="ctrlData._id"
      :name="ctrlData.name"
      :type="ctrlData.dataType"
      :value="ctrlData.value"
      :isEditable="isEditable"
      :onChange="onChangeControl"
      :onRemove="onRemove"
      :onEdit="onEdit"
      v-if="ctrlData.dataType === 'mat2' || ctrlData.dataType === 'mat3' || ctrlData.dataType === 'mat4'"
    />
    <color-row
      :id="ctrlData._id"
      :name="ctrlData.name"
      :type="ctrlData.dataType"
      :value="ctrlData.value"
      :isEditable="isEditable"
      :onChange="onChangeControl"
      :onRemove="onRemove"
      :onEdit="onEdit"
      v-if="(ctrlData.dataType === 'vec3' || ctrlData.dataType === 'vec4') && ctrlData.mode === 'color'"
    />
    <vector-row
      :id="ctrlData._id"
      :name="ctrlData.name"
      :type="ctrlData.dataType"
      :value="ctrlData.value"
      :isEditable="isEditable"
      :onChange="onChangeControl"
      :onRemove="onRemove"
      :onEdit="onEdit"
      v-if="(ctrlData.dataType === 'vec2' || ctrlData.dataType === 'vec3' || ctrlData.dataType === 'vec4') && ctrlData.mode === 'vector'"
    />
  </div>
</template>

<script>
import ColorRow from './ColorRow.vue';
import MatrixRow from './MatrixRow.vue';
import NumberRow from './NumberRow.vue';
import VectorRow from './VectorRow.vue';
import TextureRow from './TextureRow.vue';
import { noop, emptyObject, emptyArray } from '../../../common/utils/base-helper';
import InputText from '../../../common/components/input-text/InputText.vue';
import RadioBtn from '../../../common/components/radio-btn/RadioBtn.vue';
import CustomSelect from '../../../common/components/custom-select/CustomSelect.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'CreateNew',
  props: {
    selectOptions: { type: Array, default: emptyArray },
    isEditable: { type: Boolean, default: false },
    ctrlData: { type: Object, default: emptyObject },
    onChange: { type: Function, default: noop },
    onRemove: { type: Function, default: noop },
    onEdit: { type: Function, default: noop },
    onCreate: { type: Function, default: noop },
    onCancel: { type: Function, default: noop }
  },
  components: {
    InputText,
    RadioBtn,
    TextureRow,
    CustomSelect,
    CustomBtn,
    ColorRow,
    MatrixRow,
    NumberRow,
    VectorRow
  },
  methods: {
    onChangeSelect(selectedOption, fieldName) {
      this.onChange({ value: selectedOption.id, fieldName, id: this.ctrlData._id });
    },
    onChangeControl(value, fieldName) {
      this.onChange({ value, fieldName, id: this.ctrlData._id });
    }
  }
};
</script>
