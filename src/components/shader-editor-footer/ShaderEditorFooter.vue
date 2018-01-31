<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shaderEditorFooter');

import Popover from '../../common/components/popover/Popover.vue';
import NumberPicker from '../../common/components/number-picker/NumberPicker.vue';

import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import InputNumber from '../../common/components/input-number/InputNumber.vue';
import InputText from '../../common/components/input-text/InputText.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import CheckboxBtn from '../../common/components/checkbox-btn/CheckboxBtn.vue';
import RadioBtn from '../../common/components/radio-btn/RadioBtn.vue';
import CustomSelect from '../../common/components/custom-select/CustomSelect.vue';
import tabNames from './constants/tabNames';

export default {
  name: 'ShaderEditorFooter',
  data() {
    return {
      tabNames,

      color: { r: 70, g: 70, b: 220, a: 1 },
      matrices: {
        mat2: [
          [{ id: 'val-00', value: 1 }, { id: 'val-01', value: 0 }],
          [{ id: 'val-10', value: 0 }, { id: 'val-11', value: 1 }]
        ],
        mat3: [
          [{ id: 'val-00', value: 1 }, { id: 'val-01', value: 0 }, { id: 'val-02', value: 0 }],
          [{ id: 'val-10', value: 0 }, { id: 'val-11', value: 1 }, { id: 'val-12', value: 0 }],
          [{ id: 'val-20', value: 0 }, { id: 'val-21', value: 0 }, { id: 'val-22', value: 1 }]
        ],
        mat4: [
          [{ id: 'val-00', value: 1 }, { id: 'val-01', value: 0 }, { id: 'val-02', value: 0 }, { id: 'val-03', value: 0 }],
          [{ id: 'val-10', value: 0 }, { id: 'val-11', value: 1 }, { id: 'val-12', value: 0 }, { id: 'val-13', value: 0 }],
          [{ id: 'val-20', value: 0 }, { id: 'val-21', value: 0 }, { id: 'val-22', value: 1 }, { id: 'val-23', value: 0 }],
          [{ id: 'val-30', value: 0 }, { id: 'val-31', value: 0 }, { id: 'val-32', value: 0 }, { id: 'val-33', value: 1 }]
        ]
      },

      options: [
        { title: 'int', id: 'int' },
        { title: 'float', id: 'float' },
        { title: 'vec2', id: 'vec2' },
        { title: 'vec3', id: 'vec3' },
        { title: 'vec4', id: 'vec4' },
        { title: 'mat2', id: 'mat2' },
        { title: 'mat3', id: 'mat3' },
        { title: 'mat4', id: 'mat4' }
      ]
    };
  },
  components: {
    Popover,
    NumberPicker,
    CustomSelect,
    CheckboxBtn,
    InputNumber,
    InputText,
    RadioBtn,
    CustomBtn,
    ResizeBox
  },

  computed: mapState([
    'isVisibleFooterContent',
    'activeTabName',
    'footerHeight'
  ]),

  methods: {
    ...mapActions([
      'onToggleFooterContent',
      'onSetActiveTabName',
      'onSetFooterHeight'
    ]),

    isActive(tabName) {
      return this.activeTabName === tabName && this.isVisibleFooterContent;
    },

    getIconClass(tabName) {
      return this.isActive(tabName) ? 'icon-plus' : '';
    },

    onChangeVec3Picker(x, y, z, name) {
      console.clear();
      console.log('vec2 x > ', x);
      console.log('vec2 y > ', y);
      console.log('vec2 z > ', z);
      console.log('name > ', name);
    },

    onChangeNumberPicker(value, name, min, max, step) {
      console.clear();
      console.log('value > ', value);
      console.log('name > ', name);
      console.log('min > ', min);
      console.log('max > ', max);
      console.log('step > ', step);
    },

    onChangeVec2Picker(x, y, name) {
      console.clear();
      console.log('vec2 x > ', x);
      console.log('vec2 y > ', y);
      console.log('name > ', name);
    },

    onChangeCheckBox(state, value, name) {
      console.log(state);
      console.log(value);
      console.log(name);
    },

    onChangeRadioBtn(pickedValue, name) {
      console.log(pickedValue);
      console.log(name);
    },

    onChangeSelect(selectedValue, name) {
      console.log(selectedValue);
      console.log(name);
    },

    onChangeColorPicker(color) {
      this.color = color;
      console.log(color);
    },

    onTabClick(tabName) {
      if (tabName === this.activeTabName) {
        console.log('create new setting');
      } else {
        this.onSetActiveTabName(tabName);
      }
    }
  },
  mounted() { }
};
</script>

<template>
  <resize-box tag="footer" resize="row" :onEndOfResize="onSetFooterHeight" :size="footerHeight" class="controls-footer shader-editor-footer" :disabled="!isVisibleFooterContent">
    <div class="controls-row">
      <custom-btn accesskey="a" title="Attributes" :iconClass="getIconClass(tabNames.ATTRIBUTES)" :active="isActive(tabNames.ATTRIBUTES)" :disabled="!isVisibleFooterContent" :data="tabNames.ATTRIBUTES" :onClick="onTabClick" />
      <custom-btn accesskey="u" title="Uniforms" :iconClass="getIconClass(tabNames.UNIFORMS)" :active="isActive(tabNames.UNIFORMS)" :disabled="!isVisibleFooterContent" :data="tabNames.UNIFORMS" :onClick="onTabClick" />
      <custom-btn accesskey="t" title="Textures" :iconClass="getIconClass(tabNames.TEXTURES)" :active="isActive(tabNames.TEXTURES)" :disabled="!isVisibleFooterContent" :data="tabNames.TEXTURES" :onClick="onTabClick" />
      <custom-btn accesskey="c" :iconClass="isVisibleFooterContent ? 'icon-collapse-vertical' : 'icon-expand-vertical'" class="xs" :onClick="onToggleFooterContent" />
    </div>

    <div v-if="isVisibleFooterContent && activeTabName === tabNames.ATTRIBUTES" class="shader-ctrl-settings">
      tabNames.ATTRIBUTES
      <div class="controls scroll-box">

      </div>
    </div>

    <div v-if="isVisibleFooterContent && activeTabName === tabNames.UNIFORMS" class="shader-ctrl-settings">
      tabNames.UNIFORMS
      <div class="controls scroll-box">

      </div>
    </div>

    <div v-if="isVisibleFooterContent && activeTabName === tabNames.TEXTURES" class="shader-ctrl-settings">
      tabNames.TEXTURES
      <div class="controls scroll-box">

      </div>
    </div>

  </resize-box>
</template>
