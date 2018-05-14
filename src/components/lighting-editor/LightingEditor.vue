<template>
  <resize-box
    tag="section"
    resize="column"
    class="container controls-section"
    :onEndOfResize="onSetPanelControlsWidth"
    :size="controlsPanelWidth"
  >
    <header class="header controls-row">
      <custom-btn accesskey="s" iconClass="icon-settings" class="xs" />
      <custom-btn iconClass="icon-undo" class="xs" />
      <custom-btn iconClass="icon-save" class="xs" />
      <custom-btn iconClass="icon-redo" class="xs" />
      <custom-btn iconClass="icon-open-folder" class="xs" />
    </header>

    <section class="body">
      LightingEditor
    </section>
  </resize-box>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('lightingEditor');

import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';

export default {
  name: 'LightingEditor',
  components: {
    ResizeBox,
    CustomBtn
  },
  data() {
    return {};
  },
  computed: mapState([
    'controlsPanelWidth'
  ]),
  methods: {
    ...mapActions([
      'onSetPanelControlsWidth'
    ])
  }
};
</script>
