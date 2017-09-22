<script>
import MainLayout from './MainLayout.vue';
import CanvasBoard from '../modules/canvas-board/CanvasBoard.vue';
import internalUrls from '../common/constants/internal-urls';

export default {
  name: 'ShaderEditor',
  components: {
    CanvasBoard,
    MainLayout,
  },
  data() {
    return {
      pageName: 'ShaderEditor',
      urls: internalUrls,
    }
  },
}
</script>

<template>
  <main-layout>
    <header slot="controls-header" class="header">
      <custom-button :link="`/${urls.MATERIAL_EDITOR}`" iconClass="icon-shader-editor" />
    </header>
    <div slot="controls-content" class="content">
      controls-content
    </div>
    <footer slot="controls-footer" class="footer">
      controls-footer
    </footer>

    <header slot="presentation-header" class="header">
      presentation-header
    </header>
    <div slot="presentation-content" class="content">
      <aside>aside</aside>
      <canvas-board />
    </div>
    <footer slot="presentation-footer" class="footer">
      presentation-footer
    </footer>
  </main-layout>
</template>
