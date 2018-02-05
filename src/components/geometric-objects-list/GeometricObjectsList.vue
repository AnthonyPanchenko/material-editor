<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('geometricObjectsList');
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';

import mutationTypes from '../../common/constants/mutation-types';
import * as api from '../../common/constants/api';

export default {
  name: 'GeometricObjectsList',
  components: {
    CustomBtn,
  },
  data() {
    return {
      title: 'ItemObjList',
    };
  },
  beforeMount() {
    this.get3dModelsList();
  },
  methods: {
    ...mapActions(['onRemoveItemObjById', 'onSuccessLoadObjectsList']),
    onSetVisibleObjById(objId) {
      console.log(objId);
    },
    onSelectObjById(objId) {
      console.log(objId);
    },
    get3dModelsList() {
      this.$http({
        url: api.MATERIAL_EDITOR_MESHES,
        method: 'GET',
        // credentials: true,
        before: () => {
          console.log('start to run spinner');
        },
      }).then(res => {
        this.onSuccessLoadObjectsList(res.body);
      }, res => {
        console.log('error', res);
      });
    }
  }
}
</script>

<template>
  <transition-group tag="aside" class="sidebar scroll-box" name="obj-list">
    <div class="item-obj" v-for="obj in $store.state.geometricObjectsList.list" :key="obj.id">
      <custom-btn iconClass="icon-eye" class="show-hide-obj" :data="obj.id" :onClick="onSetVisibleObjById" />
      <custom-btn :title="obj.title" class="obj-name" :data="obj.id" :onClick="onSelectObjById" />
      <custom-btn iconClass="icon-trash-bin" class="trash-bin danger" :data="obj.id" :onClick="onRemoveItemObjById" />
    </div>
  </transition-group>
</template>
