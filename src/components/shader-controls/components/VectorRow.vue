<script>
import Info from './Info.vue';
import noop from '../../../common/utils/noop';
import Popover from '../../../common/components/popover/Popover.vue';
import NumberPicker from '../../../common/components/number-picker/NumberPicker.vue';
import Vec3Picker from '../../../common/components/vec3-picker/Vec3Picker.vue';
import Vec2Picker from '../../../common/components/vec2-picker/Vec2Picker.vue';
import InputNumber from '../../../common/components/input-number/InputNumber.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'VectorRow',
  props: {
    uuid: { type: String, required: true },
    isEditable: { type: Boolean, default: false },
    onChange: { type: Function, default: noop },
    onRemove: { type: Function, default: noop },
    onEdit: { type: Function, default: noop },
    name: { type: String, default: '_vec3' },
    type: { type: String, default: 'vec3' },
    vector: { type: Object, default: () => [0.25, 0.78, 0.4] },
    min: -1,
    max: 1,
    step: 0.01
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
      isOpenVec2Picker: false,
      isOpenVec3Picker: false,
      isOpenNumberPicker: false,

      vec2PickerTrigger: null,
      vec3PickerTrigger: null,
      numberPickerTrigger: null,
    };
  },
  methods: {
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
    onInputVectorValue(value, axis) {
      const vector = [...this.vector];
      vector[axis] = value;

      this.onChange(vector, this.uuid);
    },
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

<template>
  <div class="row">
    <info :name="name" :type="type" v-if="!isEditable" />

    <input-number prefix="X" :name="0" :value="vector[0]" :min="min" :max="max" :step="step" :onInput="onInputVectorValue" />
    <input-number prefix="Y" :name="1" :value="vector[1]" :min="min" :max="max" :step="step" :onInput="onInputVectorValue" />
    <input-number prefix="Z" :name="2" :value="vector[2]" :min="min" :max="max" :step="step" :onInput="onInputVectorValue" v-if="type === 'vec3'" />
    <input-number prefix="W" :name="3" :value="vector[3]" :min="min" :max="max" :step="step" :onInput="onInputVectorValue" v-if="type === 'vec4'" ref="numberPickerTrigger" :onClick="onToggleNumberPickerPopover" />

    <popover :isOpen="isOpenVec2Picker" :trigger="vec2PickerTrigger" :onClose="onClosePopover">
      <vec2-picker :name="uuid" :vector="vector" :onChange="onChange" />
    </popover>

    <popover :isOpen="isOpenVec3Picker" :trigger="vec3PickerTrigger" :onClose="onClosePopover">
      <vec3-picker :name="uuid" :vector="vector" :onChange="onChange" />
    </popover>

    <popover :isOpen="isOpenNumberPicker" :trigger="numberPickerTrigger" :onClose="onClosePopover">
      <number-picker :name="uuid" :value="vector[3]" :min="min" :max="max" :step="step" :onChange="onChange" />
    </popover>

    <custom-btn iconClass="icon-xy" class="xs" ref="vec2PickerTrigger" :onClick="onToggleVec2PickerPopover" v-if="type === 'vec2'" />
    <custom-btn iconClass="icon-xyz" class="xs" ref="vec3PickerTrigger" :onClick="onToggleVec3PickerPopover" v-else />
    <custom-btn iconClass="icon-pencil" class="primary xs" :data="uuid" :onClick="onEdit" v-if="!isEditable" />
    <custom-btn iconClass="icon-trash-bin" class="danger xs" :data="uuid" :onClick="onRemove" v-if="!isEditable" />
  </div>
</template>
