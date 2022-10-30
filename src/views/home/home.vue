<script setup>
  import HomeSearchBox from './cpns/home-search-box.vue'
  import HomeCategories from "./cpns/home-categories.vue";
  import HomeHouseList from './cpns/home-house-list.vue';
  import HomeSearchBar from './cpns/home-search-bar.vue';

  import { storeToRefs } from 'pinia';
  import { watch, computed, onActivated, ref } from 'vue'
  import useHomeStore from '@/stores/modules/home'
  import useScroll from '@/hooks/useScroll'

  const homeStore = useHomeStore()

  // 发送请求
  homeStore.fetchHotSuggests()
  homeStore.fetchCategories()
  homeStore.fetchHouseList()

  // 获取商品列表
  const { houseList } = storeToRefs(homeStore)

  // 页面滚动
  const homeRef = ref()
  const { isReachBottom, scrollTop } = useScroll(homeRef)
  // 1. 加载更多
  watch(isReachBottom, (value) => {
    if (value) {
      homeStore.fetchHouseList().then(() => {
        isReachBottom.value = false
      })
    }
  })
  // 2. 是否显示悬浮搜索栏
  const isShowSearchBar = computed(() => scrollTop.value >= 350)
  // 3. 页面激活时，恢复上一次的scrollTop
  onActivated(() => {
    homeRef.value.scrollTo({
      top: scrollTop.value
    })
  })
  

</script>

<template>
  <div class="home" ref="homeRef">
    <!-- 导航 -->
    <van-nav-bar title="旅途demo" />
    <!-- 轮播图 -->
    <div class="banner">
      <img class="banner" src="@/assets/img/home/banner.webp" alt="">
    </div>
    <div class="home-wrap">
      <!-- 搜索 -->
      <home-search-box />
      <!-- 分类 -->
      <home-categories />
      <!-- 商品列表 -->
      <home-house-list :data-list="houseList" />
    </div>
    <home-search-bar v-show="isShowSearchBar" />
  </div>
</template>

<style lang="less" scoped>
  .home {
    height: 100vh;
    overflow-y: auto;
 
    .banner {
      width: 100%;
    }
    .home-wrap {
      background-image: linear-gradient(180deg, #fff, #eee);
    }
  }

</style>