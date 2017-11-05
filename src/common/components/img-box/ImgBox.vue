<script>
import noop from "../../utils/noop";

export default {
  name: "ImgBox",
  props: {
    url: {
      type: String,
      default: ""
    },
  },
};
</script>

<template>
  <div :class="['img-box', { 'bg-img': url }]" :style="{ backgroundImage: `url(${url})` }" />
</template>
