<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('meshesList');
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import * as api from '../../common/constants/api';
import './styles/meshes-list.scss';

export default {
  name: 'MeshesList',
  components: {
    CustomBtn
  },
  data() {
    return {
      isVisibleCtrls: false
    };
  },
  computed: mapState([
    'list'
  ]),
  methods: {
    ...mapActions(['onRemoveMeshById']),
    onSetVisibleMeshById(meshId) {
      console.log(meshId);
    },
    onSelectObjById(meshId) {
      console.log(meshId);
    },
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
      <custom-btn iconClass="icon-eye" class="show-hide" :data="mesh.id" :onClick="onSetVisibleMeshById" />
      <custom-btn :title="mesh.title" class="name" :data="mesh.id" :onClick="onSelectObjById" />
      <custom-btn v-if="!isVisibleCtrls" iconClass="icon-trash-bin" :onClick="onRemoveMesh" class="danger xs" />
      <custom-btn v-if="isVisibleCtrls" iconClass="icon-close" :onClick="onCancelRemoveMesh" class="danger xs" />
      <custom-btn v-if="isVisibleCtrls" iconClass="icon-checkmark" :data="mesh.id" :onClick="onRemoveMeshById" class="success xs" />
    </li>
  </transition-group>
</template>
