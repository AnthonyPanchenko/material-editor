<script>
import materialsTypes, { selectOptions } from '../../common/constants/materials-types';
import selects from './utils/selects';
import noop from '../../common/utils/noop';
import emptyObject from '../../common/utils/emptyObject';
import materialsProperties from '../../common/constants/materials-properties';
import mapedMaterialsProperties from './utils/maped-materials-properties';

import OutputColorBtn from '../../common/components/output-color-btn/OutputColorBtn.vue';
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
  name: 'MaterialSection',
  props: {
    activeMaterialType: { type: String, default: materialsTypes.MESH_BASIC_MATERIAL },
    onSetActiveMaterialTypeId: { type: Function, default: noop },
    onOpenShadersEditor: { type: Function, default: noop },
    onCreateNewProgram: { type: Function, default: noop },
    onAttachShaders: { type: Function, default: noop },
    onChangeSelect: { type: Function, default: noop },
    onChangeFileInput: { type: Function, default: noop },
    onChangeCheckBox: { type: Function, default: noop },
    onChangeNumberInput: { type: Function, default: noop },
    material: { type: Object, default: emptyObject }
  },
  components: {
    ImgBox,
    InputText,
    InputFile,
    OutputColorBtn,
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
      selects,
      m: materialsProperties,
      mapedMaterialsProperties,
      selectOptions
    };
  },
  methods: {
    isDisplayedSection(property) {
      return this.mapedMaterialsProperties[this.activeMaterialType].indexOf(property) !== -1;
    },
    onChangeSelect(selectedValue, name) {
      console.log(selectedValue, name);
    },
    onChangeFileInput(file) {
      console.log(file);
    },
    onChangeNumberInput(value, name, min, max, step) {
      console.log(value, name, min, max, step);
    },
    onChangeCheckBox(state, value, name) {
      console.log(state, value, name);
    }
  }
};
</script>

<template>
  <div class="fieldset">
    <div class="type">
      <span class="label">Type:</span>
      <custom-select :options="selectOptions" :onChange="onSetActiveMaterialTypeId" />
    </div>
    <div class="name">
      <span class="label">Name:</span>
      <input-text value="MeshBasicMaterial" />
    </div>

    <div class="controls scroll-box">
      <div v-if="isDisplayedSection(m.COLOR)" class="row">
        <span class="label">Color</span>
        <output-color-btn />
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
        <output-color-btn />
      </div>

      <div v-if="isDisplayedSection(m.SPECULAR)" class="row">
        <span class="label">Specular</span>
        <output-color-btn />
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

      <div v-if="isDisplayedSection(m.SHADERS)" class="row">
        <span class="label">Shaders</span>
        <custom-btn title="Attach" iconClass="icon-plus" :onClick="onAttachShaders" class="success" />
        <custom-btn title="Create" iconClass="icon-new-file" :onClick="onCreateNewProgram" class="success" />
        <custom-btn title="Edit" iconClass="icon-edit" :onClick="onOpenShadersEditor" class="primary" />
      </div>

      <div v-if="isDisplayedSection(m.VERTEXCOLORS)" class="row">
        <span class="label">Vertex Colors</span>
        <custom-select :options="selects[m.VERTEXCOLORS]" :name="m.VERTEXCOLORS" :onChange="onChangeSelect" />
      </div>

      <div v-if="isDisplayedSection(m.SKINNING)" class="row">
        <span class="label">Skinning</span>
        <checkbox-btn :name="m.SKINNING" :checked="false" :onChange="onChangeCheckBox" />
      </div>

      <div v-if="isDisplayedSection(m.MAP)" class="row">
        <span class="label">Map</span>
        <checkbox-btn :name="m.MAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="m.MAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(m.ALPHAMAP)" class="row">
        <span class="label">Alpha Map</span>
        <checkbox-btn :name="m.ALPHAMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="m.ALPHAMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(m.BUMPMAP)" class="row">
        <span class="label">Bump Map</span>
        <checkbox-btn :name="m.BUMPMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="m.BUMPMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
        <input-number :name="m.BUMPMAP" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(m.NORMALMAP)" class="row">
        <span class="label">Normal Map</span>
        <checkbox-btn :name="m.NORMALMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="m.NORMALMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(m.DISPLACEMENTMAP)" class="row">
        <span class="label">Displacement Map</span>
        <checkbox-btn :name="m.DISPLACEMENTMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="m.DISPLACEMENTMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
        <input-number :name="m.DISPLACEMENTMAP" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(m.ROUGHNESSMAP)" class="row">
        <span class="label">Roughness Map</span>
        <checkbox-btn :name="m.ROUGHNESSMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="m.ROUGHNESSMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(m.METALNESSMAP)" class="row">
        <span class="label">Metalness Map</span>
        <checkbox-btn :name="m.METALNESSMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="m.METALNESSMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(m.SPECULARMAP)" class="row">
        <span class="label">Specular Map</span>
        <checkbox-btn :name="m.SPECULARMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="m.SPECULARMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(m.ENVMAP)" class="row">
        <span class="label">Env Map</span>
        <checkbox-btn :name="m.ENVMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="m.ENVMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
        <input-number :name="m.ENVMAP" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(m.LIGHTMAP)" class="row">
        <span class="label">Light Map</span>
        <checkbox-btn :name="m.LIGHTMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="m.LIGHTMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(m.AOMAP)" class="row">
        <span class="label">Ao Map</span>
        <checkbox-btn :name="m.AOMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="m.AOMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
        <input-number :name="m.AOMAP" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(m.EMISSIVEMAP)" class="row">
        <span class="label">Emissive Map</span>
        <checkbox-btn :name="m.EMISSIVEMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="m.EMISSIVEMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(m.SIDE)" class="row">
        <span class="label">Side</span>
        <custom-select :options="selects[m.SIDE]" :name="m.SIDE" :onChange="onChangeSelect" />
      </div>

      <div v-if="isDisplayedSection(m.FLATSHADING)" class="row">
        <span class="label">Flat Shaded</span>
        <checkbox-btn :name="m.FLATSHADING" :checked="false" :onChange="onChangeCheckBox" />
      </div>

      <div v-if="isDisplayedSection(m.BLENDING)" class="row">
        <span class="label">Blending</span>
        <custom-select :options="selects[m.BLENDING]" :name="m.BLENDING" :onChange="onChangeSelect" />
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

  </div>
</template>
