<script>
import materialsTypes, { selectOptions } from '../../common/constants/materials-types';
import selects from './utils/selects';
import noop from '../../common/utils/noop';
import emptyObject from '../../common/utils/emptyObject';
import mProps from '../../common/constants/materials-properties';
import mapedMaterialsProps from './utils/maped-materials-properties';

import ItemTypeRow from '../item-type-row/ItemTypeRow.vue';
import ItemNameRow from '../item-name-row/ItemNameRow.vue';
import OutputColorBtn from '../../common/components/output-color-btn/OutputColorBtn.vue';
import NumberPicker from '../../common/components/number-picker/NumberPicker.vue';
import ColorPicker from '../../common/components/color-picker/ColorPicker.vue';
import Vec2Picker from '../../common/components/vec2-picker/Vec2Picker.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';
import InputNumber from '../../common/components/input-number/InputNumber.vue';
import ImgBox from '../../common/components/img-box/ImgBox.vue';
import CheckboxBtn from '../../common/components/checkbox-btn/CheckboxBtn.vue';
import CustomSelect from '../../common/components/custom-select/CustomSelect.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'MaterialSection',
  props: {
    activeMaterialTypeId: { type: String, default: materialsTypes.MESH_BASIC_MATERIAL },
    onSetActiveMaterialTypeId: { type: Function, default: noop },
    onOpenShadersEditor: { type: Function, default: noop },
    onAttachShaders: { type: Function, default: noop },
    onChangeSelect: { type: Function, default: noop },
    onChangeFileInput: { type: Function, default: noop },
    onChangeCheckBox: { type: Function, default: noop },
    onChangeNumberInput: { type: Function, default: noop },
    material: { type: Object, default: emptyObject }
  },
  components: {
    ItemTypeRow,
    ItemNameRow,
    ImgBox,
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
      mProps,
      mapedMaterialsProps,
      selectOptions
    };
  },
  methods: {
    isDisplayedSection(property) {
      return this.mapedMaterialsProps[this.activeMaterialTypeId].indexOf(property) !== -1;
    }
  }
};
</script>

<template>
  <div class="fieldset">
    <item-type-row :typeId="activeMaterialTypeId" :options="selectOptions" :onApply="onSetActiveMaterialTypeId" />
    <item-name-row name="MeshBasicMaterial" />

    <div class="controls scroll-box">
      <div v-if="isDisplayedSection(mProps.COLOR)" class="row">
        <label class="label">Color</label>
        <output-color-btn />
      </div>

      <div v-if="isDisplayedSection(mProps.ROUGHNESS)" class="row">
        <label class="label">Roughness</label>
        <input-number :name="mProps.ROUGHNESS" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.METALNESS)" class="row">
        <label class="label">Metalness</label>
        <input-number :name="mProps.METALNESS" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.EMISSIVE)" class="row">
        <label class="label">Emissive</label>
        <output-color-btn />
      </div>

      <div v-if="isDisplayedSection(mProps.SPECULAR)" class="row">
        <label class="label">Specular</label>
        <output-color-btn />
      </div>

      <div v-if="isDisplayedSection(mProps.SHININESS)" class="row">
        <label class="label">Shininess</label>
        <input-number :name="mProps.SHININESS" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.CLEARCOAT)" class="row">
        <label class="label">ClearCoat</label>
        <input-number :name="mProps.CLEARCOAT" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.CLEARCOATROUGHNESS)" class="row">
        <label class="label">ClearCoat Roughness</label>
        <input-number :name="mProps.CLEARCOATROUGHNESS" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.SHADERS)" class="row">
        <label class="label">Shaders</label>
        <custom-btn title="Attach" iconClass="icon-plus" :onClick="onAttachShaders" class="success" />
        <custom-btn title="Edit" iconClass="icon-pencil" :onClick="onOpenShadersEditor" class="primary" />
      </div>

      <div v-if="isDisplayedSection(mProps.VERTEXCOLORS)" class="row">
        <label class="label">Vertex Colors</label>
        <custom-select :options="selects[mProps.VERTEXCOLORS]" :name="mProps.VERTEXCOLORS" :onChange="onChangeSelect" />
      </div>

      <div v-if="isDisplayedSection(mProps.SKINNING)" class="row">
        <label class="label">Skinning</label>
        <checkbox-btn :name="mProps.SKINNING" :checked="false" :onChange="onChangeCheckBox" />
      </div>

      <div v-if="isDisplayedSection(mProps.MAP)" class="row">
        <label class="label">Map</label>
        <checkbox-btn :name="mProps.MAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.MAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(mProps.ALPHAMAP)" class="row">
        <label class="label">Alpha Map</label>
        <checkbox-btn :name="mProps.ALPHAMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.ALPHAMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(mProps.BUMPMAP)" class="row">
        <label class="label">Bump Map</label>
        <checkbox-btn :name="mProps.BUMPMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.BUMPMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
        <input-number :name="mProps.BUMPMAP" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.NORMALMAP)" class="row">
        <label class="label">Normal Map</label>
        <checkbox-btn :name="mProps.NORMALMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.NORMALMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(mProps.DISPLACEMENTMAP)" class="row">
        <label class="label">Displacement Map</label>
        <checkbox-btn :name="mProps.DISPLACEMENTMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.DISPLACEMENTMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
        <input-number :name="mProps.DISPLACEMENTMAP" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.ROUGHNESSMAP)" class="row">
        <label class="label">Roughness Map</label>
        <checkbox-btn :name="mProps.ROUGHNESSMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.ROUGHNESSMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(mProps.METALNESSMAP)" class="row">
        <label class="label">Metalness Map</label>
        <checkbox-btn :name="mProps.METALNESSMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.METALNESSMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(mProps.SPECULARMAP)" class="row">
        <label class="label">Specular Map</label>
        <checkbox-btn :name="mProps.SPECULARMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.SPECULARMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(mProps.ENVMAP)" class="row">
        <label class="label">Env Map</label>
        <checkbox-btn :name="mProps.ENVMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.ENVMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
        <input-number :name="mProps.ENVMAP" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.LIGHTMAP)" class="row">
        <label class="label">Light Map</label>
        <checkbox-btn :name="mProps.LIGHTMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.LIGHTMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(mProps.AOMAP)" class="row">
        <label class="label">Ao Map</label>
        <checkbox-btn :name="mProps.AOMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.AOMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
        <input-number :name="mProps.AOMAP" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.EMISSIVEMAP)" class="row">
        <label class="label">Emissive Map</label>
        <checkbox-btn :name="mProps.EMISSIVEMAP" :checked="false" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.EMISSIVEMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(mProps.SIDE)" class="row">
        <label class="label">Side</label>
        <custom-select :options="selects[mProps.SIDE]" :name="mProps.SIDE" :onChange="onChangeSelect" />
      </div>

      <div v-if="isDisplayedSection(mProps.FLATSHADING)" class="row">
        <label class="label">Flat Shaded</label>
        <checkbox-btn :name="mProps.FLATSHADING" :checked="false" :onChange="onChangeCheckBox" />
      </div>

      <div v-if="isDisplayedSection(mProps.BLENDING)" class="row">
        <label class="label">Blending</label>
        <custom-select :options="selects[mProps.BLENDING]" :name="mProps.BLENDING" :onChange="onChangeSelect" />
      </div>

      <div v-if="isDisplayedSection(mProps.OPACITY)" class="row">
        <label class="label">Opacity</label>
        <input-number :name="mProps.OPACITY" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.TRANSPARENT)" class="row">
        <label class="label">Transparent</label>
        <checkbox-btn :name="mProps.TRANSPARENT" :checked="false" :onChange="onChangeCheckBox" />
      </div>

      <div v-if="isDisplayedSection(mProps.ALPHATEST)" class="row">
        <label class="label">Alpha Test</label>
        <input-number :name="mProps.ALPHATEST" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.WIREFRAME)" class="row">
        <label class="label">Wireframe</label>
        <checkbox-btn :name="mProps.WIREFRAME" :checked="false" :onChange="onChangeCheckBox" />
        <input-number :name="mProps.WIREFRAME" :onChange="onChangeNumberInput" />
      </div>
    </div>

  </div>
</template>
