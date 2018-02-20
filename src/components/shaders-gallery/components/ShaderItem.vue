<script>
import emptyObject from '../../../common/utils/emptyObject';
import noop from '../../../common/utils/noop';
import '../styles/shader-item.scss';

export default {
  name: 'ShadersItem',
  props: {
    isActive: { type: Boolean, default: false },
    onClick: { type: Function, default: noop },
    shader: { type: Object, default: emptyObject }
  },
  methods: {
    onShaderClick(event) {
      this.onClick(this.shader);
    }
  }
}
</script>

<template>
  <figure :class="['shader-item', { 'active': isActive }]" @click="onShaderClick">
    <div v-if="!!shader.previewBgUlr" class="bg-image" :style="{ backgroundImage: `url(${shader.previewBgUlr})` }" />
    <div v-else class="no-bg">
      <i class="icon-image" aria-hidden="true" />
    </div>
    <figcaption class="name">{{ shader.name }}</figcaption>
  </figure>
</template>
