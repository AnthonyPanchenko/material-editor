<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('itemObjects');
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';

import mutationTypes from '../../common/constants/mutation-types';
import * as apiConstants from '../../common/constants/api-constants';

export default {
  name: 'ItemObjList',
  components: {
    CustomBtn,
  },
  data() {
    return {
      title: 'ItemObjList',
    };
  },
  beforeMount() {
    this.getItemObjList();
  },
  methods: {
    ...mapActions(['onRemoveItemObjById', 'onSuccessLoadObjectsList']),
    onSetVisibleObjById(event) {
      console.log(event.target.dataset);
    },
    onSelectObjById(event) {
      console.log(event.target.dataset);
    },
    getItemObjList() {
      this.$http({
        url: apiConstants.GET_MATERIAL_EDITOR_ITEM_OBJ_LIST,
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
    },
  },
}
</script>

<template>
  <transition-group tag="aside" class="sidebar scroll-box" name="obj-list">
    <div class="item-obj" v-for="obj in $store.state.itemObjects.list" :key="obj.id">
      <custom-btn iconClass="icon-eye" customClass="show-hide-obj" :data-id="obj.id" :onClick="onSetVisibleObjById" />
      <custom-btn :title="obj.title" customClass="obj-name" :data-id="obj.id" :onClick="onSelectObjById" />
      <custom-btn iconClass="icon-trash-bin" customClass="trash-bin" type="danger" :data-id="obj.id" :onClick="onRemoveItemObjById" />
    </div>
  </transition-group>
</template>
