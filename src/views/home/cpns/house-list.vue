<script setup>
  import { defineProps } from 'vue';
  import HouseItemType9 from '@/components/house-item/house-item-type9.vue'
  import HouseItemType3 from '@/components/house-item/house-item-type3.vue'

  defineProps({
    dataList: {
      type: Array,
      default: () => ([])
    }
  })
</script>

<template>
  <div class="house-list">
    <h2 class="header">热门精选</h2>
    <div class="content">
      <template v-for="item in dataList" :key="item.data.houseId">
        <house-item-type9 v-if="item.discoveryContentType === 9" :dataItem="item.data" />
        <house-item-type3 v-else-if="item.discoveryContentType === 3" :dataItem="item.data" />
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .header {
    margin: 15px 0 0 20px;
  }
  .content {
    padding: 8px;
    display: flex;
    flex-wrap: wrap;
  }
</style>