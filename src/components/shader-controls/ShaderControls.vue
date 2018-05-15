<template>
  <resize-box
    tag="footer"
    resize="row"
    :onEndOfResize="onSetFooterControlsHeight"
    :size="controlsFooterHeight"
    class="footer shader-controls"
    :disabled="!isVisibleControlsFooter"
  >
    <div class="controls-row">
      <custom-btn
        accesskey="a"
        title="Attributes"
        :iconClass="getIconClass(shadersControlsTypes.ATTRIBUTE)"
        :active="isActive(shadersControlsTypes.ATTRIBUTE)"
        :disabled="!isVisibleControlsFooter"
        :data="shadersControlsTypes.ATTRIBUTE"
        :onClick="onTabClick"
      />
      <custom-btn
        accesskey="u"
        title="Uniforms"
        :iconClass="getIconClass(shadersControlsTypes.UNIFORM)"
        :active="isActive(shadersControlsTypes.UNIFORM)"
        :disabled="!isVisibleControlsFooter"
        :data="shadersControlsTypes.UNIFORM"
        :onClick="onTabClick"
      />
      <custom-btn
        accesskey="t"
        title="Textures"
        :iconClass="getIconClass(shadersControlsTypes.TEXTURE)"
        :active="isActive(shadersControlsTypes.TEXTURE)"
        :disabled="!isVisibleControlsFooter"
        :data="shadersControlsTypes.TEXTURE"
        :onClick="onTabClick"
      />
      <custom-btn
        class="xs"
        accesskey="c"
        :iconClass="isVisibleControlsFooter ? 'icon-collapse-vertical' : 'icon-expand-vertical'"
        :onClick="onToggleFooterControls"
      />
    </div>

    <div v-if="isVisibleControlsFooter" class="shader-ctrl-settings">
      <transition name="opacity">
        <create-new
          isEditable
          class="create-new"
          :onCreate="onSaveNewControl"
          :onCancel="onCancelCreateNewControl"
          :onChange="onChangeNewControlValue"
          :ctrlData="newControl[activeControlType]"
          :selectOptions="mappedSelectOptions()"
          v-if="!!Object.keys(newControl[activeControlType]).length"
        />
      </transition>
      <div class="controls scroll-box">
        <create-new
          v-for="ctrlId in controlsIds[activeControlType]"
          :key="ctrlId"
          :onEdit="onSetEditControl"
          :onCreate="onSaveEditedControl"
          :onCancel="onCancelEditControl"
          :onChange="onChangeControlValue"
          :onRemove="onRemoveControl"
          :isEditable="isEditableControl(ctrlId)"
          :selectOptions="mappedSelectOptions(controls[ctrlId].dataType)"
          :ctrlData="controls[ctrlId]"
        />
      </div>
    </div>
  </resize-box>
</template>

<script>
import { noop, emptyArray, emptyObject } from '../../common/utils/base-helper';
import mappedSelectOptions from './utils/mapped-selects-options';
import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import shadersControlsTypes from '../../common/constants/shaders-controls-types';
import CreateNew from './components/CreateNew.vue';
import './styles/shader-controls.scss';

export default {
  name: 'ShaderControls',
  props: {
    editableControlsIds: { type: Array, default: emptyArray },
    onSaveNewControl: { type: Function, default: noop },
    onChangeNewControlValue: { type: Function, default: noop },
    onSetEditControl: { type: Function, default: noop },
    onSaveEditedControl: { type: Function, default: noop },
    onCancelEditControl: { type: Function, default: noop },
    onChangeControlValue: { type: Function, default: noop },
    onRemoveControl: { type: Function, default: noop },
    controls: { type: Object, default: emptyObject },
    newControl: { type: Object, default: emptyObject },
    controlsIds: { type: Object, default: emptyObject },
    controlsFooterHeight: { type: Number, default: 35 },
    controlsCopies: { type: Object, default: emptyObject },
    isVisibleControlsFooter: { type: Boolean, default: true },
    onToggleFooterControls: { type: Function, default: noop },
    onSetActiveControlType: { type: Function, default: noop },
    onSetFooterControlsHeight: { type: Function, default: noop },
    onToggleCreateNewControlArea: { type: Function, default: noop },
    activeControlType: { type: String, default: shadersControlsTypes.UNIFORM }
  },
  components: {
    CreateNew,
    CustomBtn,
    ResizeBox
  },
  data() {
    return {
      mappedSelectOptions,
      shadersControlsTypes
    };
  },
  methods: {
    isEditableControl(id) {
      return this.editableControlsIds.indexOf(id) !== -1;
    },
    isActive(controlType) {
      return this.activeControlType === controlType && this.isVisibleControlsFooter;
    },
    getIconClass(controlType) {
      return this.isActive(controlType) ? 'icon-plus' : '';
    },
    onCancelCreateNewControl() {
      this.onToggleCreateNewControlArea(this.activeControlType);
    },
    onTabClick(controlType) {
      if (controlType === this.activeControlType) {
        this.onToggleCreateNewControlArea(controlType);
      } else {
        this.onSetActiveControlType(controlType);
      }
    }
  }
};
</script>
