<script>
import noop from '../../../common/utils/noop';
import InputText from '../../common/components/input-text/InputText.vue';
import RadioBtn from '../../common/components/radio-btn/RadioBtn.vue';
import CustomSelect from '../../common/components/custom-select/CustomSelect.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';

import ColorRow from './ColorRow.vue';
import MatrixRow from './MatrixRow.vue';
import NumberRow from './NumberRow.vue';
import VectorRow from './VectorRow.vue';

export default {
  name: 'CreateNewUniform',
  props: {
    mode: { type: String, default: '' },
    type: { type: String, default: '' },
  },
  components: {
    InputText,
    RadioBtn,
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
      <custom-select :options="options" selectedOptionId="vec3" name="selectname" :onChange="onChangeSelect" />

      <radio-btn name="colorvector" sufix="color" value="color" :onChange="onChangeRadioBtn" picked="color" v-if="type === 'vec3' || type === 'vec4'" />
      <radio-btn name="colorvector" sufix="vector" value="vector" :onChange="onChangeRadioBtn" picked="color" v-if="type === 'vec3' || type === 'vec4'" />

      <input-text name="tex" placeholder="name" />
      <custom-btn iconClass="icon-checkmark" class="success xs" :onClick="onCreateUniform" />
      <custom-btn iconClass="icon-close" class="danger xs" :onClick="onCancelCreate" />
    </div>

    <number-row v-if="type === 'int' || type === 'float'" isEditable />
    <matrix-row v-if="type === 'mat2' || type === 'mat3' || type === 'mat4'" isEditable />
    <color-row v-if="(type === 'vec3' || type === 'vec4') && mode === 'color'" isEditable />
    <vector-row v-if="(type === 'vec2' || type === 'vec3' || type === 'vec4') && mode === 'vector'" isEditable />
  </div>
</template>
