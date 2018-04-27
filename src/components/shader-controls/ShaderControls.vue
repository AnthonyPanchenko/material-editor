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
    controlsFooterHeight: { type: Number, default: 32 },
    isVisibleControlsFooter: { type: Boolean, default: true },
    onToggleFooterControls: { type: Function, default: noop },
    onSetFooterControlsHeight: { type: Function, default: noop },
    onSetActiveControlsType: { type: Function, default: noop },
    activeControlsType: { type: String, default: shadersControlsTypes.UNIFORMS }
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
      return this.isActive(controlType) ? 'icon-plus' : '';
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
        :iconClass="getIconClass(shadersControlsTypes.ATTRIBUTES)"
        :active="isActive(shadersControlsTypes.ATTRIBUTES)"
        :disabled="!isVisibleControlsFooter"
        :data="shadersControlsTypes.ATTRIBUTES"
        :onClick="onTabClick"
      />
      <custom-btn
        accesskey="u"
        title="Uniforms"
        :iconClass="getIconClass(shadersControlsTypes.UNIFORMS)"
        :active="isActive(shadersControlsTypes.UNIFORMS)"
        :disabled="!isVisibleControlsFooter"
        :data="shadersControlsTypes.UNIFORMS"
        :onClick="onTabClick"
      />
      <custom-btn
        accesskey="t"
        title="Textures"
        :iconClass="getIconClass(shadersControlsTypes.TEXTURES)"
        :active="isActive(shadersControlsTypes.TEXTURES)"
        :disabled="!isVisibleControlsFooter"
        :data="shadersControlsTypes.TEXTURES"
        :onClick="onTabClick"
      />
      <custom-btn
        accesskey="c"
        :iconClass="isVisibleControlsFooter ? 'icon-collapse-vertical' : 'icon-expand-vertical'"
        class="xs" :onClick="onToggleFooterControls"
      />
    </div>

    <div v-if="isVisibleControlsFooter" class="shader-ctrl-settings">
      <transition name="opacity">
        <create-new v-if="isVisibleCreateNewArea" />
      </transition>
      <div class="controls scroll-box"></div>
    </div>
  </resize-box>
</template>
