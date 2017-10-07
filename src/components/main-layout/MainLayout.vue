<script>
export default {
  name: 'MainLayout',
}
</script>

<template>
  <transition name="slide">
    <router-view></router-view>
  </transition>
</template>
