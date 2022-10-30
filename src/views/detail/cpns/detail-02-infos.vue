<script setup>
  defineProps({
    infos: {
      type: Object,
      default: () => ({})
    }
  })

</script>

<template>
  <div class="detail-infos">
    <div class="name">{{ infos.houseName }}</div>
    <div class="house-tag">
      <template v-for="(item, index) in infos.houseTags" :key="index">
        <span
          class="tag-item"
          v-if="item.tagText"
          :style="{ backgroundColor: item?.tagText?.background?.color, color: item?.tagText?.color }"
        >
          {{ item?.tagText?.text }}
        </span>
      </template>
    </div>
    <div class="comment info-item">
      <div class="left">
        <span class="comment-score">{{ infos.commentBrief.overall }}</span>
        <span class="comment-title">{{ infos.commentBrief.scoreTitle }}</span>
        <span class="comment-subtitle dot-hidden-txt-1">{{ infos.commentBrief.commentBrief }}</span>
      </div>
      <div class="right">
        {{ infos.commentBrief.totalCount }}条评论 
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="address info-item">
      <div class="left dot-hidden-txt-1">{{ infos.nearByPosition.address }}</div>
      <div class="right">
        地图·周边
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .detail-infos {
    padding: 12px 16px;
    .name {
      font-size: 20px;
      font-weight: 700;
      color: #333;
      text-align: justify;
      line-height: 24px;
    }
    .house-tag {
      padding: 10px 0;
      .tag-item {
        font-size: 10px;
        padding: 2px 4px;
        border-radius: 2px;
        margin-right: 4px;
      }
    }
    .info-item {
      background-color: #f5f7fa;
      border-radius: 5px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        flex: 1;
      }
      .right {
        color: var(--primary-color);
        font-size: 12px;
        margin-left: 10px;
      }
      &.comment {
        margin-bottom: 10px;
        .left {
          display: flex;
          align-items: center;
          .comment-score {
            font-size: 18px;
            color: #333;
            font-weight: 700;
            margin-right: 5px;
          }
          .comment-title {
            font-size: 12px;
            color: #333;
            font-weight: 700;
            margin-right: 5px;
          }
          .comment-subtitle {
            font-size: 12px;
            color: #666;
            display: inline-block;
            width: 200px;
            flex: 1;
          }
        }
      } 
      &.address > .left {
        font-size: 14px;
        color: #333;
        font-weight: 700;
      }
    }
  }
  
</style>