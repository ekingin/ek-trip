<script setup>
  import { defineProps, computed } from 'vue';

  const props = defineProps({
    dataItem: {
      type: Object,
      default: () => ({})
    }
  })

  const itemScore = computed(() => +props.dataItem.commentScore)
</script>

<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="dataItem?.image?.url" alt="">
      </div>
      <div class="info">
        <div class="summary">{{ dataItem.summaryText }}</div>
        <div class="name">{{ dataItem.houseName }}</div>
        <div class="price">
          <van-rate :model-value="itemScore" color="#fff" :size="15" readonly allow-half />
          <span class="new">¥{{ dataItem.finalPrice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .house-item {
    width: 50%;
    .item-inner {
      position: relative;
      border-radius: 6px;
      margin: 5px;
      overflow: hidden;
      .cover {
        img {
          width: 100%;
        }
      }
      .info {
        position: absolute;
        bottom: 0;
        color: #fff;
        padding: 10px;
        .summary {
          font-size: 12px;
        }
        .name {
          margin: 5px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .price {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
  

</style>