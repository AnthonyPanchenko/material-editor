<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('geometricObjects');
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';

import mutationTypes from '../../common/constants/mutation-types';
import * as api from '../../common/constants/api';

export default {
  name: 'GeometricObjects',
  components: {
    CustomBtn,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(['onRemoveItemObjById', 'onSuccessLoadObjects']),
    onSetVisibleObjById(objId) {
      console.log(objId);
    },
    onSelectObjById(objId) {
      console.log(objId);
    },
    getObjectsList() {
      this.$http({
        url: api.MATERIAL_EDITOR_GEOMETRIC_OBJECTS,
        method: 'GET',
        // credentials: true,
        before: () => {
          console.log('start to run spinner');
        },
      }).then(res => {
        this.onSuccessLoadObjects(res.body);
      }, res => {
        console.log('error', res);
      });
    }
  },
  beforeMount() {
    this.getObjectsList();
  }
}
</script>

<template>
  <transition-group tag="aside" class="sidebar scroll-box" name="obj-list">
    <div class="item-obj" v-for="obj in $store.state.geometricObjects.list" :key="obj.id">
      <custom-btn iconClass="icon-eye" class="show-hide-obj" :data="obj.id" :onClick="onSetVisibleObjById" />
      <custom-btn :title="obj.title" class="obj-name" :data="obj.id" :onClick="onSelectObjById" />
      <custom-btn iconClass="icon-trash-bin" class="trash-bin danger" :data="obj.id" :onClick="onRemoveItemObjById" />
    </div>
  </transition-group>
</template>
