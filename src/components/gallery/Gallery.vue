<template>
  <div class="gallery">
    <section class="container controls-section">
      <div class="header controls-row">
        <h5 class="title">{{ title }}</h5>
        <custom-btn iconClass="icon-close" :onClick="onClose" class="danger xs" />
      </div>

      <div class="body">
        <ul class="list scroll-box">
          <li v-for="item in list" :key="item._id">
            <gallery-item :item="item" :isActive="selectedItem && (selectedItem._id === item._id)" :onClick="onItemClick" />
          </li>
        </ul>
      </div>

      <div v-if="!!Object.keys(selectedItem).length" class="footer controls-row">
        <custom-btn v-if="!isVisibleCtrls" iconClass="icon-trash-bin" :onClick="onRemoveItem" class="danger xs" />
        <custom-btn v-if="isVisibleCtrls" iconClass="icon-close" :onClick="onCancelRemoveItem" class="danger xs" />
        <custom-btn v-if="isVisibleCtrls" iconClass="icon-checkmark" :onClick="onRemove" class="success xs" />
        <input-text :value="newItemName" :onInput="onChangeItemName" />
        <custom-btn :disabled="!isDifferentNames()" title="Rename" :onClick="onRenameItem" class="success sm" />
        <custom-btn title="Apply" :onClick="onApply" class="primary sm" />
      </div>

      <div v-else class="footer controls-row" />
    </section>

    <section class="container canvas-section">
      <div class="header controls-row">
        <custom-btn iconClass="icon-sphere" />
        <custom-btn iconClass="icon-cube" />
        <custom-btn iconClass="icon-cylinder" />
        <custom-btn iconClass="icon-torus" />
        <custom-btn iconClass="icon-plane" />
      </div>

      <div class="body">
        <div ref="canvasBox" class="canvas-box" />
      </div>

      <div class="footer controls-row">
        <span class="label fps">FPS 60</span>
      </div>
    </section>
  </div>
</template>

<script>
import { noop, emptyObject, emptyArray } from '../../common/utils/base-helper';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import InputText from '../../common/components/input-text/InputText.vue';
import GalleryItem from './components/GalleryItem.vue';

import './styles/gallery.scss';

export default {
  name: 'Gallery',
  props: {
    title: { type: String, default: 'Gallery' },
    list: { type: Array, default: emptyArray },
    selectedItem: { type: Object, default: emptyObject },
    onRemove: { type: Function, default: noop },
    onSelect: { type: Function, default: noop },
    onRename: { type: Function, default: noop },
    onClose: { type: Function, default: noop },
    onEdit: { type: Function, default: noop },
    onApply: { type: Function, default: noop }
  },
  components: {
    InputText,
    GalleryItem,
    CustomBtn
  },
  data() {
    return {
      newItemName: '',
      isVisibleCtrls: false
    };
  },
  methods: {
    isDifferentNames() {
      return (this.newItemName && (this.selectedItem && this.selectedItem.name)) !== this.newItemName.trim();
    },
    onItemClick(item) {
      this.onSelect(item);
      this.newItemName = item.name;
      this.isVisibleCtrls = false;
    },
    onRenameItem() {
      if (this.isDifferentNames()) {
        console.log(this.newItemName.trim());
      }
    },
    onChangeItemName(str) {
      this.newItemName = str;
    },
    onRemoveItem() {
      this.newItemName = this.selectedItem.name;
      this.isVisibleCtrls = true;
    },
    onCancelRemoveItem() {
      this.isVisibleCtrls = false;
    }
  }
}
</script>
