<script setup>
  import TabBar from '@/components/tab-bar/tab-bar.vue';
  import Loading from '@/components/loading/loading.vue'
  import { useRoute } from 'vue-router'

</script>

<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive include="home">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <tab-bar />
    <loading />
  </div>
</template>

<style lang="less" scoped>

</style>