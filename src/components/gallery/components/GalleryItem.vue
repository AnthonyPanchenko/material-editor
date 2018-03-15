<script>
import emptyObject from '../../../common/utils/emptyObject';
import noop from '../../../common/utils/noop';
import '../styles/gallery-item.scss';

export default {
  name: 'GalleryItem',
  props: {
    isActive: { type: Boolean, default: false },
    onClick: { type: Function, default: noop },
    item: { type: Object, default: emptyObject }
  },
  methods: {
    onItemClick(event) {
      this.onClick(this.item);
    }
  }
}
</script>

<template>
  <figure :class="['gallery-item', { 'active': isActive }]" @click="onItemClick">
    <div v-if="!!item.previewBgUlr" class="bg-image" :style="{ backgroundImage: `url(${item.previewBgUlr})` }" />
    <div v-else class="no-bg">
      <i class="icon-image" aria-hidden="true" />
    </div>
    <figcaption class="name">{{ item.name }}</figcaption>
  </figure>
</template>
