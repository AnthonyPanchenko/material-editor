<script>
import InputNumber from '../../common/components/input-number/InputNumber.vue';
import CheckboxBtn from '../../common/components/checkbox-btn/CheckboxBtn.vue';

export default {
  name: 'ObjectControls',
  components: {
    InputNumber,
    CheckboxBtn
  },
  data() {
    return {};
  },
  methods: {
    onChangeNumberInput(value, name, min, max, step) {
      console.log(value, name, min, max, step);
    },
    onChangeCheckBox(state, value, name) {
      console.log(state, value, name);
    }
  }
};
</script>

<template>
  <div class="controls scroll-box">
    <div class="row">
      <span class="label">Position</span>
      <input-number prefix="X:" />
      <input-number prefix="Y:" />
      <input-number prefix="Z:" />
    </div>

    <div class="row">
      <span class="label">Rotation</span>
      <input-number prefix="X:" sufix="°" />
      <input-number prefix="Y:" sufix="°" />
      <input-number prefix="Z:" sufix="°" />
    </div>

    <div class="row">
      <span class="label">Scale</span>
      <input-number prefix="X:" />
      <input-number prefix="Y:" />
      <input-number prefix="Z:" />
    </div>

    <div class="row">
      <span class="label">Shadow</span>
      <checkbox-btn class="check-box" sufix="cast" name="n2ame31" value="value1" :onChange="onChangeCheckBox" />
      <checkbox-btn class="check-box" sufix="receive" name="n2ame31" value="value1" :onChange="onChangeCheckBox" />
    </div>
  </div>
</template>
