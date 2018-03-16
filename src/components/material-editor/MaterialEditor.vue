<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('materialEditor');

import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';

import MaterialSection from '../material-section/MaterialSection.vue';
import GeometrySection from '../geometry-section/GeometrySection.vue';
import ObjectSection from '../object-section/ObjectSection.vue';

export default {
  name: 'MaterialEditor',
  components: {
    MaterialSection,
    GeometrySection,
    ObjectSection,
    InputFile,
    CustomBtn,
    ResizeBox
  },
  data() {
    return {};
  },
  computed: mapState([
    'controlsPanelWidth',
    'activeMaterialType',
  ]),
  methods: {
    ...mapActions([
      'onSetActiveMaterialType',
      'onSetControlsPanelWidth',
    ]),
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
      <custom-btn
        accesskey="s"
        iconClass="icon-settings"
        class="xs"
      />
      <custom-btn
        accesskey="o"
        title="Object"
        :active="activeObjInfoTabName === tabNames.OBJECT"
        :data="tabNames.OBJECT"
        :onClick="onSetActiveObjInfoTabName"
      />
      <custom-btn
        accesskey="g"
        title="Geometry"
        :active="activeObjInfoTabName === tabNames.GEOMETRY"
        :data="tabNames.GEOMETRY"
        :onClick="onSetActiveObjInfoTabName"
      />
      <custom-btn
        accesskey="m"
        title="Material"
        :active="activeObjInfoTabName === tabNames.MATERIAL"
        :data="tabNames.MATERIAL"
        :onClick="onSetActiveObjInfoTabName"
      />
    </header>

    <section class="body">
      <object-section
        v-if="activeObjInfoTabName === tabNames.OBJECT"
      />
      <geometry-section
        v-if="activeObjInfoTabName === tabNames.GEOMETRY"
      />
      <material-section
        v-if="activeObjInfoTabName === tabNames.MATERIAL"
        :onSetActiveMaterialType="onSetActiveMaterialType"
        :activeMaterialType="activeMaterialType"
      />
    </section>

    <footer class="footer controls-row" />
  </resize-box>
</template>
