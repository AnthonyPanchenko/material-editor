<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shadersGallery');
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import InputText from '../../common/components/input-text/InputText.vue';
import CanvasSection from '../canvas-section/CanvasSection.vue';
import ShaderItem from './components/ShaderItem.vue';

import ModalWindow from '../../common/components/modal-window/ModalWindow.vue';
import CreateNewShaderForm from '../create-new-shader-form/CreateNewShaderForm.vue';

import * as api from '../../common/constants/api';
import * as internalUrls from '../../common/constants/internal-urls';
import './styles/shaders-gallery.scss';

export default {
  name: 'ShadersGallery',
  components: {
    InputText,
    ShaderItem,
    CanvasSection,
    CustomBtn,
    ModalWindow,
    CreateNewShaderForm
  },
  data() {
    return {
      isEditable: false,
      newShaderName: '',
      isVisibleShadersList: true,
      isOpenCreateNewShaderForm: false,
      isVisibleRemoveShaderCtrls: false
    };
  },
  computed: mapState([
    'list',
    'activeShader'
  ]),
  methods: {
    ...mapActions(['onSuccessLoadGlslPrograms', 'onSetActiveShader']),
    browserHistoryGoBack() {
      if (window.history.length > 2) {
        this.$router.go(-1);
      } else {
        this.$router.push(internalUrls.MATERIAL_EDITOR);
      }
    },
    isDifferenceNames() {
      return (this.newShaderName && (this.activeShader && this.activeShader.name)) !== this.newShaderName.trim();
    },
    onOpenCreateNewShaderForm() {
      this.isOpenCreateNewShaderForm = !this.isOpenCreateNewShaderForm;
    },
    onCloseCreateNewShaderForm() {
      if (this.isOpenCreateNewShaderForm) {
        this.isOpenCreateNewShaderForm = false;
      }
    },
    onShaderClick(shader) {
      this.onSetActiveShader(shader);
      this.newShaderName = shader.name;
      this.isVisibleRemoveShaderCtrls = false;
    },
    onRenameShader() {
      if (this.isDifferenceNames()) {
        console.log(this.newShaderName.trim());
      }
    },
    onChangeShaderName(str) {
      this.newShaderName = str;
    },
    onRemoveShader() {
      this.newShaderName = this.activeShader.name;
      this.isVisibleRemoveShaderCtrls = true;
    },
    onToggleFullScreenMode() {
      this.isVisibleShadersList = !this.isVisibleShadersList;
    },
    onCancelRemoveShader() {
      this.isVisibleRemoveShaderCtrls = false;
    },
    onAgreeRemoveShader() {
      this.$http({
        url: `${api.GLSL_PROGRAMS}/${this.activeShader.uuid}`,
        method: 'DELETE',
        // credentials: true,
        before: () => {
          this.isVisibleRemoveShaderCtrls = false;
        }
      }).then(res => {
        console.log('success', res);
      }, res => {
        console.log('error', res);
      });
    },
    loadGlslProgramsList() {
      this.$http({
        url: api.GLSL_PROGRAMS,
        method: 'GET',
        // credentials: true,
        before: () => {
          console.log('start to run spinner');
        }
      }).then(res => {
        this.onSuccessLoadGlslPrograms(res.body);
      }, res => {
        console.log('error', res);
      });
    }
  },
  beforeMount() {
    if (this.activeShader) {
      this.newShaderName = this.activeShader.name;
    }
    this.loadGlslProgramsList();
  }
}
</script>

<template>
  <div class="base-layout shaders-gallery">
    <modal-window :isOpen="isOpenCreateNewShaderForm">
      <create-new-shader-form :onClose="onCloseCreateNewShaderForm" />
    </modal-window>

    <section v-show="isVisibleShadersList" class="container controls-section">
      <div class="header controls-row">
        <custom-btn iconClass="icon-arrow-left" :onClick="browserHistoryGoBack" class="xs back-btn" />
        <h5 class="title">Shaders gallery</h5>
        <custom-btn iconClass="icon-new-file" :onClick="onOpenCreateNewShaderForm" class="xs" />
      </div>

      <div class="body">
        <ul class="shaders-list scroll-box">
          <li v-for="shader in list" :key="shader.uuid">
            <shader-item :shader="shader" :isActive="activeShader && (activeShader.uuid === shader.uuid)" :onClick="onShaderClick" />
          </li>
        </ul>
      </div>

      <div v-if="activeShader" class="footer controls-row">
        <custom-btn v-if="!isVisibleRemoveShaderCtrls" iconClass="icon-trash-bin" :onClick="onRemoveShader" class="danger xs" />
        <custom-btn v-if="isVisibleRemoveShaderCtrls" iconClass="icon-checkmark" :onClick="onAgreeRemoveShader" class="success xs" />
        <custom-btn v-if="isVisibleRemoveShaderCtrls" iconClass="icon-close" :onClick="onCancelRemoveShader" class="danger xs" />
        <input-text :value="newShaderName" :onInput="onChangeShaderName" />
        <custom-btn :disabled="!isDifferenceNames()" title="Rename" :onClick="onRenameShader" class="success sm" />
        <custom-btn v-if="isEditable" title="Edit" :onClick="onEdit" class="primary sm" />
        <custom-btn v-else title="Apply" :onClick="onApply" class="primary sm" />
      </div>

      <div v-else class="footer controls-row" />
    </section>

    <canvas-section :isFullScreenMode="!isVisibleShadersList" :onToggleFullScreenMode="onToggleFullScreenMode">
      <div slot="header" class="header controls-row">
        <custom-btn iconClass="icon-sphere" />
        <custom-btn iconClass="icon-cube" />
        <custom-btn iconClass="icon-cylinder" />
        <custom-btn iconClass="icon-torus" />
        <custom-btn iconClass="icon-plane" />
      </div>
    </canvas-section>
  </div>
</template>
