<script setup>
  import { defineProps, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import useCityStore from '@/stores/modules/city'

  const router = useRouter()
  const cityStore = useCityStore()
  const props = defineProps({
    cityGroup: {
      type: Object,
      default: () => ({})
    }
  })
  
  // 动态计算城市索引
  const indexList = computed(() => {
    const list = props.cityGroup.cities.map(item => item.group)
    list.unshift("#")
    return list
  })

  // 点击城市
  const clickCity = (selectCity) => {
    cityStore.currentCity = selectCity
    router.back()
  }
</script>

<template>
  <div class="city-group">
    <van-index-bar highlight-color="#ff9853" :index-list="indexList">
      <van-index-anchor index="热门" />
      <div class="hot">
        <template v-for="(hotCity, index) in cityGroup.hotCities" :key="index">
          <div class="item" @click="clickCity(hotCity)">{{ hotCity.cityName }}</div>
        </template>
      </div>
      <template v-for="(group, index) in cityGroup.cities" :key="index">
        <van-index-anchor :index="group.group" />
        <template v-for="(city, indey) in group.cities" :key="indey">
          <van-cell :title="city.cityName" @click="clickCity(city)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<style lang="less" scoped>
  .hot {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    padding-right: 20px;

    .item {
      width: 75px;
      height: 28px;
      line-height: 28px;
      border-radius: 14px;
      color: #333;
      background-color: #fff4ec;
      text-align: center;
      margin: 6px;
    }
  }
</style>