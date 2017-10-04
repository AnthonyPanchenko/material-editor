<script>
import ItemObjList from '../item-obj-list/ItemObjList.vue';
import CanvasBoard from '../canvas-board/CanvasBoard.vue';
import internalUrls from '../../common/constants/internal-urls';
import Resizer from '../../directives/Resizer';

export default {
  name: 'MaterialEditor',
  components: {
    ItemObjList,
    CanvasBoard,
  },
  directives: {
    Resizer,
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

    <section class="controls-layout">

      <header slot="controls-header" class="controls-header">
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

      <section slot="controls-content" class="controls-content">
        controls-content
      </section>

      <footer slot="controls-footer" class="controls-footer">
        <div class="controls-row"> controls box </div>
      </footer>

      <div class="grab" v-resizer="'column'" />
    </section>

    <section class="presentation-layout">

      <header slot="presentation-header" class="presentation-header">
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

    </section>

  </div>
</template>
