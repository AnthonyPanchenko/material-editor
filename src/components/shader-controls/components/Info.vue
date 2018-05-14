<template>
  <div class="info">
    <span class="name">{{ name }}</span>
    <span class="type">{{ type }}</span>
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: {
    name: { type: String, default: '' },
    type: { type: String, default: '' }
  }
};
</script>
