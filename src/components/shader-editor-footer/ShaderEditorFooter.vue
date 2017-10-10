<script>
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'ShaderEditorFooter',
  components: {
    CustomBtn,
  },
}
</script>

<template>
  <footer class="controls-footer shader-editor-footer">
    <div class="controls-row">
      <custom-btn title="Attributes" disabled />
      <custom-btn title="Uniforms" iconClass="icon-plus" customClass="ctrl-btn-default active" />
      <custom-btn title="Textures" />
      <custom-btn iconClass="icon-expand-vertical" customClass="ctrl-btn-default xs" />
    </div>
  </footer>
</template>
