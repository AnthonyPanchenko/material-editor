<script>
import noop from '../../../common/utils/noop';
import emptyArray from '../../../common/utils/emptyArray';
import InputText from '../../../common/components/input-text/InputText.vue';
import RadioBtn from '../../../common/components/radio-btn/RadioBtn.vue';
import CustomSelect from '../../../common/components/custom-select/CustomSelect.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';

import ColorRow from './ColorRow.vue';
import MatrixRow from './MatrixRow.vue';
import NumberRow from './NumberRow.vue';
import VectorRow from './VectorRow.vue';
import TextureRow from './TextureRow.vue';

export default {
  name: 'CreateNew',
  props: {
    uuid: { type: String, required: true },
    isEditable: { type: Boolean, default: false },
    onChange: { type: Function, default: noop },
    onRemove: { type: Function, default: noop },
    onEdit: { type: Function, default: noop },

    numberValue: { type: Number, default: 0.1 },
    matrix: { type: Array, default: matrices.mat3 },
    vector: { type: Object, default: () => [0.25, 0.78, 0.4] },
    color: { type: Array, default: () => [70, 70, 220, 1] },
    background: { type: String, default: '' },

    selectOptions: { type: Array, default: emptyArray },
    selectedOptionId: { type: String, default: '' },
    mode: { type: String, default: 'vector' },
    name: { type: String, default: '_vector' },
    type: { type: String, default: 'vec3' },
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
    return {};
  },
  methods: {},
  mounted() { }
};
</script>

<template>
  <div class="create-new">
    <div class="settings-row">
      <custom-select :options="selectOptions" :selectedOptionId="selectedOptionId" name="selectname" :onChange="onChangeSelect" />

      <radio-btn name="colorvector" sufix="color" value="color" :onChange="onChangeRadioBtn" picked="color" v-if="type === 'vec3' || type === 'vec4'" />
      <radio-btn name="colorvector" sufix="vector" value="vector" :onChange="onChangeRadioBtn" picked="color" v-if="type === 'vec3' || type === 'vec4'" />

      <input-text name="tex" placeholder="name" :onInput="" :value="name" />
      <custom-btn iconClass="icon-checkmark" class="success xs" :data="uuid" :onClick="onCreateNew" />
      <custom-btn iconClass="icon-close" class="danger xs" :data="uuid" :onClick="onCancelCreate" />
    </div>

    <texture-row v-if="type === 'sampler2D'" isEditable />
    <number-row v-if="type === 'int' || type === 'float'" isEditable />
    <matrix-row v-if="type === 'mat2' || type === 'mat3' || type === 'mat4'" isEditable />
    <color-row v-if="(type === 'vec3' || type === 'vec4') && mode === 'color'" isEditable />
    <vector-row v-if="(type === 'vec2' || type === 'vec3' || type === 'vec4') && mode === 'vector'" isEditable />
  </div>
</template>
