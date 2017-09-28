<script>
import MainLayout from './MainLayout.vue';
import Users from '../modules/users/Users.vue';
import CanvasBoard from '../modules/canvas-board/CanvasBoard.vue';
import internalUrls from '../common/constants/internal-urls';

export default {
  name: 'MaterialEditor',
  components: {
    Users,
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
    <header slot="controls-header" class="controls-header">
      <div class="controls-box">
        <custom-button :link="`/${urls.SHADER_EDITOR}`" iconClass="icon-material-editor" />
      </div>
    </header>

    <section slot="controls-content" class="controls-content">
      controls-content
      <users></users>
    </section>

    <footer slot="controls-footer" class="controls-footer">
      <div class="controls-box"> controls box </div>
    </footer>

    <header slot="presentation-header" class="presentation-header">
      <div class="controls-box"> presentation-header </div>
    </header>

    <section slot="presentation-content" class="presentation-content">
      <aside class="sidebar">
         <div class="item-obj controls-row">
           <button type="button" class="show-hide-obj ctrl-btn"><i class="icon-eye" /></button>
           <button type="button" class="obj-name ctrl-btn">Plane</button>
           <button type="button" class="trash-bin ctrl-btn"><i class="icon-trash-bin" /></button>
         </div>
         <div class="item-obj controls-row">
           <button type="button" class="show-hide-obj ctrl-btn"><i class="icon-eye-blocked" /></button>
           <button type="button" class="obj-name ctrl-btn">Sphere</button>
           <button type="button" class="trash-bin ctrl-btn"><i class="icon-trash-bin" /></button>
         </div>
      </aside>
      <div class="canvas-box"> canvas </div>
    </section>

    <footer slot="presentation-footer" class="presentation-footer">
      <div class="controls-box"> controls box </div>
    </footer>
  </main-layout>
</template>
