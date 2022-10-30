<script setup>
  import { defineProps } from 'vue';

  defineProps({
    title: {
      type: String,
      default: '默认标题'
    },
    moreText: {
      type: String,
      default: ''
    }
  })
</script>

<template>
  <div class="detail-section">
    <div class="header">
      <h2>{{ title }}</h2>
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="footer">
      <div class="more" v-if="moreText !== ''">
        <span>{{ moreText }}</span>
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .detail-section {
    padding: 0 16px;
    margin-top: 15px;
    border-top: 5px solid #f2f3f4;
    .header {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #eee;
    }
    .content {
      padding: 10px 0;
    }
    .footer {
      .more {
        height: 44px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: var(--primary-color);
        font-weight: 700;
        font-size: 14px;
      }
    }
  }
</style>