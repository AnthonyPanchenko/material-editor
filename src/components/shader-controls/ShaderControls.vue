<script>
import noop from '../../common/utils/noop';
import emptyObject from '../../common/utils/emptyObject';
import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import shadersControlsTypes from '../../common/constants/shaders-controls-types';
import CreateNew from './components/CreateNew.vue';
import './styles/shader-controls.scss';

export default {
  name: 'ShaderControls',
  props: {
    controls: { type: Object, default: emptyObject },
    controlsIds: { type: Object, default: emptyObject },
    controlsCopies: { type: Object, default: emptyObject },
    newControl: { type: Object, default: emptyObject },
    controlsFooterHeight: { type: Number, default: 35 },
    isVisibleControlsFooter: { type: Boolean, default: true },
    onToggleFooterControls: { type: Function, default: noop },
    onSetFooterControlsHeight: { type: Function, default: noop },
    onSetActiveControlsType: { type: Function, default: noop },
    activeControlsType: { type: String, default: shadersControlsTypes.UNIFORM }
  },
  components: {
    CreateNew,
    CustomBtn,
    ResizeBox
  },
  data() {
    return {
      shadersControlsTypes,
      isVisibleCreateNewArea: false
    };
  },
  methods: {
    isActive(controlType) {
      return this.activeControlsType === controlType && this.isVisibleControlsFooter;
    },
    getIconClass(controlType) {
      return this.isActive(controlType) ? 'icon-plus' : '222';
    },
    onTabClick(controlType) {
      if (controlType === this.activeControlsType) {
        this.isVisibleCreateNewArea = !this.isVisibleCreateNewArea;
      } else {
        this.onSetActiveControlsType(controlType);
        this.isVisibleCreateNewArea = false;
      }
    }
  }
};
</script>

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
          :ctrlData="newControl[activeControlsType]"
          v-if="isVisibleCreateNewArea"
        />
      </transition>
      <div class="controls scroll-box">
        <create-new
          v-for="ctrlId in controlsIds[activeControlsType]"
          :key="ctrlId"
          :isEditable="controlsCopies.hasOwnProperty(ctrlId)"
          :ctrlData="controls[ctrlId]"
        />
      </div>
    </div>
  </resize-box>
</template>
