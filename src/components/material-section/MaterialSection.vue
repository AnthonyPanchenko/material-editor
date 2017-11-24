<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('materialEditor');

import materialsTypes from '../../common/constants/materials-types';

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
import ItemObjList from '../item-obj-list/ItemObjList.vue';
import DrawingBoard from '../canvas-board/DrawingBoard.vue';
import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import PresentationFooter from '../presentation-footer/PresentationFooter.vue';
import internalUrls from '../../common/constants/internal-urls';
import tabNames from './constants/tabNames';

export default {
  name: 'MaterialEditor',
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
    CustomBtn,
    ItemObjList,
    DrawingBoard,
    ResizeBox,
    PresentationFooter
  },
  data() {
    return {
      tabNames,
      materialsTypes: Object.keys(materialsTypes).map(key => ({ title: materialsTypes[key], id: materialsTypes[key] })),

      options: [
        { title: 'NONE', id: '' },
        { title: 'One', id: 'aaa' },
        { title: 'Two', id: 'bbb' },
        { title: 'Three', id: 'ccc' }
      ],
      urls: internalUrls
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
    },
  }
};
</script>

<template>
  <div class="controls scroll-box">

    <div class="row">
      <span class="label">Specular Map</span>
      <checkbox-btn name="n2ame31" value="value1" :onChange="onChangeCheckBox" />
      <input-file name="file1" disabled :onChange="onChangeFileInput" />
    </div>

    <div class="row">
      <span class="label">Specular Map</span>
      <checkbox-btn name="n2ame31" value="value1" :onChange="onChangeCheckBox" />
      <input-file name="file1" :onChange="onChangeFileInput" />
    </div>

    <div class="row">
      <span class="label">Env Map</span>
      <checkbox-btn name="n2ame31" value="value1" :onChange="onChangeCheckBox" />
      <input-number />
      <input-file name="file1" :onChange="onChangeFileInput">
        <img-box />
      </input-file>
    </div>

    <div class="row">
      <span class="label">Light Map</span>
      <checkbox-btn name="n2ame31" value="value1" :onChange="onChangeCheckBox" />
      <input-file name="file1" :onChange="onChangeFileInput">
        <img-box url="/img/texture_img.jpg" />
      </input-file>
    </div>

    <div class="row">
      <span class="label">AO Map</span>
      <custom-select :options="options" name="selectname" :onChange="onChangeSelect" />
    </div>

  </div>
</template>
