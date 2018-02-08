<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('geometricObjects');
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import * as api from '../../common/constants/api';

export default {
  name: 'GeometricObjects',
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
    ...mapActions(['onRemoveGeometricObjectById', 'onSuccessLoadGeometricObjects']),
    onSetVisibleObjById(meshId) {
      console.log(meshId);
    },
    onSelectObjById(meshId) {
      console.log(meshId);
    },
    loadGeometricObjectsList() {
      this.$http({
        url: api.MATERIAL_EDITOR_GEOMETRIC_OBJECTS,
        method: 'GET',
        // credentials: true,
        before: () => {
          console.log('start to run spinner');
        },
      }).then(res => {
        this.onSuccessLoadGeometricObjects(res.body);
      }, res => {
        console.log('error', res);
      });
    }
  },
  beforeMount() {
    this.loadGeometricObjectsList();
  }
}
</script>

<template>
  <transition-group tag="ul" class="meshes scroll-box" name="mesh-item">
    <li class="mesh" v-for="mesh in list" :key="mesh.id">
      <custom-btn iconClass="icon-eye" class="show-hide" :data="mesh.id" :onClick="onSetVisibleObjById" />
      <custom-btn :title="mesh.title" class="name" :data="mesh.id" :onClick="onSelectObjById" />
      <custom-btn iconClass="icon-trash-bin" class="trash-bin danger" :data="mesh.id" :onClick="onRemoveGeometricObjectById" />
    </li>
  </transition-group>
</template>
