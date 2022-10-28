<script setup>
  import { ref } from 'vue'
  import tabbarData from '@/assets/data/tabbar'
  import { getLocalImgUrl } from '@/utils'

  let currentIndex = ref(0)

</script>

<template>
  <van-tabbar class="tab-bar" v-model="currentIndex" active-color="#ff9854" route>
    <template v-for="(menu, index) in tabbarData" :key="menu.path">
      <van-tabbar-item :to="menu.path">
        <span>{{ menu.text }}</span>
        <template #icon="props">
          <img v-if="props.active" class="icon" :src="getLocalImgUrl(menu.imgActive)" alt="">
          <img v-else class="icon" :src="getLocalImgUrl(menu.img)" alt="">
        </template>
      </van-tabbar-item>
    </template>
  </van-tabbar>
</template>

<style lang="less" scoped>
  .tab-bar {
    .icon {
      height: 30px;
    }
  }
</style>