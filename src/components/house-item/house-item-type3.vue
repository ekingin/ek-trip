<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    dataItem: {
      type: Object,
      default: () => ({})
    }
  })
</script>

<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="dataItem?.image?.url" alt="">
      </div>
      <div class="info">
        <div class="location">
          <img src="@/assets/img/home/location.png" alt="">
          <span>{{ dataItem.location }}</span>
        </div>
        <div class="name">{{ dataItem.houseName }}</div>
        <div class="summary">{{ dataItem.summaryText }}</div>
        <div class="price">
          <span class="new">¥{{ dataItem.finalPrice }}</span>
          <span class="old">¥{{ dataItem.productPrice }}</span>
          <span class="tip" v-if="dataItem.priceTipBadge">
            {{ dataItem.priceTipBadge.text }}
          </span>
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
        color: #333;
        padding: 10px;
        display: flex;
        background-color: #fff;
        flex-direction: column;
        .location {
          img {
            width: 16px;
          }
        }
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
          margin-top: 8px;
          .new {
            font-size: 17px;
            color: var(--primary-color);
          }
          .old {
            text-decoration: line-through;
            color: #c0c0c0;
          }
          .tip {
            display: inline-block;
            padding: 3px 5px;
            border-radius: 5px;
            background-color: #ff9f9f;
          }
        }
      }
    }
  }
</style>