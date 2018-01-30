<script>
import noop from '../../utils/noop';

export default {
  name: 'ImgBox',
  props: {
    url: { type: String, default: '' }
  },
  data() {
    return {
      styleBg: this.url ? { backgroundImage: `url(${this.url})` } : {}
    };
  }
};
</script>

<template>
  <div :class="['img-box', { 'bg-img': url }]" :style="styleBg" />
</template>
