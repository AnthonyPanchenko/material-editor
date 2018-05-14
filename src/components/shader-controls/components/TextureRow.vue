<template>
  <div class="row">
    <info :name="name" :type="type" v-if="!isEditable" />

    <input-file v-if="isEditable" :onChange="onChangeFileInput" />
    <img-box :background="value" />

    <custom-btn iconClass="icon-pencil" class="primary xs" :data="id" :onClick="onEdit" v-if="!isEditable && !isVisibleRemoveControl" />
    <custom-btn iconClass="icon-trash-bin" class="danger xs" :onClick="onTogleRemoveMode" v-if="!isEditable && !isVisibleRemoveControl" />
    <custom-btn iconClass="icon-checkmark" class="success xs" :data="id" :onClick="onRemove" v-if="!isEditable && isVisibleRemoveControl" />
    <custom-btn iconClass="icon-close" class="danger xs" :onClick="onTogleRemoveMode" v-if="!isEditable && isVisibleRemoveControl" />
  </div>
</template>

<script>
import Info from './Info.vue';
import { noop } from '../../../common/utils/base-helper';
import ImgBox from '../../../common/components/img-box/ImgBox.vue';
import InputFile from '../../../common/components/input-file/InputFile.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'TextureRow',
  props: {
    isEditable: { type: Boolean, default: false },
    onChange: { type: Function, default: noop },
    onRemove: { type: Function, default: noop },
    onEdit: { type: Function, default: noop },

    id: { type: String, default: '' },
    name: { type: String, default: '' },
    type: { type: String, default: 'sampler2D' },
    value: { type: String, default: '' }
  },
  components: {
    Info,
    ImgBox,
    InputFile,
    CustomBtn
  },
  data() {
    return {
      isVisibleRemoveControl: false
    };
  },
  methods: {
    onTogleRemoveMode() {
      this.isVisibleRemoveControl = !this.isVisibleRemoveControl;
    },
    onChangeFileInput(file) {
      console.log(file);
    }
  }
};
</script>
