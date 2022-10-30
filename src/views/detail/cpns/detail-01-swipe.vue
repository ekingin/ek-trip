<script setup>
  const props = defineProps({
    swipeData: {
      type: Array,
      default: () => ([])
    }
  })

  // 对轮播图数据分类
  const tagGroup = {}
  props.swipeData.forEach((item) => {
    if (tagGroup[item.enumPictureCategory] === undefined) {
      tagGroup[item.enumPictureCategory] = {}
    }
    if(Object.keys(tagGroup[item.enumPictureCategory]).length === 0) {
      tagGroup[item.enumPictureCategory]['title'] = item.title.match(/【(.+)】/)[1]
      tagGroup[item.enumPictureCategory]['data'] = []
    }
    tagGroup[item.enumPictureCategory]['data'].push(item)
  })

  // 计算轮播图分类标签下标
  const calcTagIndex = (activeItem) => {
    const data = tagGroup[activeItem.enumPictureCategory].data
    return data.findIndex(item => item === activeItem) + 1
  }

</script>

<template>
  <div class="detail-swipe">
    <van-swipe :autoplay="3000" indicator-color="white">
      <!-- 轮播图图片 -->
      <template v-for="item in swipeData" :key="item.orderIndex">
        <van-swipe-item>
          <img class="banner-img" :src="item.url" alt="">
        </van-swipe-item>
      </template>
      <!-- 轮播图指示器 -->
      <template #indicator="{ active, total }">
        <span class="custom-indicator">
          <template v-for="(tag, key) in tagGroup" :key="key">
            <span class="indicator-item" :class="{ active: swipeData[active]?.enumPictureCategory == key }">
              <span>{{ tag.title }}</span>
              <span v-if="swipeData[active]?.enumPictureCategory == key">
                {{ calcTagIndex(swipeData[active]) }}/{{ tag.data.length }}
              </span>
            </span>
          </template>
        </span>
      </template>
    </van-swipe>
  </div>
</template>

<style lang="less" scoped>
  .detail-swipe {
    .banner-img {
      width: 100%;
    }
    .custom-indicator {
      position: absolute;
      right: 10px;
      bottom: 8px;
      color: #fff;
      background-color: rgba(0, 0, 0, .5);
      border-radius: 10px;
      padding: 5px;
      text-align: right;
      font-size: 10px;
      .indicator-item {
        padding: 0 5px;
      }
      .active {
        color: #333;
        background-color: #fff;
        border-radius: 7px;
      }
    }
  }
</style>