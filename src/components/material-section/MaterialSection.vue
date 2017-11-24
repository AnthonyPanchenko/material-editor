<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('materialEditor');

import materialsTypes from '../../common/constants/materials-types';
import materialsProperties from '../../common/constants/materials-properties';
import mapedMaterialsProperties from '../../common/constants/maped-materials-properties';

import NumberPicker from '../../common/components/number-picker/NumberPicker.vue';
import ColorPicker from '../../common/components/color-picker/ColorPicker.vue';
import Vec2Picker from '../../common/components/vec2-picker/Vec2Picker.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';
import InputText from '../../common/components/input-text/InputText.vue';
import InputNumber from '../../common/components/input-number/InputNumber.vue';
import ImgBox from '../../common/components/img-box/ImgBox.vue';
import CheckboxBtn from '../../common/components/checkbox-btn/CheckboxBtn.vue';
import CustomSelect from '../../common/components/custom-select/CustomSelect.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'MaterialEditor',
  props: {
    materialType: {
      type: String,
      default: ''
    }
  },
  components: {
    ImgBox,
    InputText,
    InputFile,
    NumberPicker,
    ColorPicker,
    Vec2Picker,
    InputNumber,
    CheckboxBtn,
    CustomSelect,
    CustomBtn
  },
  data() {
    return {
      materialsTypes,
      m: materialsProperties,
      mapedMaterialsProperties,

      options: [
        { title: 'NONE', id: ' },
        { title: 'One', id: 'aaa' },
        { title: 'Two', id: 'bbb' },
        { title: 'Three', id: 'ccc' }
      ]
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
      'onSetActiveTabName',
      'onSetCtrlBoxWidth',
      'onToggleObjectsList',
      'onToggleFullScreenMode'
    ]),
    isDisplayedSection(property) {
      return this.mapedMaterialsProperties[this.materialsType].indexOf(property) !== -1;
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
  <div class="controls scroll-box">
    <!-- ======================= -->
    <div v-for="prop in mapedMaterialsProperties[materialsType]" :key="prop" class="row">
      <span class="label">{{ materialPropLabels[prop].label }}</span>
      <button v-if="settings[prop].color" type="color">color</button>
      <checkbox-btn v-if="settings[prop].checkbox" :name="m[prop]" :checked="false" :onChange="onChangeCheckBox" />
      <input-file v-if="settings[prop].file" :name="m[prop]" :onChange="onChangeFileInput" />
      <input-number v-if="settings[prop].number" :name="m[prop]" :onChange="onChangeNumberInput" />
    </div>

    <!-- ======================= -->

    <div v-if="isDisplayedSection(m.COLOR)" class="row">
      <span class="label">Color</span>
      <button type="color">color</button>
    </div>

    <div v-if="isDisplayedSection(m.ROUGHNESS)" class="row">
      <span class="label">Roughness</span>
      <input-number :name="m.ROUGHNESS" :onChange="onChangeNumberInput" />
    </div>

    <div v-if="isDisplayedSection(m.METALNESS)" class="row">
      <span class="label">Metalness</span>
      <input-number :name="m.METALNESS" :onChange="onChangeNumberInput" />
    </div>

    <div v-if="isDisplayedSection(m.EMISSIVE)" class="row">
      <span class="label">Emissive</span>
      <button type="color">color</button>
    </div>

    <div v-if="isDisplayedSection(m.SPECULAR)" class="row">
      <span class="label">Specular</span>
      <button type="color">color</button>
    </div>

    <div v-if="isDisplayedSection(m.SHININESS)" class="row">
      <span class="label">Shininess</span>
      <input-number :name="m.SHININESS" :onChange="onChangeNumberInput" />
    </div>

    <div v-if="isDisplayedSection(m.CLEARCOAT)" class="row">
      <span class="label">ClearCoat</span>
      <input-number :name="m.CLEARCOAT" :onChange="onChangeNumberInput" />
    </div>

    <div v-if="isDisplayedSection(m.CLEARCOATROUGHNESS)" class="row">
      <span class="label">ClearCoat Roughness</span>
      <input-number :name="m.CLEARCOATROUGHNESS" :onChange="onChangeNumberInput" />
    </div>

    <!-- VERTEXSHADER FRAGMENTSHADER -->

    <div v-if="isDisplayedSection(m.VERTEXCOLORS)" class="row">
      <span class="label">Vertex Colors</span>
      <custom-select :options="options" :name="m.VERTEXCOLORS" :onChange="onChangeSelect" />
    </div>

    <div v-if="isDisplayedSection(m.SKINNING)" class="row">
      <span class="label">Skinning</span>
      <checkbox-btn :name="m.SKINNING" :checked="false" :onChange="onChangeCheckBox" />
    </div>

    <div v-if="isDisplayedSection(m.MAP)" class="row">
      <span class="label">Map</span>
      <checkbox-btn :name="m.MAP" :checked="false" :onChange="onChangeCheckBox" />
      <input-file :name="m.MAP" :onChange="onChangeFileInput" />
    </div>

    <div v-if="isDisplayedSection(m.ALPHAMAP)" class="row">
      <span class="label">Alpha Map</span>
      <checkbox-btn :name="m.ALPHAMAP" :checked="false" :onChange="onChangeCheckBox" />
      <input-file :name="m.ALPHAMAP" :onChange="onChangeFileInput" />
    </div>

    <div v-if="isDisplayedSection(m.BUMPMAP)" class="row">
      <span class="label">Bump Map</span>
      <checkbox-btn :name="m.BUMPMAP" :checked="false" :onChange="onChangeCheckBox" />
      <input-file :name="m.BUMPMAP" :onChange="onChangeFileInput" />
      <input-number :name="m.BUMPMAP" :onChange="onChangeNumberInput" />
    </div>

    <div v-if="isDisplayedSection(m.NORMALMAP)" class="row">
      <span class="label">Normal Map</span>
      <checkbox-btn :name="m.NORMALMAP" :checked="false" :onChange="onChangeCheckBox" />
      <input-file :name="m.NORMALMAP" :onChange="onChangeFileInput" />
    </div>

    <div v-if="isDisplayedSection(m.DISPLACEMENTMAP)" class="row">
      <span class="label">Displacement Map</span>
      <checkbox-btn :name="m.DISPLACEMENTMAP" :checked="false" :onChange="onChangeCheckBox" />
      <input-file :name="m.DISPLACEMENTMAP" :onChange="onChangeFileInput" />
      <input-number :name="m.DISPLACEMENTMAP" :onChange="onChangeNumberInput" />
    </div>

    <div v-if="isDisplayedSection(m.ROUGHNESSMAP)" class="row">
      <span class="label">Roughness Map</span>
      <checkbox-btn :name="m.ROUGHNESSMAP" :checked="false" :onChange="onChangeCheckBox" />
      <input-file :name="m.ROUGHNESSMAP" :onChange="onChangeFileInput" />
    </div>

    <div v-if="isDisplayedSection(m.METALNESSMAP)" class="row">
      <span class="label">Metalness Map</span>
      <checkbox-btn :name="m.METALNESSMAP" :checked="false" :onChange="onChangeCheckBox" />
      <input-file :name="m.METALNESSMAP" :onChange="onChangeFileInput" />
    </div>

    <div v-if="isDisplayedSection(m.SPECULARMAP)" class="row">
      <span class="label">Specular Map</span>
      <checkbox-btn :name="m.SPECULARMAP" :checked="false" :onChange="onChangeCheckBox" />
      <input-file :name="m.SPECULARMAP" :onChange="onChangeFileInput" />
    </div>

    <div v-if="isDisplayedSection(m.ENVMAP)" class="row">
      <span class="label">Env Map</span>
      <checkbox-btn :name="m.ENVMAP" :checked="false" :onChange="onChangeCheckBox" />
      <input-file :name="m.ENVMAP" :onChange="onChangeFileInput" />
      <input-number :name="m.ENVMAP" :onChange="onChangeNumberInput" />
    </div>

    <div v-if="isDisplayedSection(m.LIGHTMAP)" class="row">
      <span class="label">Light Map</span>
      <checkbox-btn :name="m.LIGHTMAP" :checked="false" :onChange="onChangeCheckBox" />
      <input-file :name="m.LIGHTMAP" :onChange="onChangeFileInput" />
    </div>

    <div v-if="isDisplayedSection(m.AOMAP)" class="row">
      <span class="label">Ao Map</span>
      <checkbox-btn :name="m.AOMAP" :checked="false" :onChange="onChangeCheckBox" />
      <input-file :name="m.AOMAP" :onChange="onChangeFileInput" />
      <input-number :name="m.AOMAP" :onChange="onChangeNumberInput" />
    </div>

    <div v-if="isDisplayedSection(m.EMISSIVEMAP)" class="row">
      <span class="label">Emissive Map</span>
      <checkbox-btn :name="m.EMISSIVEMAP" :checked="false" :onChange="onChangeCheckBox" />
      <input-file :name="m.EMISSIVEMAP" :onChange="onChangeFileInput" />
    </div>

    <div v-if="isDisplayedSection(m.SIDE)" class="row">
      <span class="label">Side</span>
      <custom-select :options="options" :name="m.SIDE" :onChange="onChangeSelect" />
    </div>

    <div v-if="isDisplayedSection(m.FLATSHADING)" class="row">
      <span class="label">Flat Shaded</span>
      <checkbox-btn :name="m.FLATSHADING" :checked="false" :onChange="onChangeCheckBox" />
    </div>

    <div v-if="isDisplayedSection(m.BLENDING)" class="row">
      <span class="label">Blending</span>
      <custom-select :options="options" :name="m.BLENDING" :onChange="onChangeSelect" />
    </div>

    <div v-if="isDisplayedSection(m.OPACITY)" class="row">
      <span class="label">Opacity</span>
      <input-number :name="m.OPACITY" :onChange="onChangeNumberInput" />
    </div>

    <div v-if="isDisplayedSection(m.TRANSPARENT)" class="row">
      <span class="label">Transparent</span>
      <checkbox-btn :name="m.TRANSPARENT" :checked="false" :onChange="onChangeCheckBox" />
    </div>

    <div v-if="isDisplayedSection(m.ALPHATEST)" class="row">
      <span class="label">Alpha Test</span>
      <input-number :name="m.ALPHATEST" :onChange="onChangeNumberInput" />
    </div>

    <div v-if="isDisplayedSection(m.WIREFRAME)" class="row">
      <span class="label">Wireframe</span>
      <checkbox-btn :name="m.WIREFRAME" :checked="false" :onChange="onChangeCheckBox" />
      <input-number :name="m.WIREFRAME" :onChange="onChangeNumberInput" />
    </div>
  </div>
</template>
