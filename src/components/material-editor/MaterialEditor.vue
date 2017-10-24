<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("materialEditor");

import InputFile from "../../common/components/input-file/InputFile.vue";
import InputNumber from "../../common/components/input-number/InputNumber.vue";
import CheckboxBtn from "../../common/components/checkbox-btn/CheckboxBtn.vue";
import CustomSelect from "../../common/components/custom-select/CustomSelect.vue";
import CustomBtn from "../../common/components/custom-btn/CustomBtn.vue";
import ItemObjList from "../item-obj-list/ItemObjList.vue";
import CanvasBoard from "../canvas-board/CanvasBoard.vue";
import ResizeBox from "../resize-box/ResizeBox.vue";
import PresentationFooter from "../presentation-footer/PresentationFooter.vue";
import internalUrls from "../../common/constants/internal-urls";
import tabNames from "./constants/tabNames";

export default {
  name: "MaterialEditor",
  components: {
    InputFile,
    InputNumber,
    CheckboxBtn,
    CustomSelect,
    CustomBtn,
    ItemObjList,
    CanvasBoard,
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

    <resize-box v-if="isVisibleControlsBox" tag="section" resize="column" :onEndOfResize="onSetCtrlBoxWidth" :size="widthCtrlBox" customClass="controls-section">
      <header class="controls-header">
        <div class="controls-row">
          <custom-btn iconClass="icon-settings" customClass="ctrl-btn-default xs" />
          <custom-btn title="Object" :active="activeTabName === tabNames.OBJECT" :data-tab="tabNames.OBJECT" :onCustomClick="onTabClick" />
          <custom-btn title="Geometry" :active="activeTabName === tabNames.GEOMETRY" :data-tab="tabNames.GEOMETRY" :onCustomClick="onTabClick" />
          <custom-btn title="Material" :active="activeTabName === tabNames.MATERIAL" :data-tab="tabNames.MATERIAL" :onCustomClick="onTabClick" />
          <custom-btn :link="`/${urls.SHADER_EDITOR}`" iconClass="icon-shader-editor" customClass="ctrl-btn-default xs" />
        </div>
      </header>

      <section v-if="activeTabName === tabNames.OBJECT" class="controls-content fieldset">
        <div class="type"><span class="label">Type:</span> Mesh</div>
        <div class="name"><span class="label">Name:</span> Plane 18</div>
        <div class="controls">
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
        </div>
      </section>

      <section v-if="activeTabName === tabNames.GEOMETRY" class="controls-content fieldset">
          GEOMETRY
      </section>

      <section v-if="activeTabName === tabNames.MATERIAL" class="controls-content fieldset">
        <div class="type"><span class="label">Type:</span> Mesh Normal Material</div>
        <div class="name"><span class="label">Name:</span> Material</div>
        <div class="controls">
          <div class="row">
            <span class="label">Specular Map</span>
            <checkbox-btn name="n2ame31" value="value1" :onChange="onChangeCheckBox" />
            <input-file label="+file" name="file1" :onChange="onChangeFileInput" />
          </div>

          <div class="row">
            <span class="label">Env Map</span>
            <checkbox-btn name="n2ame31" value="value1" :onChange="onChangeCheckBox" />
            <input-file label="+file" name="file1" :onChange="onChangeFileInput" />
            <input-number />
          </div>

          <div class="row">
            <span class="label">Light Map</span>
            <checkbox-btn name="n2ame31" value="value1" :onChange="onChangeCheckBox" />
            <input-file label="+file" name="file1" :onChange="onChangeFileInput" />
          </div>

          <div class="row">
            <span class="label">AO Map</span>
            <custom-select :options="options" name="selectname" :onChange="onChangeSelect" />
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
          <custom-btn iconClass="icon-list" customClass="ctrl-btn-default xs" :onCustomClick="onToggleObjectsList" />
          <custom-btn title="Translate" customClass="ctrl-btn-default md" />
          <custom-btn title="Rotate" customClass="ctrl-btn-default md" />
          <custom-btn title="Scale" customClass="ctrl-btn-default md" />
        </div>
      </header>

      <section class="presentation-content">
        <transition name="slide-obj-list">
          <item-obj-list v-if="isVisibleObjectsList" />
        </transition>
        <div class="canvas-box"> canvas </div>
      </section>

      <presentation-footer :isInFullScreenMode="isVisibleControlsBox" :onToggleFullScreenMode="onToggleFullScreenMode" />
    </section>

  </div>
</template>
