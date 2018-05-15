<template>
  <div class="row">
    <info :name="name" :type="type" v-if="!isEditable" />

    <input-number
      prefix="X:"
      :name="0"
      :value="value[0]"
      :min="min"
      :max="max"
      :step="step"
      :onInput="onInputVectorValue"
    />
    <input-number
      prefix="Y:"
      :name="1"
      :value="value[1]"
      :min="min"
      :max="max"
      :step="step"
      :onInput="onInputVectorValue"
    />
    <input-number
      prefix="Z:"
      :name="2"
      :value="value[2]"
      :min="min"
      :max="max"
      :step="step"
      v-if="type === 'vec3' || type === 'vec4'"
      :onInput="onInputVectorValue"
    />
    <input-number
      prefix="W:"
      :name="3"
      :value="value[3]"
      :min="min"
      :max="max"
      :step="step"
      :onInput="onInputVectorValue"
      :onClick="onToggleNumberPickerPopover"
      ref="numberPickerTrigger"
      v-if="type === 'vec4'"
    />

    <popover v-if="isOpenVec2Picker" :trigger="vec2PickerTrigger" :onClose="onClosePopover">
      <vec2-picker name="value" :vector="value" :onChange="onChange" />
    </popover>

    <popover v-if="isOpenVec3Picker" :trigger="vec3PickerTrigger" :onClose="onClosePopover">
      <vec3-picker name="value" :vector="value" :onChange="onChange" />
    </popover>

    <popover v-if="isOpenNumberPicker" :trigger="numberPickerTrigger" :onClose="onClosePopover">
      <number-picker name="value" :value="value[3]" :min="min" :max="max" :step="step" :onChange="onChange" />
    </popover>

    <custom-btn iconClass="icon-xy" class="xs" ref="vec2PickerTrigger" :onClick="onToggleVec2PickerPopover" v-if="type === 'vec2'" />
    <custom-btn iconClass="icon-xyz" class="xs" ref="vec3PickerTrigger" :onClick="onToggleVec3PickerPopover" v-else />

    <custom-btn iconClass="icon-pencil" class="primary xs" :data="id" :onClick="onEdit" v-if="!isEditable && !isVisibleRemoveControl" />
    <custom-btn iconClass="icon-trash-bin" class="danger xs" :onClick="onTogleRemoveMode" v-if="!isEditable && !isVisibleRemoveControl" />
    <custom-btn iconClass="icon-checkmark" class="success xs" :data="id" :onClick="onRemove" v-if="!isEditable && isVisibleRemoveControl" />
    <custom-btn iconClass="icon-close" class="danger xs" :onClick="onTogleRemoveMode" v-if="!isEditable && isVisibleRemoveControl" />
  </div>
</template>

<script>
import Info from './Info.vue';
import { noop } from '../../../common/utils/base-helper';
import Popover from '../../../common/components/popover/Popover.vue';
import NumberPicker from '../../../common/components/number-picker/NumberPicker.vue';
import Vec3Picker from '../../../common/components/vec3-picker/Vec3Picker.vue';
import Vec2Picker from '../../../common/components/vec2-picker/Vec2Picker.vue';
import InputNumber from '../../../common/components/input-number/InputNumber.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'VectorRow',
  props: {
    isEditable: { type: Boolean, default: false },
    onChange: { type: Function, default: noop },
    onRemove: { type: Function, default: noop },
    onEdit: { type: Function, default: noop },

    id: { type: String, default: '' },
    name: { type: String, default: '' },
    type: { type: String, default: 'vec3' },
    value: { type: Array, default: () => [0.25, 0.78, 0.4] },

    min: { type: Number, default: -1 },
    max: { type: Number, default: 1 },
    step: { type: Number, default: 0.01 }
  },
  components: {
    Info,
    Popover,
    NumberPicker,
    Vec3Picker,
    Vec2Picker,
    InputNumber,
    CustomBtn
  },
  data() {
    return {
      isVisibleRemoveControl: false,
      isOpenVec2Picker: false,
      isOpenVec3Picker: false,
      isOpenNumberPicker: false,
      vec2PickerTrigger: null,
      vec3PickerTrigger: null,
      numberPickerTrigger: null
    };
  },
  methods: {
    onTogleRemoveMode() {
      this.isVisibleRemoveControl = !this.isVisibleRemoveControl;
    },
    onClosePopover() {
      if (this.isOpenVec2Picker) {
        this.isOpenVec2Picker = false;
      }

      if (this.isOpenVec3Picker) {
        this.isOpenVec3Picker = false;
      }

      if (this.isOpenNumberPicker) {
        this.isOpenNumberPicker = false;
      }
    },
    onToggleVec2PickerPopover() {
      this.vec2PickerTrigger = this.$refs.vec2PickerTrigger.$el;
      this.isOpenVec2Picker = !this.isOpenVec2Picker;
    },
    onToggleVec3PickerPopover() {
      this.vec3PickerTrigger = this.$refs.vec3PickerTrigger.$el;
      this.isOpenVec3Picker = !this.isOpenVec3Picker;
    },
    onToggleNumberPickerPopover() {
      this.numberPickerTrigger = this.$refs.numberPickerTrigger.$el;
      this.isOpenNumberPicker = !this.isOpenNumberPicker;
    },
    onInputVectorValue(val, axis) {
      const vector = [...this.value];
      vector[axis] = val;

      this.onChange(vector, 'value');
    }
  },
  mounted() {
    if (this.type === 'vec4') {
      this.numberPickerTrigger = this.$refs.numberPickerTrigger.$el;
      this.vec3PickerTrigger = this.$refs.vec3PickerTrigger.$el;
    }

    if (this.type === 'vec3') {
      this.vec3PickerTrigger = this.$refs.vec3PickerTrigger.$el;
    }

    if (this.type === 'vec2') {
      this.vec2PickerTrigger = this.$refs.vec2PickerTrigger.$el;
    }
  }
};
</script>
