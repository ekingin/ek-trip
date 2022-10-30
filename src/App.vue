<script setup>
  import TabBar from '@/components/tab-bar/tab-bar.vue';
  import Loading from '@/components/loading/loading.vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
</script>

<template>
  <div class="app">
    <router-view/>
    <!-- 隐藏底部tabbar的方式之一 -->
    <!-- <tab-bar v-if="!route.meta.isHiddenTabbar"/> -->
    <tab-bar />
    <loading />
  </div>
</template>

<style lang="less" scoped>

</style>