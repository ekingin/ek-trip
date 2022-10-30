<script setup>
  import { ref } from 'vue';

  defineProps({
    titles: {
      type: Array,
      default: () => ([])
    }
  })
  const emit = defineEmits(['tabClick'])
  const currentIndex = ref(0)
  const tabClick = (index) => {
    currentIndex.value = index
    emit('tabClick', index)
  }
  const setCurrentIndex = (index) => {
    currentIndex.value = index
  }

  defineExpose({
    setCurrentIndex
  })
</script>

<template>
  <div class="tab-control">
    <template v-for="(item, index) in titles" :key="index">
      <div class="item" :class="{ active: index === currentIndex }" @click="tabClick(index)">
        <span class="title">{{ item }}</span>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
  .tab-control {
    display: flex;
    padding-bottom: 10px;
    .item {
      flex: 1;
      height: 44px;
      line-height: 44px;
      text-align: center;
      &.active {
        border-bottom: 3px solid var(--primary-color);
      }
    }
  }
</style>