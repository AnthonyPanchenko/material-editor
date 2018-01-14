<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shaderEditor');

import Popover from '../../common/components/popover/Popover.vue';
import NumberPicker from '../../common/components/number-picker/NumberPicker.vue';
import ColorPicker from '../../common/components/color-picker/ColorPicker.vue';
import Vec2Picker from '../../common/components/vec2-picker/Vec2Picker.vue';
import Vec3Picker from '../../common/components/vec3-picker/Vec3Picker.vue';
import ModalWindow from '../../common/components/modal-window/ModalWindow.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import ItemObjList from '../item-obj-list/ItemObjList.vue';
import CanvasBoard from '../canvas-board/CanvasBoard.vue';
import PresentationFooter from '../presentation-footer/PresentationFooter.vue';
import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import ShaderEditorFooter from '../shader-editor-footer/ShaderEditorFooter.vue';
import internalUrls from '../../common/constants/internal-urls';
import tabNames from './constants/tabNames';

export default {
  name: 'ShaderEditor',
  components: {
    Popover,
    NumberPicker,
    ModalWindow,
    ColorPicker,
    Vec2Picker,
    Vec3Picker,
    CustomBtn,
    ItemObjList,
    InputFile,
    CanvasBoard,
    ResizeBox,
    ShaderEditorFooter,
    PresentationFooter
  },
  data() {
    return {
      tabNames,
      popoverRef: null,
      isOpenPopover: false,
      isOpenModalWindow: false,
      urls: internalUrls
    };
  },
  computed: mapState([
    'widthCtrlBox',
    'activeTabName',
    'isVisibleControlsBox',
    'isVisibleObjectsList'
  ]),
  methods: {
    ...mapActions([
      'onSetCtrlBoxWidth',
      'onSetActiveTabName',
      'onToggleObjectsList',
      'onToggleFullScreenMode'
    ]),

    toggleModalWindow() {
      this.isOpenModalWindow = !this.isOpenModalWindow;
    },

    closeModalWindow() {
      this.isOpenPopover = false;
    },

    togglePopover() {
      this.popoverRef = this.$refs.popoverRef.$el;
      this.isOpenPopover = !this.isOpenPopover;
    },

    onChangeVec2Picker(x, y, name) {
      console.clear();
      console.log('vec2 x > ', x);
      console.log('vec2 y > ', y);
      console.log('name > ', name);
    },

    onChangeVec3Picker(x, y, z, name) {
      console.clear();
      console.log('vec2 x > ', x);
      console.log('vec2 y > ', y);
      console.log('vec2 z > ', z);
      console.log('name > ', name);
    },

    onChangeNumberPicker(value, name, min, max, step) {
      console.clear();
      console.log('value > ', value);
      console.log('name > ', name);
      console.log('min > ', min);
      console.log('max > ', max);
      console.log('step > ', step);
    }
  }
};
</script>

<template>
  <div class="editor-container">

    <popover :isOpen="isOpenPopover" :trigger="popoverRef" :onClose="closeModalWindow">
      <vec3-picker :onChange="onChangeVec3Picker" />
    </popover>

    <resize-box v-if="isVisibleControlsBox" tag="section" resize="column" :onEndOfResize="onSetCtrlBoxWidth" :size="widthCtrlBox" class="controls-section">
      <header class="controls-header">
        <div class="controls-row">
          <custom-btn accesskey="s" iconClass="icon-settings" class="xs" />
          <custom-btn title="Fragment" iconClass="icon-fragment" :active="activeTabName === tabNames.FRAGMENT_SHADER" :data-tab="tabNames.FRAGMENT_SHADER" :onClick="onSetActiveTabName" />
          <custom-btn title="Vertex" iconClass="icon-vertex" :active="activeTabName === tabNames.VERTEX_SHADER" :data-tab="tabNames.VERTEX_SHADER" :onClick="onSetActiveTabName" />
          <custom-btn iconClass="icon-new-file" class="xs" />
          <custom-btn iconClass="icon-save" class="xs" />
          <custom-btn iconClass="icon-open-folder" class="xs" />
          <custom-btn iconClass="icon-gallery" class="xs" />
          <custom-btn :link="`/${urls.MATERIAL_EDITOR}`" accesskey="w" iconClass="icon-material-editor" class="xs" />
        </div>
      </header>

      <section class="controls-content">
        <div v-if="activeTabName === tabNames.FRAGMENT_SHADER">
          <vec3-picker :onChange="onChangeVec3Picker" />
        </div>
        <div v-if="activeTabName === tabNames.VERTEX_SHADER">
          <custom-btn title="Open Modal Window" :onClick="toggleModalWindow" />
          <modal-window :isOpen="isOpenModalWindow" onOverlayClose :onClose="toggleModalWindow" />
          <custom-btn title="Open popover" ref="popoverRef" :onClick="togglePopover" />
          <!-- </modal-window> -->
        </div>
      </section>

      <shader-editor-footer />
    </resize-box>

    <section class="presentation-section">
      <header class="presentation-header">
        <div class="controls-row">
          <custom-btn iconClass="icon-list" class="xs" accesskey="q" :onClick="onToggleObjectsList" />
          <custom-btn iconClass="icon-sphere" />
          <custom-btn iconClass="icon-cube" />
          <custom-btn iconClass="icon-cylinder" />
          <custom-btn iconClass="icon-torus" />
          <custom-btn iconClass="icon-plane" />
          <input-file name="file1" />
        </div>
      </header>

      <section class="presentation-content">
        <transition name="slide-obj-list">
          <item-obj-list v-if="isVisibleObjectsList" />
        </transition>
        <div class="canvas-box">
          <vec2-picker :vector="[0.3, -0.5]" :onChange="onChangeVec2Picker" />
          <hr>
          <color-picker />
          <hr>
          <number-picker :value="0.3" :step="0.1" :min="-5" :max="5" :onChange="onChangeNumberPicker" />
        </div>
      </section>

      <presentation-footer :isInFullScreenMode="isVisibleControlsBox" :onToggleFullScreenMode="onToggleFullScreenMode" />
    </section>

  </div>
</template>
