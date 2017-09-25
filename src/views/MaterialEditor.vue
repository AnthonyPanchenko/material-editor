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
    <header slot="controls-header">
      <div class="controls-box">
        <custom-button :link="`/${urls.SHADER_EDITOR}`" iconClass="icon-material-editor" />
      </div>
    </header>

    <section slot="controls-content">
      controls-content
    </section>

    <footer slot="controls-footer">
      <div class="controls-box"> controls box </div>
    </footer>

    <header slot="presentation-header">
      <div class="controls-box"> presentation-header </div>
    </header>

    <section slot="presentation-content">
      <aside class="sidebar"> aside </aside>
      <div class="canvas-box"> canvas </div>
    </section>

    <footer slot="presentation-footer">
      <div class="controls-box"> controls box </div>
    </footer>
  </main-layout>
</template>
