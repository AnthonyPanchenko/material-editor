<script>
export default {
  name: 'MainLayout',
}
</script>

<template>
  <div class="main-layout">
    <transition name="page-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
