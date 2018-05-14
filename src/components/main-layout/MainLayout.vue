<template>
  <div class="main-layout">
    <notifications :list="notifications" :onClose="onRemoveNotification" />
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Notifications from '../../common/components/notifications/Notifications.vue';
import './styles/main-layout.scss';

export default {
  name: 'MainLayout',
  components: {
    Notifications
  },
  data() {
    return {
      notifications: []
    };
  },
  methods: {
    onRemoveNotification(notificationId) {
      this.notifications = this.notifications.filter(item => item.id !== notificationId);
    }
  }
}
</script>
