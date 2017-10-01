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
    <header slot="controls-header" class="controls-header">
      <div class="controls-box">
        <custom-button :link="`/${urls.MATERIAL_EDITOR}`" iconClass="icon-material-editor" />
      </div>
    </header>

    <section slot="controls-content" class="controls-content">
      controls-content
    </section>

    <footer slot="controls-footer" class="controls-footer">
      <div class="controls-box"> controls box </div>
    </footer>

    <header slot="presentation-header" class="presentation-header">
      <div class="controls-box"> presentation-header </div>
    </header>

    <section slot="presentation-content" class="presentation-content">
      <aside class="sidebar"> sidebar </aside>
      <div class="canvas-box"> canvas </div>
    </section>

    <footer slot="presentation-footer" class="presentation-footer">
      <div class="controls-box"> controls box </div>
    </footer>
  </main-layout>
</template>
