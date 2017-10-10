<script>
export default {
  name: 'ShaderEditorFooter',
  // isVisibleFooterContent
}
</script>

<template>
  <footer class="controls-footer shader-editor-footer">
    <div class="controls-row">
      <button type="button" class="ctrl-btn-default" disabled>
        Attributes
      </button>
      <button type="button" class="ctrl-btn-default active">
        <i class="icon-plus" aria-hidden="true" /> Uniforms
      </button>
      <button type="button" class="ctrl-btn-default">
        Textures
      </button>
      <button type="button" class="ctrl-btn-default xs" @dblclick="onToggleFooterContent">
        <i class="icon-expand-vertical" aria-hidden="true" />
      </button>
    </div>

    <div class="shader-settings">

    </div>
  </footer>
</template>
