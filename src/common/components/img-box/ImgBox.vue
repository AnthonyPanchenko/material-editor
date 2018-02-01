<script>
export default {
  name: 'ImgBox',
  props: {
    background: { type: String, default: '' },
    isUploading: { type: Boolean, default: false }
  },
};
</script>

<template>
  <div :class="['img-box', { 'bg-img': background, 'is-uploading': isUploading }]" :style="background ? { backgroundImage: `url(${background})` } : {}">
    <i v-if="isUploading" class="icon-spinner spin" />
  </div>
</template>
