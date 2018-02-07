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
    onSetVisibleObjById(objId) {
      console.log(objId);
    },
    onSelectObjById(objId) {
      console.log(objId);
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
  <transition-group tag="aside" class="sidebar scroll-box" name="obj-list">
    <div class="item-obj" v-for="obj in list" :key="obj.id">
      <custom-btn iconClass="icon-eye" class="show-hide-obj" :data="obj.id" :onClick="onSetVisibleObjById" />
      <custom-btn :title="obj.title" class="obj-name" :data="obj.id" :onClick="onSelectObjById" />
      <custom-btn iconClass="icon-trash-bin" class="trash-bin danger" :data="obj.id" :onClick="onRemoveGeometricObjectById" />
    </div>
  </transition-group>
</template>
