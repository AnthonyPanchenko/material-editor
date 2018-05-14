<template>
  <transition-group tag="ul" class="objects scroll-box" name="obj-item">
    <li class="obj" v-for="obj in list" :key="obj.id">
      <custom-btn iconClass="icon-eye" class="show-hide" :data="obj.id" :onClick="onChangeObjVisibility" />
      <custom-btn :title="obj.name" class="name" :data="obj.id" :onClick="onSelect" />
      <custom-btn v-if="!isVisibleCtrls" iconClass="icon-trash-bin" :onClick="onRemoveMesh" class="danger xs" />
      <custom-btn v-if="isVisibleCtrls" iconClass="icon-close" :onClick="onCancelRemoveMesh" class="danger xs" />
      <custom-btn v-if="isVisibleCtrls" iconClass="icon-checkmark" :data="obj.id" :onClick="onRemove" class="success xs" />
    </li>
  </transition-group>
</template>

<script>
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import { noop, emptyArray } from '../../common/utils/base-helper';
import './styles/objects-list.scss';

export default {
  name: 'ObjectsList',
  props: {
    list: { type: Array, default: emptyArray },
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
