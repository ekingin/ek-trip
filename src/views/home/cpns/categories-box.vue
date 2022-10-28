<script setup>
  import useHomeStore from '@/stores/modules/home';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue'; 

  const homeStore = useHomeStore()

  // 获取分类信息
  const { categories } = storeToRefs(homeStore)

  // 分类切换
  const currentIndex = ref(0)
  const clickCategory = (index) => {
    currentIndex.value = index
  }


</script>

<template>
  <div class="categories-box">
    <template v-for="(item, index) in categories" :key="index">
      <div 
        class="category-item" 
        :class="{ active: currentIndex === index }" 
        @click="clickCategory(index)"
      >
        <img :src="item.pictureUrl" alt="">
        <span>{{ item.title }}</span>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
  .categories-box {
    display: flex;
    align-items: center;
    overflow-x: scroll;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .category-item {
      width: 70px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 12px;
      img {
        width: 32px;
        height: 32px;
      }
      span {
        height: 20px;
        line-height: 20px;
      }
    }
    .active {
      border-bottom: 3px solid var(--primary-color);
    }
  }

</style>