<script>
import MainLayout from './MainLayout.vue';
import CanvasBoard from '../modules/canvas-board/CanvasBoard.vue';
import internalUrls from '../common/constants/internal-urls';

export default {
  name: 'MaterialEditor',
  components: {
    CanvasBoard,
    MainLayout,
  },
  data() {
    return {
      pageName: 'MaterialEditor',
      urls: internalUrls,
    }
  },
}
</script>

<template>
  <main-layout>
    <header slot="controls-header" class="header">
      <custom-button :link="`/${urls.SHADER_EDITOR}`" iconClass="icon-material-editor" />
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
      <canvas-board />
    </div>
    <footer slot="presentation-footer" class="footer">
      presentation-footer
    </footer>
  </main-layout>
</template>
