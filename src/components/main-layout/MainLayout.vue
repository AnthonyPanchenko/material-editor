<script>
import Notifications from '../../common/components/notifications/Notifications.vue';

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

const getNotifications = () => ([
  {
    id: guid(),
    status: 'success',
    title: 'This is SUCCESS',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
  },
  {
    id: guid(),
    status: 'warning',
    title: 'This is WARNING',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
  },
  {
    id: guid(),
    status: 'info',
    title: 'This is INFO',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
  },
  {
    id: guid(),
    status: 'danger',
    title: 'This is DANGER',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
  }
]);

export default {
  name: 'MainLayout',
  components: {
    Notifications,
  },
  data() {
    return {
      notifications: getNotifications(),
    };
  },
  methods: {
    increase() {
      setInterval(() => {
        this.notifications = [getNotifications()[Math.floor(Math.random() * 4)], ...this.notifications];
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
