<script>
import ItemObjList from '../item-obj-list/ItemObjList.vue';
import CanvasBoard from '../canvas-board/CanvasBoard.vue';
import ResizeBox from '../resize-box/ResizeBox.vue';
import internalUrls from '../../common/constants/internal-urls';

export default {
  name: 'MaterialEditor',
  components: {
    ItemObjList,
    CanvasBoard,
    ResizeBox,
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
  <div class="editor-container">

    <resize-box tag="section" resize="column" :size="30" className="controls-section">
      <header class="controls-header">
        <div class="controls-row">
          <button type="button" class="ctrl-btn-default xs">
            <i class="icon-settings" aria-hidden="true" />
          </button>
          <button type="button" class="ctrl-btn-default">
            Object
          </button>
          <button type="button" class="ctrl-btn-default">
            Geometry
          </button>
          <button type="button" class="ctrl-btn-default">
            Material
          </button>
          <router-link :to="`/${urls.SHADER_EDITOR}`" class="ctrl-btn-default xs">
            <i class="icon-shader-editor" aria-hidden="true" />
          </router-link>
        </div>
      </header>

      <section class="controls-content">
        controls-content
      </section>

      <footer class="controls-footer">
        <div class="controls-row"> controls box </div>
      </footer>
    </resize-box>

    <section class="presentation-section">
      <header class="presentation-header">
        <div class="controls-row">
          <button type="button" class="ctrl-btn-default xs">
            <i class="icon-list" aria-hidden="true" />
          </button>
          <button type="button" class="ctrl-btn-default md">
            Translate
          </button>
          <button type="button" class="ctrl-btn-default md">
            Rotate
          </button>
          <button type="button" class="ctrl-btn-default md">
            Scale
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
