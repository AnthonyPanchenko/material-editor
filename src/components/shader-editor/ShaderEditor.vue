<template>
  <resize-box
    tag="section"
    resize="column"
    class="container controls-section"
    :onEndOfResize="onSetPanelControlsWidth"
    :size="controlsPanelWidth"
  >
    <header class="header controls-row">
      <custom-btn accesskey="s" iconClass="icon-settings" class="xs" />
      <custom-btn
        title="Fragment"
        iconClass="icon-fragment"
        :active="activeShaderType === shadersTypes.FRAGMENT_SHADER"
        :data="shadersTypes.FRAGMENT_SHADER"
        :onClick="onSetActiveShaderType"
      />
      <custom-btn
        title="Vertex"
        iconClass="icon-vertex"
        :active="activeShaderType === shadersTypes.VERTEX_SHADER"
        :data="shadersTypes.VERTEX_SHADER"
        :onClick="onSetActiveShaderType"
      />
      <custom-btn iconClass="icon-undo" class="xs" />
      <custom-btn iconClass="icon-save" class="xs" />
      <custom-btn iconClass="icon-redo" class="xs" />
      <custom-btn iconClass="icon-close" class="danger xs" :data="editorsNames.MATERIAL_EDITOR" :onClick="onSetActiveEditorName" />
    </header>

    <section class="body">
      <code-editor
        :shaders="shaders"
        :activeShader="activeShaderType"
        :onChange="onChangeCodeEditor"
        :onSave="onSaveShader"
      />
    </section>

    <shader-controls
      :onRemoveControl="onRemoveControl"
      :onSetEditControl="onSetEditControl"
      :onSaveNewControl="onSaveNewControl"
      :onSaveEditedControl="onSaveEditedControl"
      :onCancelEditControl="onCancelEditControl"
      :onChangeControlValue="onChangeControlValue"
      :onChangeNewControlValue="onChangeNewControlValue"
      :controls="controls[activeShaderType]"
      :controlsIds="controlsIds[activeShaderType]"
      :newControl="newControl[activeShaderType]"
      :onToggleFooterControls="onToggleFooterControls"
      :controlsCopies="controlsCopies[activeShaderType]"
      :onSetActiveControlType="onSetActiveControlType"
      :isVisibleControlsFooter="isVisibleControlsFooter"
      :onSetFooterControlsHeight="onSetFooterControlsHeight"
      :onToggleCreateNewControlArea="onToggleCreateNewControlArea"
      :activeControlType="activeControlType[activeShaderType]"
      :editableControlsIds="editableControlsIds"
      :controlsFooterHeight="controlsFooterHeight"
    />
  </resize-box>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shaderEditor');

import { noop } from '../../common/utils/base-helper';
import editorsNames from '../../common/constants/editors-names';
import InputFile from '../../common/components/input-file/InputFile.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';

import ShaderControls from '../shader-controls/ShaderControls.vue';
import CodeEditor from '../code-editor/CodeEditor.vue';

import shadersTypes from '../../common/constants/shaders-types';

export default {
  name: 'ShaderEditor',
  props: {
    onSetActiveEditorName: { type: Function, default: noop }
  },
  components: {
    ShaderControls,
    ResizeBox,
    CodeEditor,
    CustomBtn,
    InputFile
  },
  data() {
    return {
      editorsNames,
      shadersTypes
    };
  },
  computed: mapState([
    'shaders',
    'controls',
    'controlsIds',
    'newControl',
    'materialId',
    'controlsCopies',
    'activeShaderType',
    'activeControlType',
    'editableControlsIds',
    'isVisibleControlsFooter',
    'controlsFooterHeight',
    'controlsPanelWidth'
  ]),
  methods: {
    ...mapActions([
      'onSaveShader',
      'onRemoveControl',
      'onSetEditControl',
      'onChangeCodeEditor',
      'onSaveNewControl',
      'onSaveEditedControl',
      'onCancelEditControl',
      'onChangeControlValue',
      'onSetPanelControlsWidth',
      'onChangeNewControlValue',
      'onToggleCreateNewControlArea',
      'onSetActiveShaderType',
      'onToggleFooterControls',
      'onSetActiveControlType',
      'onSetFooterControlsHeight'
    ])
  }
};
</script>
