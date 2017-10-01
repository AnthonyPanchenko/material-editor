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
      <div class="controls-row">
        <button type="button" class="ctrl-btn-default">
          <i class="icon-settings" />
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-fragment" /> Fragment
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-vertex" /> Vertex
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-new-file" />
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-save" />
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-folder" />
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-gallery" />
        </button>
        <router-link :to="`/${urls.MATERIAL_EDITOR}`" class="ctrl-btn-default">
          <i class="icon-material-editor" />
        </router-link>
      </div>
    </header>

    <section slot="controls-content" class="controls-content">
      controls-content
    </section>

    <footer slot="controls-footer" class="controls-footer">
      <div class="controls-row"> controls box </div>
    </footer>

    <header slot="presentation-header" class="presentation-header">
      <div class="controls-row"> presentation-header </div>
    </header>

    <section slot="presentation-content" class="presentation-content">
      <aside class="sidebar"> sidebar </aside>
      <div class="canvas-box"> canvas </div>
    </section>

    <footer slot="presentation-footer" class="presentation-footer">
      <div class="controls-row">
        <span class="label">FPS 60</span>
      </div>
    </footer>
  </main-layout>
</template>
