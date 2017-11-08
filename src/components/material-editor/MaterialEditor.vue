<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("materialEditor");

import ColorPicker from "../../common/components/color-picker/ColorPicker.vue";
import Vec2Picker from "../../common/components/vec2-picker/Vec2Picker.vue";
import InputFile from "../../common/components/input-file/InputFile.vue";
import InputNumber from "../../common/components/input-number/InputNumber.vue";
import ImgBox from "../../common/components/img-box/ImgBox.vue";
import CheckboxBtn from "../../common/components/checkbox-btn/CheckboxBtn.vue";
import CustomSelect from "../../common/components/custom-select/CustomSelect.vue";
import CustomBtn from "../../common/components/custom-btn/CustomBtn.vue";
import ItemObjList from "../item-obj-list/ItemObjList.vue";
import DrawingBoard from "../canvas-board/DrawingBoard.vue";
import ResizeBox from "../../common/components/resize-box/ResizeBox.vue";
import PresentationFooter from "../presentation-footer/PresentationFooter.vue";
import internalUrls from "../../common/constants/internal-urls";
import tabNames from "./constants/tabNames";

export default {
  name: "MaterialEditor",
  components: {
    ImgBox,
    InputFile,
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
      options: [
        { title: "NONE", id: "" },
        { title: "One", id: "aaa" },
        { title: "Two", id: "bbb" },
        { title: "Three", id: "ccc" }
      ],
      urls: internalUrls
    };
  },
  computed: mapState([
    "widthCtrlBox",
    "activeTabName",
    "isVisibleControlsBox",
    "isVisibleObjectsList"
  ]),
  methods: {
    ...mapActions([
      "onSetActiveTabName",
      "onSetCtrlBoxWidth",
      "onToggleObjectsList",
      "onToggleFullScreenMode"
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
    onTabClick(event) {
      if (event.target.dataset.tab === this.activeTabName) {
        console.log("create new setting");
      } else {
        this.onSetActiveTabName(event.target.dataset.tab);
      }
    }
  }
};
</script>

<template>
  <div class="editor-container">

    <resize-box v-if="isVisibleControlsBox" tag="section" resize="column" :onEndOfResize="onSetCtrlBoxWidth" :size="widthCtrlBox" class="controls-section">
      <header class="controls-header">
        <div class="controls-row">
          <custom-btn accesskey="s" iconClass="icon-settings" class="xs" />
          <custom-btn accesskey="o" title="Object" :active="activeTabName === tabNames.OBJECT" :data-tab="tabNames.OBJECT" :onClick="onTabClick" />
          <custom-btn accesskey="g" title="Geometry" :active="activeTabName === tabNames.GEOMETRY" :data-tab="tabNames.GEOMETRY" :onClick="onTabClick" />
          <custom-btn accesskey="m" title="Material" :active="activeTabName === tabNames.MATERIAL" :data-tab="tabNames.MATERIAL" :onClick="onTabClick" />
          <custom-btn :link="`/${urls.SHADER_EDITOR}`" accesskey="w" iconClass="icon-shader-editor" class="xs" />
        </div>
      </header>

      <section class="controls-content">
        <div v-if="activeTabName === tabNames.OBJECT" class="fieldset">
          <div class="type"><span class="label">Type:</span> Mesh</div>
          <div class="name"><span class="label">Name:</span> Plane 18</div>
          <div class="controls scroll-box">
            <div class="row">
              <span class="label">Position</span>
              <input-number />
              <input-number />
              <input-number />
            </div>

            <div class="row">
              <span class="label">Rotation</span>
              <input-number />
              <input-number />
              <input-number />
            </div>

            <div class="row">
              <span class="label">Scale</span>
              <input-number />
              <input-number />
              <input-number />
            </div>

            <div class="row">
              <span class="label">Shadow</span>
              <checkbox-btn class="check-box" sufix="cast" name="n2ame31" value="value1" :onChange="onChangeCheckBox" />
              <checkbox-btn class="check-box" sufix="receive" name="n2ame31" value="value1" :onChange="onChangeCheckBox" />
            </div>
          </div>
        </div>

        <div v-if="activeTabName === tabNames.GEOMETRY" class="fieldset">
            GEOMETRY
            <vec2-picker />
            <hr>
            <color-picker />
        </div>

        <div v-if="activeTabName === tabNames.MATERIAL" class="fieldset">
          <div class="type"><span class="label">Type:</span> Mesh Normal Material</div>
          <div class="name"><span class="label">Name:</span> Material</div>
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
        </div>
      </section>

      <footer class="controls-footer">
        <div class="controls-row"></div>
      </footer>
    </resize-box>

    <section class="presentation-section">
      <header class="presentation-header">
        <div class="controls-row">
          <custom-btn iconClass="icon-list" class="xs" accesskey="q" :onClick="onToggleObjectsList" />
          <custom-btn iconClass="icon-move" class="xs" />
          <custom-btn iconClass="icon-rotate" class="xs" />
          <custom-btn iconClass="icon-scale" class="xs" />
        </div>
      </header>

      <section class="presentation-content">
        <transition name="slide-obj-list">
          <item-obj-list v-if="isVisibleObjectsList" />
        </transition>
        <div class="canvas-box">
          <drawing-board />
        </div>
      </section>

      <presentation-footer :isInFullScreenMode="isVisibleControlsBox" :onToggleFullScreenMode="onToggleFullScreenMode" />
    </section>

  </div>
</template>
