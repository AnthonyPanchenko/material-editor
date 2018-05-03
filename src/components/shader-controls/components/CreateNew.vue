<script>
import noop from '../../../common/utils/noop';
import ColorRow from './ColorRow.vue';
import MatrixRow from './MatrixRow.vue';
import NumberRow from './NumberRow.vue';
import VectorRow from './VectorRow.vue';
import TextureRow from './TextureRow.vue';
import emptyObject from '../../../common/utils/emptyObject';
import createSelectsOptions from '../../../common/utils/create-selects-options';
import shadersDataTypes from '../../../common/constants/shaders-data-types';
import InputText from '../../../common/components/input-text/InputText.vue';
import RadioBtn from '../../../common/components/radio-btn/RadioBtn.vue';
import CustomSelect from '../../../common/components/custom-select/CustomSelect.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'CreateNew',
  props: {
    ctrlData: { type: Object, default: emptyObject },
    isEditable: { type: Boolean, default: false },
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
  data() {
    return {
      selectOptions: createSelectsOptions(shadersDataTypes)
    };
  }
};
</script>

<template>
  <div class="controls">
    <div v-if="isEditable" class="row">
      <custom-select
        :name="ctrlData._id"
        :onChange="onChange"
        :options="selectOptions"
        :selectedOptionId="ctrlData.dataType"
        class="data-type-select"
      />
      <radio-btn
        sufix="color"
        value="color"
        picked="color"
        :name="ctrlData._id"
        :onChange="onChange"
        v-if="ctrlData.dataType === 'vec3' || ctrlData.dataType === 'vec4'"
      />
      <radio-btn
        sufix="vector"
        value="vector"
        picked="color"
        :name="ctrlData._id"
        :onChange="onChange"
        v-if="ctrlData.dataType === 'vec3' || ctrlData.dataType === 'vec4'"
      />

      <input-text name="tex" placeholder="name" :onInput="onChange" :value="ctrlData.name" />

      <custom-btn iconClass="icon-checkmark" class="success xs" :data="ctrlData._id" :onClick="onCreate" />
      <custom-btn iconClass="icon-close" class="danger xs" :data="ctrlData._id" :onClick="onCancel" />
    </div>

    <texture-row
      :id="ctrlData._id"
      :name="ctrlData.name"
      :type="ctrlData.dataType"
      :value="ctrlData.value"
      :isEditable="isEditable"
      v-if="ctrlData.dataType === 'sampler2D'"
    />
    <number-row
      :id="ctrlData._id"
      :name="ctrlData.name"
      :type="ctrlData.dataType"
      :value="ctrlData.value"
      :isEditable="isEditable"
      v-if="ctrlData.dataType === 'int' || ctrlData.dataType === 'float'"
    />
    <matrix-row
      :id="ctrlData._id"
      :name="ctrlData.name"
      :type="ctrlData.dataType"
      :value="ctrlData.value"
      :isEditable="isEditable"
      v-if="ctrlData.dataType === 'mat2' || ctrlData.dataType === 'mat3' || ctrlData.dataType === 'mat4'"
    />
    <color-row
      :id="ctrlData._id"
      :name="ctrlData.name"
      :type="ctrlData.dataType"
      :value="ctrlData.value"
      :isEditable="isEditable"
      v-if="(ctrlData.dataType === 'vec3' || ctrlData.dataType === 'vec4') && ctrlData.mode === 'color'"
    />
    <vector-row
      :id="ctrlData._id"
      :name="ctrlData.name"
      :type="ctrlData.dataType"
      :value="ctrlData.value"
      :isEditable="isEditable"
      v-if="(ctrlData.dataType === 'vec2' || ctrlData.dataType === 'vec3' || ctrlData.dataType === 'vec4') && ctrlData.mode === 'vector'"
    />
  </div>
</template>
