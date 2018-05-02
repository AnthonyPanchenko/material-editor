<script>
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import noop from '../../common/utils/noop';
import emptyObject from '../../common/utils/emptyObject';
import * as api from '../../common/constants/api';
import './styles/meshes-list.scss';

export default {
  name: 'MeshesList',
  props: {
    objects: { type: Object, default: emptyObject },
    onSelect: { type: Function, default: noop },
    onRemove: { type: Function, default: noop },
    onChangeObjVisibility: { type: Function, default: noop }
  },
  components: {
    CustomBtn
  },
  data() {
    return {
      isVisibleCtrls: false
    };
  },
  methods: {
    onRemoveMesh() {
      this.isVisibleCtrls = true;
    },
    onCancelRemoveMesh() {
      this.isVisibleCtrls = false;
    }
  }
}
</script>

<template>
  <transition-group tag="ul" class="meshes scroll-box" name="mesh-item">
    <li class="mesh" v-for="mesh in list" :key="mesh.id">
      <custom-btn iconClass="icon-eye" class="show-hide" :data="mesh.id" :onClick="onChangeObjVisibility" />
      <custom-btn :title="mesh.title" class="name" :data="mesh.id" :onClick="onSelect" />
      <custom-btn v-if="!isVisibleCtrls" iconClass="icon-trash-bin" :onClick="onRemoveMesh" class="danger xs" />
      <custom-btn v-if="isVisibleCtrls" iconClass="icon-close" :onClick="onCancelRemoveMesh" class="danger xs" />
      <custom-btn v-if="isVisibleCtrls" iconClass="icon-checkmark" :data="mesh.id" :onClick="onRemove" class="success xs" />
    </li>
  </transition-group>
</template>
