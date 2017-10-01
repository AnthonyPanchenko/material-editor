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
      <div class="controls-row">
        <button type="button" class="ctrl-btn-default">
          Attributes
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-plus" /> Uniforms
        </button>
        <button type="button" class="ctrl-btn-default">
          Textures
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-expand-vertical" />
        </button>
      </div>
    </footer>

    <header slot="presentation-header" class="presentation-header">
      <div class="controls-row">
        <button type="button" class="ctrl-btn-default">
          <i class="icon-list" />
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-sphere" />
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-cube" />
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-cylinder" />
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-torus" />
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-plane" />
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-upload" />
        </button>
      </div>
    </header>

    <section slot="presentation-content" class="presentation-content">
      <aside class="sidebar"> sidebar </aside>
      <div class="canvas-box"> canvas </div>
    </section>

    <footer slot="presentation-footer" class="presentation-footer">
      <div class="controls-row">
        <span class="label fps">FPS 60</span>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-maximize" />
        </button>
      </div>
    </footer>
  </main-layout>
</template>
