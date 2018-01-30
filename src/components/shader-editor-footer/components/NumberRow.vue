<script>
import Info from './Info.vue';

export default {
  name: 'NumberRow',
  props: {
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  components: {
    Info,
  }
};
</script>

<template>
  <div class="row">
    <info :name="name" :type="type" />
  </div>
</template>
