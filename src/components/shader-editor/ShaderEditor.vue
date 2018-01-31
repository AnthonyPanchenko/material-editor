<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shaderEditor');

import ModalWindow from '../../common/components/modal-window/ModalWindow.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';

import ColorPicker from '../../common/components/color-picker/ColorPicker.vue';
import Vec3Picker from '../../common/components/vec3-picker/Vec3Picker.vue';
import Vec2Picker from '../../common/components/vec2-picker/Vec2Picker.vue';

import ItemObjList from '../item-obj-list/ItemObjList.vue';
import CanvasBoard from '../canvas-board/CanvasBoard.vue';
import PresentationFooter from '../presentation-footer/PresentationFooter.vue';
import ShaderEditorFooter from '../shader-editor-footer/ShaderEditorFooter.vue';
import CodeEditor from '../code-editor/CodeEditor.vue';

import internalUrls from '../../common/constants/internal-urls';
import tabNames from './constants/tabNames';

export default {
  name: 'ShaderEditor',
  components: {
    CodeEditor,
    ModalWindow,
    CustomBtn,
    ItemObjList,
    InputFile,
    CanvasBoard,

    Vec3Picker,
    Vec2Picker,
    ColorPicker,

    ResizeBox,
    ShaderEditorFooter,
    PresentationFooter
  },
  data() {
    return {
      vector2d: [0.5, -0.5],
      vector3d: [0.7, 0.3, 0.4],
      color: [234, 34, 45, 1],

      tabNames,
      isOpenCreateNewFileForm: false,
      urls: internalUrls
    };
  },
  computed: mapState([
    'shaders',
    'widthCtrlBox',
    'activeTabName',
    'isVisibleControlsBox',
    'isVisibleObjectsList'
  ]),
  methods: {
    ...mapActions([
      'onChangeCodeEditor',
      'onSetCtrlBoxWidth',
      'onSetActiveTabName',
      'onToggleObjectsList',
      'onToggleFullScreenMode'
    ]),

    onOpenCreateNewFileForm() {
      this.isOpenCreateNewFileForm = !this.isOpenCreateNewFileForm;
    },

    onCloseCreateNewFileForm() {
      if (this.isOpenCreateNewFileForm) {
        this.isOpenCreateNewFileForm = false;
      }
    },

    onChangeVec2Picker(vector) {
      this.vector2d = vector;
      console.clear();
      console.log(vector);
    },
    onChangeVec3Picker(vector) {
      this.vector3d = vector;
      console.clear();
      console.log(vector);
    },
    onChangeColorPicker(color) {
      this.color = color;
      console.clear();
      console.log(color);
    },

    onSaveShader(payload) {
      console.clear();
      console.log('value > ', payload.value);
      console.log('type > ', payload.type);
    }
  }
};
</script>

<template>
  <div class="editor-container">
    <modal-window :isOpen="isOpenCreateNewFileForm" :onClose="onCloseCreateNewFileForm" сloseByOverlayClick />

    <resize-box v-if="isVisibleControlsBox" tag="section" resize="column" :onEndOfResize="onSetCtrlBoxWidth" :size="widthCtrlBox" class="controls-section">
      <header class="controls-header">
        <div class="controls-row">
          <custom-btn accesskey="s" iconClass="icon-settings" class="xs" />
          <custom-btn title="Fragment" iconClass="icon-fragment" :active="activeTabName === tabNames.FRAGMENT_SHADER" :data="tabNames.FRAGMENT_SHADER" :onClick="onSetActiveTabName" />
          <custom-btn title="Vertex" iconClass="icon-vertex" :active="activeTabName === tabNames.VERTEX_SHADER" :data="tabNames.VERTEX_SHADER" :onClick="onSetActiveTabName" />
          <custom-btn iconClass="icon-undo" class="xs" />
          <custom-btn iconClass="icon-save" class="xs" />
          <custom-btn iconClass="icon-redo" class="xs" />
          <custom-btn iconClass="icon-new-file" class="xs" :onClick="onOpenCreateNewFileForm" />
          <custom-btn iconClass="icon-open-folder" class="xs" />
          <custom-btn iconClass="icon-gallery" class="xs" />
          <custom-btn :link="`/${urls.MATERIAL_EDITOR}`" accesskey="w" iconClass="icon-material-editor" class="xs" />
        </div>
      </header>

      <section class="controls-content">
        <code-editor :activeShader="activeTabName" :shaders="shaders" :onChange="onChangeCodeEditor" :onSave="onSaveShader" />
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

          <vec2-picker :vector="vector2d" :onChange="onChangeVec2Picker" />
          <vec3-picker :vector="vector3d" :onChange="onChangeVec3Picker" />
          <color-picker :color="color" :onChange="onChangeColorPicker" />

        </div>
      </section>

      <presentation-footer :isInFullScreenMode="isVisibleControlsBox" :onToggleFullScreenMode="onToggleFullScreenMode" />
    </section>

  </div>
</template>
