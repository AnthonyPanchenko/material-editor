<script>
export default {
  name: 'MainLayout',
}
</script>

<template>
  <transition name="page-fade">
    <router-view></router-view>
  </transition>
</template>
