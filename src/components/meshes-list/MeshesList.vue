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
    return {};
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
    }
  }
}
</script>

<template>
  <transition-group tag="ul" class="meshes scroll-box" name="mesh-item">
    <li class="mesh" v-for="mesh in list" :key="mesh.id">
      <custom-btn iconClass="icon-eye" class="show-hide" :data="mesh.id" :onClick="onSetVisibleMeshById" />
      <custom-btn :title="mesh.title" class="name" :data="mesh.id" :onClick="onSelectObjById" />
      <custom-btn iconClass="icon-trash-bin" class="trash-bin danger" :data="mesh.id" :onClick="onRemoveMeshById" />
    </li>
  </transition-group>
</template>
