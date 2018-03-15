<script>
import emptyArray from '../../common/utils/emptyArray';
import emptyObject from '../../common/utils/emptyObject';
import noop from '../../common/utils/noop';

import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import InputText from '../../common/components/input-text/InputText.vue';
import CanvasSection from '../canvas-section/CanvasSection.vue';
import GalleryItem from './components/GalleryItem.vue';

import * as api from '../../common/constants/api';
import * as internalUrls from '../../common/constants/internal-urls';
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
    CanvasSection,
    CustomBtn
  },
  data() {
    return {
      newItemName: '',
      isEditable: false,
      isVisibleCtrls: false
    };
  },
  methods: {
    isDifferenceNames() {
      return (this.newItemName && (this.selectedItem && this.selectedItem.name)) !== this.newItemName.trim();
    },
    onItemClick(item) {
      this.onSelect(item);
      this.newItemName = item.name;
      this.isVisibleCtrls = false;
    },
    onRenameItem() {
      if (this.isDifferenceNames()) {
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

<template>
  <div class="base-layout gallery">
    <section class="container controls-section">
      <div class="header controls-row">
        <h5 class="title">{{ title }}</h5>
        <custom-btn iconClass="icon-arrow-left" :onClick="onClose" class="danger xs" />
      </div>

      <div class="body">
        <ul class="list scroll-box">
          <li v-for="item in list" :key="item._id">
            <gallery-item :item="item" :isActive="selectedItem && (selectedItem._id === item._id)" :onClick="onItemClick" />
          </li>
        </ul>
      </div>

      <div v-if="selectedItem" class="footer controls-row">
        <custom-btn v-if="!isVisibleCtrls" iconClass="icon-trash-bin" :onClick="onRemoveItem" class="danger xs" />
        <custom-btn v-if="isVisibleCtrls" iconClass="icon-checkmark" :onClick="onRemove" class="success xs" />
        <custom-btn v-if="isVisibleCtrls" iconClass="icon-close" :onClick="onCancelRemoveItem" class="danger xs" />
        <input-text :value="newItemName" :onInput="onChangeItemName" />
        <custom-btn :disabled="!isDifferenceNames()" title="Rename" :onClick="onRenameItem" class="success sm" />
        <custom-btn title="Edit" :onClick="onEdit" class="primary sm" />
        <custom-btn title="Apply" :onClick="onApply" class="primary sm" />
      </div>

      <div v-else class="footer controls-row" />
    </section>

    <canvas-section>
      <div slot="header" class="header controls-row">
        <custom-btn iconClass="icon-sphere" />
        <custom-btn iconClass="icon-cube" />
        <custom-btn iconClass="icon-cylinder" />
        <custom-btn iconClass="icon-torus" />
        <custom-btn iconClass="icon-plane" />
      </div>
    </canvas-section>
  </div>
</template>
