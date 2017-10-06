<script>
import ItemObjList from '../item-obj-list/ItemObjList.vue';
import CanvasBoard from '../canvas-board/CanvasBoard.vue';
import ResizeBox from '../resize-box/ResizeBox.vue';
import internalUrls from '../../common/constants/internal-urls';

export default {
  name: 'ShaderEditor',
  components: {
    ItemObjList,
    CanvasBoard,
    ResizeBox,
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
  <div class="editor-container">

    <resize-box tag="section" resize="column" :size="$store.state.shaderEditor.widthCtrlBox" className="controls-section">
      <header class="controls-header">
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

      <section class="controls-content">
        controls-content
      </section>

      <footer class="controls-footer">
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
    </resize-box>

    <section class="presentation-section">
      <header class="presentation-header">
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

      <section class="presentation-content">
        <item-obj-list></item-obj-list>
        <div class="canvas-box"> canvas </div>
      </section>

      <footer class="presentation-footer">
        <div class="controls-row">
          <span class="label fps">FPS 60</span>
          <button type="button" class="ctrl-btn-default xs">
            <i class="icon-maximize" aria-hidden="true" />
          </button>
        </div>
      </footer>
    </section>

  </div>
</template>
