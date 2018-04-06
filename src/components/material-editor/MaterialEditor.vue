<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('materialEditor');

import noop from '../../common/utils/noop';
import emptyObject from '../../common/utils/emptyObject';

import sections from '../../common/constants/material-editor-sections';
import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';

import MaterialSection from '../material-section/MaterialSection.vue';
import GeometrySection from '../geometry-section/GeometrySection.vue';
import ObjectSection from '../object-section/ObjectSection.vue';

export default {
  name: 'MaterialEditor',
  props: {
    currentObject: { type: Object, default: emptyObject },
    currentMaterial: { type: Object, default: emptyObject },
    currentGeometry: { type: Object, default: emptyObject },
    onToggleOpenGallery: { type: Function, default: noop }
  },
  components: {
    MaterialSection,
    GeometrySection,
    ObjectSection,
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
      <custom-btn iconClass="icon-gallery" :onClick="onToggleOpenGallery" class="xs" />
    </header>

    <section class="body">
      <object-section
        :object="currentObject"
        v-if="activeSectionName === sections.OBJECT"
      />
      <geometry-section
        :geometry="currentGeometry"
        v-if="activeSectionName === sections.GEOMETRY"
      />
      <material-section
        :material="currentMaterial"
        :onSetActiveMaterialTypeId="onSetActiveMaterialTypeId"
        :activeMaterialTypeId="activeMaterialTypeId"
        v-if="activeSectionName === sections.MATERIAL"
      />
    </section>
    <footer class="footer controls-row" />
  </resize-box>
</template>
