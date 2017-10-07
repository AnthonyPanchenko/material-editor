<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('itemObjects');

import mutationTypes from '../../common/constants/mutation-types';
import * as apiConstants from '../../common/constants/api-constants';

export default {
  name: 'ItemObjList',
  data() {
    return {
      title: 'ItemObjList',
    };
  },
  beforeMount() {
    this.getItemObjList();
  },
  methods: {
    getItemObjList() {
      this.$http({
        url: apiConstants.GET_MATERIAL_EDITOR_ITEM_OBJ_LIST,
        method: 'GET',
        // credentials: true,
        before: () => {
          console.log('start to run spinner');
        },
      }).then(res => {
        this.$store.commit(mutationTypes.LOAD_ITEM_OBJ_LIST_SUCCESS, res.body);
      }, res => {
        console.log('error', res);
      });
    },
    onRemoveUser(/* userId */) {
      // this.$store.dispatch(actionTypes.ON_REMOVE_USER_BY_ID, {
      //   id: userId,
      // });
      // this.$store.commit(mutationTypes.REMOVE_USER_BY_ID, {
      //   id: userId,
      // });
    },
    ...mapActions(['onRemoveItemObjById']),
  },
}
</script>

<template>
  <transition-group tag="aside" class="sidebar" name="obj-list">
    <div class="item-obj" v-for="obj in $store.state.itemObjects.list" :key="obj.id">
      <button type="button" class="show-hide-obj ctrl-btn-default">
        <i class="icon-eye" />
      </button>
      <button type="button" class="obj-name ctrl-btn-default">{{obj.title}}</button>
      <button type="button" class="trash-bin ctrl-btn-danger" v-on:click="onRemoveItemObjById(obj.id)">
        <i class="icon-trash-bin" />
      </button>
    </div>
  </transition-group>
</template>
