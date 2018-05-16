<template>
  <div class="fieldset" v-if="!Object.keys(material).length" />

  <div v-else class="fieldset">
    <item-type-row :typeId="activeMaterialTypeId" :options="selectOptions" :onApply="onSetActiveMaterialTypeId" />
    <item-name-row :name="material['name']" :onApply="onSetNewMaterialName" />

    <popover v-if="isOpen" :trigger="colorPickerTrigger" :onClose="onClosePopover">
      <color-picker :name="currentColorPickerName" :color="material[currentColorPickerName]" :onChange="onChangeColor" />
    </popover>

    <div class="controls scroll-box">
      <div v-if="isDisplayedSection(mProps.COLOR)" class="row">
        <label class="label">Color</label>
        <output-color-btn :name="mProps.COLOR" :onClick="onToggleColorPickerPopover" :color="material[mProps.COLOR]" />
      </div>

      <div v-if="isDisplayedSection(mProps.ROUGHNESS)" class="row">
        <label class="label">Roughness</label>
        <input-number :value="material[mProps.ROUGHNESS]" :name="mProps.ROUGHNESS" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.METALNESS)" class="row">
        <label class="label">Metalness</label>
        <input-number :value="material[mProps.METALNESS]" :name="mProps.METALNESS" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.EMISSIVE)" class="row">
        <label class="label">Emissive</label>
        <output-color-btn :name="mProps.EMISSIVE" :onClick="onToggleColorPickerPopover" :color="material[mProps.EMISSIVE]" />
      </div>

      <div v-if="isDisplayedSection(mProps.SPECULAR)" class="row">
        <label class="label">Specular</label>
        <output-color-btn :name="mProps.SPECULAR" :onClick="onToggleColorPickerPopover" :color="material[mProps.SPECULAR]" />
      </div>

      <div v-if="isDisplayedSection(mProps.SHININESS)" class="row">
        <label class="label">Shininess</label>
        <input-number :value="material[mProps.SHININESS]" :name="mProps.SHININESS" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.CLEARCOAT)" class="row">
        <label class="label">ClearCoat</label>
        <input-number :value="material[mProps.CLEARCOAT]" :name="mProps.CLEARCOAT" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.CLEARCOATROUGHNESS)" class="row">
        <label class="label">ClearCoat Roughness</label>
        <input-number :value="material[mProps.CLEARCOATROUGHNESS]" :name="mProps.CLEARCOATROUGHNESS" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.SHADERS)" class="row">
        <label class="label">Shaders</label>
        <custom-btn title="Attach" iconClass="icon-plus" :onClick="onToggleOpenGallery" class="success" />
        <custom-btn title="Edit" iconClass="icon-pencil" :data="editorsNames.SHADER_EDITOR" :onClick="onOpenShaderEditor" class="primary" />
      </div>

      <div v-if="isDisplayedSection(mProps.VERTEXCOLORS)" class="row">
        <label class="label">Vertex Colors</label>
        <custom-select :options="selects[mProps.VERTEXCOLORS]" :name="mProps.VERTEXCOLORS" :onChange="onChangeSelect" />
      </div>

      <div v-if="isDisplayedSection(mProps.SKINNING)" class="row">
        <label class="label">Skinning</label>
        <checkbox-btn :name="mProps.SKINNING" :checked="material[mProps.SKINNING]" :onChange="onChangeCheckBox" />
      </div>

      <div v-if="isDisplayedSection(mProps.MAP)" class="row">
        <label class="label">Map</label>
        <checkbox-btn :name="mProps.MAP" :checked="material[mProps.MAP]" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.MAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(mProps.ALPHAMAP)" class="row">
        <label class="label">Alpha Map</label>
        <checkbox-btn :name="mProps.ALPHAMAP" :checked="material[mProps.ALPHAMAP]" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.ALPHAMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(mProps.BUMPMAP)" class="row">
        <label class="label">Bump Map</label>
        <checkbox-btn :name="mProps.BUMPMAP" :checked="material[mProps.BUMPMAP]" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.BUMPMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
        <input-number :value="material[mProps.BUMPMAP]" :name="mProps.BUMPMAP" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.NORMALMAP)" class="row">
        <label class="label">Normal Map</label>
        <checkbox-btn :name="mProps.NORMALMAP" :checked="material[mProps.NORMALMAP]" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.NORMALMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(mProps.DISPLACEMENTMAP)" class="row">
        <label class="label">Displacement Map</label>
        <checkbox-btn :name="mProps.DISPLACEMENTMAP" :checked="material[mProps.DISPLACEMENTMAP]" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.DISPLACEMENTMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
        <input-number :value="material[mProps.DISPLACEMENTMAP]" :name="mProps.DISPLACEMENTMAP" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.ROUGHNESSMAP)" class="row">
        <label class="label">Roughness Map</label>
        <checkbox-btn :name="mProps.ROUGHNESSMAP" :checked="material[mProps.ROUGHNESSMAP]" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.ROUGHNESSMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(mProps.METALNESSMAP)" class="row">
        <label class="label">Metalness Map</label>
        <checkbox-btn :name="mProps.METALNESSMAP" :checked="material[mProps.METALNESSMAP]" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.METALNESSMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(mProps.SPECULARMAP)" class="row">
        <label class="label">Specular Map</label>
        <checkbox-btn :name="mProps.SPECULARMAP" :checked="material[mProps.SPECULARMAP]" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.SPECULARMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(mProps.ENVMAP)" class="row">
        <label class="label">Env Map</label>
        <checkbox-btn :name="mProps.ENVMAP" :checked="material[mProps.ENVMAP]" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.ENVMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
        <input-number :value="material[mProps.ENVMAP]" :name="mProps.ENVMAP" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.LIGHTMAP)" class="row">
        <label class="label">Light Map</label>
        <checkbox-btn :name="mProps.LIGHTMAP" :checked="material[mProps.LIGHTMAP]" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.LIGHTMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
      </div>

      <div v-if="isDisplayedSection(mProps.AOMAP)" class="row">
        <label class="label">Ao Map</label>
        <checkbox-btn :name="mProps.AOMAP" :checked="material[mProps.AOMAP]" :onChange="onChangeCheckBox" />
        <input-file :name="mProps.AOMAP" :onChange="onChangeFileInput">
          <img-box />
        </input-file>
        <input-number :value="material[mProps.AOMAP]" :name="mProps.AOMAP" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.EMISSIVEMAP)" class="row">
        <label class="label">Emissive Map</label>
        <checkbox-btn :name="mProps.EMISSIVEMAP" :checked="material[mProps.EMISSIVEMAP]" :onChange="onChangeCheckBox" />
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
        <checkbox-btn :name="mProps.FLATSHADING" :checked="material[mProps.FLATSHADING]" :onChange="onChangeCheckBox" />
      </div>

      <div v-if="isDisplayedSection(mProps.BLENDING)" class="row">
        <label class="label">Blending</label>
        <custom-select :options="selects[mProps.BLENDING]" :name="mProps.BLENDING" :onChange="onChangeSelect" />
      </div>

      <div v-if="isDisplayedSection(mProps.OPACITY)" class="row">
        <label class="label">Opacity</label>
        <input-number :value="material[mProps.OPACITY]" :name="mProps.OPACITY" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.TRANSPARENT)" class="row">
        <label class="label">Transparent</label>
        <checkbox-btn :name="mProps.TRANSPARENT" :checked="material[mProps.TRANSPARENT]" :onChange="onChangeCheckBox" />
      </div>

      <div v-if="isDisplayedSection(mProps.ALPHATEST)" class="row">
        <label class="label">Alpha Test</label>
        <input-number :value="material[mProps.ALPHATEST]" :name="mProps.ALPHATEST" :onChange="onChangeNumberInput" />
      </div>

      <div v-if="isDisplayedSection(mProps.WIREFRAME)" class="row">
        <label class="label">Wireframe</label>
        <checkbox-btn :name="mProps.WIREFRAME" :checked="material[mProps.WIREFRAME]" :onChange="onChangeCheckBox" />
      </div>
    </div>

  </div>
</template>

<script>
import materialsTypes from '../../common/constants/materials-types';
import { createSelectOptions, noop, emptyObject } from '../../common/utils/base-helper';
import selects from './utils/selects';
import mProps from '../../common/constants/materials-properties';
import mapedMaterialsProps from './utils/maped-materials-properties';
import editorsNames from '../../common/constants/editors-names';

import ItemTypeRow from '../item-type-row/ItemTypeRow.vue';
import ItemNameRow from '../item-name-row/ItemNameRow.vue';
import Popover from '../../common/components/popover/Popover.vue';
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
  name: 'MaterialEditor',
  props: {
    activeMaterialTypeId: { type: String, default: materialsTypes.MESH_BASIC_MATERIAL },
    onSetNewMaterialName: { type: Function, default: noop },
    onSetActiveMaterialTypeId: { type: Function, default: noop },
    onOpenShaderEditor: { type: Function, default: noop },
    onToggleOpenGallery: { type: Function, default: noop },
    onChange: { type: Function, default: noop },
    material: { type: Object, default: emptyObject }
  },
  components: {
    ItemTypeRow,
    ItemNameRow,
    ImgBox,
    Popover,
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
      isOpen: false,
      editorsNames,
      currentColorPickerName: '',
      colorPickerTrigger: null,
      mapedMaterialsProps,
      selectOptions: createSelectOptions(materialsTypes)
    };
  },
  methods: {
    isDisplayedSection(property) {
      return this.mapedMaterialsProps[this.activeMaterialTypeId].indexOf(property) !== -1;
    },
    onClosePopover(name) {
      if (this.isOpen) {
        this.isOpen = false;
        this.currentColorPickerName = '';
      }
    },
    onToggleColorPickerPopover(triggerRef, name) {
      this.colorPickerTrigger = triggerRef;
      this.currentColorPickerName = name;
      this.isOpen = !this.isOpen;
    },
    onChangeSelect(option, fieldName) {
      this.onChange({ value: option.id, fieldName, id: this.material.id });
    },
    onChangeFileInput(value, fieldName) {
      this.onChange({ value, fieldName, id: this.material.id });
    },
    onChangeCheckBox(value, fieldName) {
      this.onChange({ value, fieldName, id: this.material.id });
    },
    onChangeColor(value, fieldName) {
      this.onChange({ value, fieldName, id: this.material.id });
    },
    onChangeNumberInput(value, fieldName) {
      this.onChange({ value, fieldName, id: this.material.id });
    }
  }
};
</script>
