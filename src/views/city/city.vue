<script setup>
  import useCityStore from '@/stores/modules/city';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import CityGroup from './cpns/city-group.vue'
  
  const router = useRouter()
  const cityStore = useCityStore()

  // 搜素框
  const searchValue = ref("")
  const onSearch = (value) => {
    console.log(value)
  }
  const onCancel = () => {
    router.back()
  }

  // 标签页
  const activeTab = ref()

  // 获取城市数据
  if (Object.keys(cityStore.allCities).length === 0) {
    cityStore.fetchAllCities()
  }
  const { allCities } = storeToRefs(cityStore)

</script>

<template>
  <div class="city top-page">
    <div class="top">
      <van-search
        v-model="searchValue"
        show-action
        placeholder="城市/区域/位置"
        @search="onSearch"
        @cancel="onCancel"
      />
      <van-tabs v-model:active="activeTab" color="#ff9854">
        <template v-for="(value, key) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <!-- 一次性渲染所有分组信息，tabs切换显示更流畅 -->
      <template v-for="(cityGroup, key) in allCities" :key="key">
        <city-group v-show="key === activeTab" :city-group="cityGroup" />
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
  /* 防止vant-index-bar在滚动时，锚点吸顶会穿过标准流元素，因此设置top区域的层级 */
  .top {
    position: relative;
    z-index: 9;
  }
  /* 设置content区域局部滚动 */
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
</style>