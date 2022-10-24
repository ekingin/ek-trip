<script setup>
  import { ref } from 'vue'
  import tabbarData from '@/assets/data/tabbar'
  import { getLocalImgUrl } from '@/utils'

  let currentIndex = ref(0)
</script>

<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854">
      <template v-for="(menu, index) in tabbarData" :key="menu.path">
        <van-tabbar-item :to="menu.path">
          <span>{{ menu.text }}</span>
          <template #icon="props">
            <img v-if="currentIndex === index" class="icon" :src="getLocalImgUrl(menu.imgActive)" alt="">
            <img v-else class="icon" :src="getLocalImgUrl(menu.img)" alt="">
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<style lang="less" scoped>
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;
    border-top: 1px solid #f3f3f3;
    .icon {
      height: 30px;
    }
  }
</style>