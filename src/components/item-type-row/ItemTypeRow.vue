<template>
  <div class="type">
    <label class="label">Type:</label>
    <custom-select :readonly="!isVisibleCtrls" :selectedOptionId="newTypeId" :options="options" :onChange="onChangeType" />
    <custom-btn v-if="!isVisibleCtrls" iconClass="icon-pencil" :onClick="onEnableSelect" class="primary xs" />
    <custom-btn v-if="isVisibleCtrls" iconClass="icon-checkmark" :onClick="onApplyNewType" class="success xs" />
    <custom-btn v-if="isVisibleCtrls" iconClass="icon-close" :onClick="onDisableSelect" class="danger xs" />
  </div>
</template>

<script>
import { noop, emptyArray } from '../../common/utils/base-helper';
import CustomSelect from '../../common/components/custom-select/CustomSelect.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'ItemTypeRow',
  props: {
    typeId: { type: String, default: '' },
    options: { type: Array, default: emptyArray },
    onApply: { type: Function, default: noop }
  },
  components: {
    CustomSelect,
    CustomBtn
  },
  data() {
    return {
      newTypeId: this.type,
      isVisibleCtrls: false
    };
  },
  methods: {
    onApplyNewType(option) {
      if (this.newTypeId !== this.typeId) {
        this.onApply(this.newTypeId);
      }

      this.isVisibleCtrls = false;
    },
    onChangeType(option) {
      this.newTypeId = option.id;
    },
    onEnableSelect() {
      this.isVisibleCtrls = true;
    },
    onDisableSelect() {
      this.newTypeId = this.typeId;
      this.isVisibleCtrls = false;
    }
  }
};
</script>
