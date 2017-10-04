<script>
import MainLayout from './MainLayout.vue';
import ItemObjList from '../modules/item-obj-list/ItemObjList.vue';
import CanvasBoard from '../modules/canvas-board/CanvasBoard.vue';
import internalUrls from '../common/constants/internal-urls';

export default {
  name: 'ShaderEditor',
  components: {
    ItemObjList,
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
        <button type="button" class="ctrl-btn-default xs">
          <i class="icon-settings" aria-hidden="true" />
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-fragment" aria-hidden="true" /> Fragment
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-vertex" aria-hidden="true" /> Vertex
        </button>
        <button type="button" class="ctrl-btn-default xs">
          <i class="icon-new-file" aria-hidden="true" />
        </button>
        <button type="button" class="ctrl-btn-default xs">
          <i class="icon-save" aria-hidden="true" />
        </button>
        <button type="button" class="ctrl-btn-default xs">
          <i class="icon-folder" aria-hidden="true" />
        </button>
        <button type="button" class="ctrl-btn-default xs">
          <i class="icon-gallery" aria-hidden="true" />
        </button>
        <router-link :to="`/${urls.MATERIAL_EDITOR}`" class="ctrl-btn-default xs">
          <i class="icon-material-editor" aria-hidden="true" />
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
          <i class="icon-plus" aria-hidden="true" /> Uniforms
        </button>
        <button type="button" class="ctrl-btn-default">
          Textures
        </button>
        <button type="button" class="ctrl-btn-default xs">
          <i class="icon-expand-vertical" aria-hidden="true" />
        </button>
      </div>
    </footer>

    <header slot="presentation-header" class="presentation-header">
      <div class="controls-row">
        <button type="button" class="ctrl-btn-default xs">
          <i class="icon-list" aria-hidden="true" />
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-sphere" aria-hidden="true" />
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-cube" aria-hidden="true" />
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-cylinder" aria-hidden="true" />
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-torus" aria-hidden="true" />
        </button>
        <button type="button" class="ctrl-btn-default">
          <i class="icon-plane" aria-hidden="true" />
        </button>
        <button type="button" class="ctrl-btn-default xs">
          <i class="icon-upload" aria-hidden="true" />
        </button>
      </div>
    </header>

    <section slot="presentation-content" class="presentation-content">
      <item-obj-list></item-obj-list>
      <div class="canvas-box"> canvas </div>
    </section>

    <footer slot="presentation-footer" class="presentation-footer">
      <div class="controls-row">
        <span class="label fps">FPS 60</span>
        <button type="button" class="ctrl-btn-default xs">
          <i class="icon-maximize" aria-hidden="true" />
        </button>
      </div>
    </footer>
  </main-layout>
</template>
