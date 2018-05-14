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
        :onToggleOpenGallery="onToggleOpenGallery"
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

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('ogmEditor');

import { noop, emptyObject } from '../../common/utils/base-helper';
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
    activeEditorName: { type: String, default: editorsNames.MATERIAL_EDITOR },
    onSetActiveEditorName: { type: Function, default: noop },
    onSetNewMaterialName: { type: Function, default: noop },
    onSetNewGeometryName: { type: Function, default: noop },
    onSetNewObjectName: { type: Function, default: noop },
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
    'controlsPanelWidth',
    'activeMaterialTypeId'
  ]),
  methods: {
    ...mapActions([
      'onSetActiveMaterialTypeId',
      'onSetControlsPanelWidth'
    ])
  }
};
</script>
