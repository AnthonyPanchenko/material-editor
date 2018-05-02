<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('ogmEditor');

import noop from '../../common/utils/noop';
import emptyObject from '../../common/utils/emptyObject';

import editorsNames from '../../common/constants/editors-names';
import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';

import MaterialEditor from '../material-editor/MaterialEditor.vue';
import GeometryEditor from '../geometry-editor/GeometryEditor.vue';
import ObjectEditor from '../object-editor/ObjectEditor.vue';

export default {
  name: 'OgmEditor',
  props: {
    onSetActiveEditorName: { type: Function, default: noop },
    activeObject: { type: Object, default: emptyObject },
    activeMaterial: { type: Object, default: emptyObject },
    activeGeometry: { type: Object, default: emptyObject },
    onChangeObjectProperty: { type: Function, default: noop },
    onChangeGeometryProperty: { type: Function, default: noop },
    onChangeMaterialProperty: { type: Function, default: noop },
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
      editorsNames
    };
  },
  computed: mapState([
    'activeEditorName',
    'controlsPanelWidth',
    'activeMaterialTypeId'
  ]),
  methods: {
    ...mapActions([
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
        :active="activeEditorName === editorsNames.OBJECT_EDITOR"
        :data="editorsNames.OBJECT_EDITOR"
        :onClick="onSetActiveEditorName"
      />
      <custom-btn
        accesskey="g"
        title="Geometry"
        :active="activeEditorName === editorsNames.GEOMETRY_EDITOR"
        :data="editorsNames.GEOMETRY_EDITOR"
        :onClick="onSetActiveEditorName"
      />
      <custom-btn
        accesskey="m"
        title="Material"
        :active="activeEditorName === editorsNames.MATERIAL_EDITOR"
        :data="editorsNames.MATERIAL_EDITOR"
        :onClick="onSetActiveEditorName"
      />
      <custom-btn iconClass="icon-archive" :onClick="onToggleOpenGallery" class="xs" />
    </header>

    <section class="body">
      <object-editor
        :object="activeObject"
        :onSetNewObjectName="onSetNewObjectName"
        :onChange="onChangeObjectProperty"
        v-if="activeEditorName === editorsNames.OBJECT_EDITOR"
      />
      <geometry-editor
        :geometry="activeGeometry"
        :onSetNewGeometryName="onSetNewGeometryName"
        :onChange="onChangeGeometryProperty"
        v-if="activeEditorName === editorsNames.GEOMETRY_EDITOR"
      />
      <material-editor
        :material="activeMaterial"
        :onChange="onChangeMaterialProperty"
        :onOpenShaderEditor="onSetActiveEditorName"
        :onSetNewMaterialName="onSetNewMaterialName"
        :onSetActiveMaterialTypeId="onSetActiveMaterialTypeId"
        :activeMaterialTypeId="activeMaterialTypeId"
        v-if="activeEditorName === editorsNames.MATERIAL_EDITOR"
      />
    </section>
    <footer class="footer controls-row" />
  </resize-box>
</template>
