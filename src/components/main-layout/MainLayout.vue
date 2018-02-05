<script>
import Notifications from '../../common/components/notifications/Notifications.vue';
import ShadersModal from '../shaders-modal/ShadersModal.vue';

const getNotifications = [
  {
    id: 'wte235tet',
    status: 'success',
    title: 'This is SUCCESS',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
  },
  {
    id: 'sf76567sgtet',
    status: 'warning',
    title: 'This is WARNING',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
  },
  {
    id: 'df34589g66sujrt',
    status: 'info',
    title: 'This is INFO',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
  },
  {
    id: 'qwt67457uirtyi',
    status: 'danger',
    title: 'This is DANGER',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
  }
];

export default {
  name: 'MainLayout',
  components: {
    ShadersModal,
    Notifications,
  },
  data() {
    return {
      notifications: getNotifications,
    };
  },
  methods: {
    onRemoveNotification(notificationId) {
      this.notifications = this.notifications.filter(item => item.id !== notificationId);
    }
  },
  mounted() {
  }
}
</script>

<template>
  <div class="main-layout">
    <notifications :list="notifications" :onClose="onRemoveNotification" />
    <shaders-modal />
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
