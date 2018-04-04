<script>
import noop from '../../common/utils/noop';
import InputText from '../../common/components/input-text/InputText.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'ItemNameRow',
  props: {
    name: { type: String, default: '' },
    onRename: { type: Function, default: noop }
  },
  components: {
    InputText,
    CustomBtn
  },
  data() {
    return {
      newName: this.name,
      isVisibleCtrls: false
    };
  },
  methods: {
    onApplyNewName() {
      if (this.name !== this.newName.trim()) {
        console.log(this.newName.trim());
        this.onRename(this.newName.trim());
      }
    },
    onStartEditName() {
      this.isVisibleCtrls = true;
      this.$refs.input.$el.focus();
    },
    onChangeName(str) {
      this.newName = str;
    },
    onCancelRename() {
      this.newName = this.name;
      this.isVisibleCtrls = false;
    }
  }
};
</script>

<template>
  <div class="name">
    <label class="label">Name:</label>
    <input-text ref="input" :readonly="!isVisibleCtrls" :value="newName" :onInput="onChangeName" />
    <custom-btn v-if="!isVisibleCtrls" iconClass="icon-pencil" :onClick="onStartEditName" class="primary xs" />
    <custom-btn v-if="isVisibleCtrls" iconClass="icon-checkmark" :onClick="onApplyNewName" class="success xs" />
    <custom-btn v-if="isVisibleCtrls" iconClass="icon-close" :onClick="onCancelRename" class="danger xs" />
  </div>
</template>
