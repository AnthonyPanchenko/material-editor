<script>
import Info from './Info.vue';
import noop from '../../../common/utils/noop';

import ImgBox from '../../../common/components/img-box/ImgBox.vue';
import InputFile from '../../../common/components/input-file/InputFile.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'MatrixRow',
  props: {
    uuid: { type: String, required: true },
    isEditable: { type: Boolean, default: false },
    onChange: { type: Function, default: noop },
    onRemove: { type: Function, default: noop },
    onEdit: { type: Function, default: noop },
    name: { type: String, default: '_texture' },
    type: { type: String, default: 'sampler2D' },
    background: { type: String, default: '' }
  },
  components: {
    Info,
    ImgBox,
    InputFile,
    CustomBtn
  },
  methods: {
    onChangeFileInput(filses) {
      console.log(filses);
    }
  },
};
</script>

<template>
  <div class="row">
    <img-box :background="background" :isUploading="" />
    <info :name="name" :type="type" v-if="!isEditable" />

    <input-file v-if="isEditable" :onChange="onChangeFileInput" />

    <custom-btn iconClass="icon-pencil" class="primary xs" :data="uuid" :onClick="onEdit" v-if="!isEditable" />
    <custom-btn iconClass="icon-trash-bin" class="danger xs" :data="uuid" :onClick="onRemove" v-if="!isEditable" />
  </div>
</template>
