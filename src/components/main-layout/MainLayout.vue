<script>
import Notifications from '../../common/components/notifications/Notifications.vue';

const notifications = [
  {
    id: 'dsfgoi325',
    status: 'success',
    title: 'This is SUCCESS',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
  },
  {
    id: 'fhhf4225',
    status: 'warning',
    title: 'This is WARNING',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
  },
  {
    id: 'dgdg4565',
    status: 'info',
    title: 'This is INFO',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
  },
  {
    id: 'sfgpogr35',
    status: 'danger',
    title: 'This is DANGER',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
  }
];

export default {
  name: 'MainLayout',
  components: {
    Notifications,
  },
  data() {
    return {
      notifications,
    };
  },
  methods: {
    increase() {
      setInterval(() => {
        this.notifications = [this.notifications[Math.floor(Math.random() * this.notifications.length)], ...this.notifications];
      }, 3000);
    },
    onRemoveNotification(notificationId) {
      this.notifications = this.notifications.filter(item => item.id !== notificationId);
    }
  },
  mounted() {
    this.increase();
  }
}
</script>

<template>
  <div class="main-layout">
    <notifications :list="notifications" :onClose="onRemoveNotification" />
    <transition name="page-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
