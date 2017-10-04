<script>
import { mapActions } from 'vuex';
import mutationTypes from '../../common/constants/mutation-types';
import actionTypes from '../../common/constants/action-types';
import apiConstants from '../../common/constants/api-constants';

export default {
  name: 'Users',
  data() {
    return {
      title: 'Users',
    };
  },
  beforeMount() {
    this.getUsersList();
  },
  mounted() {
    console.log('mounted Users');
  },
  updated() {
    console.log('updated Users');
  },
  methods: {
    getUsersList() {
      this.$http({
        url: apiConstants.GET_USERS_LIST,
        method: 'GET',
        // credentials: true,
        before: () => {
          console.log('start to run spinner');
        },
      }).then(res => {
        this.$store.commit(mutationTypes.LOAD_USERS_LIST_SUCCESS, { list: res.body });
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
      // this.onRemoveUserById({ id: userId });
    },
    ...mapActions({
      onRemoveUserById: actionTypes.ON_REMOVE_USER_BY_ID,
    }),
  },
}
</script>

<template>
  <div>
    <h1>{{title}}</h1>
    <ul class="users-list">
      <li v-for="user in $store.state.users.list" :key="`${user.id}`">
        {{user.name}} {{user.surname}}
        <custom-button title="Remove" v-on:onClick="onRemoveUserById({ id: user.id })" />
      </li>
    </ul>
  </div>
</template>
