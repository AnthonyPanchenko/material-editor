<script>
import noop from '../../utils/noop';

export default {
  name: 'CustomBtn',
  props: {
    onChange: {
      type: Function,
      default: noop,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: String,
    value: String,
    customClass: String,
    titleEnd: [String, Number],
    titleStart: [String, Number],
    type: {
      type: String, // checkbox | radio
      required: true,
    },
  },
}
</script>

<template>
  <label :class="`${type}-btn ${disabled ? 'disabled' : ''} ${customClass || ''}`">
    {{ titleStart }}
    <input :type="type" :name="name" :value="value" @change="onChange" :checked="checked" :disabled="disabled">
    <span class="switch-icon" />
    {{ titleEnd }}
  </label>
</template>
