<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('ogmEditor');

import noop from '../../common/utils/noop';
import emptyObject from '../../common/utils/emptyObject';

import sections from '../../common/constants/material-editor-sections';
import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';

import MaterialEditor from '../material-editor/MaterialEditor.vue';
import GeometryEditor from '../geometry-editor/GeometryEditor.vue';
import ObjectEditor from '../object-editor/ObjectEditor.vue';

export default {
  name: 'OgmEditor',
  props: {
    activeObject: { type: Object, default: emptyObject },
    activeMaterial: { type: Object, default: emptyObject },
    activeGeometry: { type: Object, default: emptyObject },
    onChangeObjectProperty: { type: Function, default: noop },
    onChangeGeometryProperty: { type: Function, default: noop },
    onChangeMaterialProperty: { type: Function, default: noop },
    onOpenShaderEditor: { type: Function, default: noop },
    onToggleOpenGallery: { type: Function, default: noop }
  },
  components: {
    MaterialEditor,
    GeometryEditor,
    ObjectEditor,
    InputFile,
    CustomBtn,
    ResizeBox
  },
  data() {
    return {
      sections
    };
  },
  computed: mapState([
    'activeSectionName',
    'controlsPanelWidth',
    'activeMaterialTypeId'
  ]),
  methods: {
    ...mapActions([
      'onSetActiveSectionName',
      'onSetActiveMaterialTypeId',
      'onSetControlsPanelWidth'
    ]),
    onChangeNumberInput(value, name, min, max, step) {
      console.log(value, name, min, max, step);
    },
    onChangeSelect(selectedValue, name) {
      console.log(selectedValue);
      console.log(name);
    },
    onChangeFileInput(file) {
      console.log(file);
    },
    onChangeCheckBox(state, value, name) {
      console.log(state);
      console.log(value);
      console.log(name);
    }
  }
};
</script>

<template>
  <resize-box
    tag="section"
    resize="column"
    class="container controls-section"
    :size="controlsPanelWidth"
    :onEndOfResize="onSetControlsPanelWidth"
  >
    <header class="header controls-row">
      <custom-btn accesskey="s" iconClass="icon-settings" class="xs" />
      <custom-btn
        accesskey="o"
        title="Object"
        :active="activeSectionName === sections.OBJECT"
        :data="sections.OBJECT"
        :onClick="onSetActiveSectionName"
      />
      <custom-btn
        accesskey="g"
        title="Geometry"
        :active="activeSectionName === sections.GEOMETRY"
        :data="sections.GEOMETRY"
        :onClick="onSetActiveSectionName"
      />
      <custom-btn
        accesskey="m"
        title="Material"
        :active="activeSectionName === sections.MATERIAL"
        :data="sections.MATERIAL"
        :onClick="onSetActiveSectionName"
      />
      <custom-btn iconClass="icon-archive" :onClick="onToggleOpenGallery" class="xs" />
    </header>

    <section class="body">
      <object-editor
        :object="activeObject"
        :onSetNewObjectName="onSetNewObjectName"
        :onChange="onChangeObjectProperty"
        v-if="activeSectionName === sections.OBJECT"
      />
      <geometry-editor
        :geometry="activeGeometry"
        :onSetNewGeometryName="onSetNewGeometryName"
        :onChange="onChangeGeometryProperty"
        v-if="activeSectionName === sections.GEOMETRY"
      />
      <material-editor
        :material="activeMaterial"
        :onChange="onChangeMaterialProperty"
        :onOpenShaderEditor="onOpenShaderEditor"
        :onSetNewMaterialName="onSetNewMaterialName"
        :onSetActiveMaterialTypeId="onSetActiveMaterialTypeId"
        :activeMaterialTypeId="activeMaterialTypeId"
        v-if="activeSectionName === sections.MATERIAL"
      />
    </section>
    <footer class="footer controls-row" />
  </resize-box>
</template>
