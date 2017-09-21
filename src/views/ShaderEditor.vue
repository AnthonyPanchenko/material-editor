<script>
import internalUrls from '../common/constants/internal-urls';

export default {
  name: 'ShaderEditor',
  data() {
    return {
      pageName: 'ShaderEditor',
      urls: internalUrls,
    }
  },
}
</script>

<template>
  <div class="shader-editor">
    <section class="control-section">
      <header class="header">
        <custom-button :link="`/${urls.MATERIAL_EDITOR}`" iconClass="icon-shader-editor" />
      </header>
      <footer class="footer">
      </footer>
    </section>
    <section class="presentation-section">
      <header class="header">
      </header>
      <footer class="footer">
      </footer>
    </section>
  </div>
</template>
