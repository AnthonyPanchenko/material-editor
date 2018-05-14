<template>
  <transition-group tag="ul" class="notifications-list scroll-box" name="notification">
    <li :class="['notification', item.status]" v-for="item in list" :key="item.id" @click="() => onClose(item.id)">
      <div class="icon-box">
        <i :class="`icon-${item.status}`" />
      </div>
      <div class="notification-content">
        <span class="icon">&#10006;</span>
        <div class="header">{{item.title}}</div>
        <div class="body">{{item.text}}</div>
      </div>
    </li>
  </transition-group>
</template>

<script>
import { noop, emptyArray } from '../../utils/base-helper';
import './notifications.scss';

export default {
  name: 'Notifications',
  props: {
    list: { type: Array, default: emptyArray },
    onClose: { type: Function, default: noop }
  }
};
</script>
