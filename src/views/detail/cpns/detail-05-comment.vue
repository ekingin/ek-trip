<script setup>
  import DetailSection from '@/components/detail-section/detail-section.vue'

  defineProps({
    commentInfos: {
      type: Object,
      default: () => ({})
    }
  })
</script>

<template>
  <div class="detail-comment">
    <detail-section title="热门评论" :more-text="`查看全部评论(${commentInfos.totalCount})`">
      <div class="comment-infos">
        <div class="header">
          <div class="comment-score">
            <span class="score">{{ commentInfos.overall }}</span>
            <div class="line"></div>
          </div>
          <div class="comment-infos">
            <div class="title">{{ commentInfos.scoreTitle }}</div>
            <div class="count">{{ commentInfos.totalCount }}条评论</div>
            <div class="star">
              <van-rate v-model="commentInfos.overall" color="#ff9645" size="12" readonly allow-half />
            </div>  
          </div>
          <div class="comment-short">
            <template v-for="(item, index) in commentInfos.subScores" :key="index">
              <span class="item">{{ item }}</span>
            </template>
          </div>
        </div>
        <div class="tags">
          <template v-for="(item, index) in commentInfos.commentTagVo" :key="index">
            <span 
              class="item" 
              :style="{ color: item.color, background: item.backgroundColor }"
            >
              {{ item.text }}
            </span>
          </template>
        </div>
        <div class="content">
          <div class="user">
            <div class="avatar">
              <img :src="commentInfos.comment.userAvatars" alt="">
            </div>
            <div class="profile">
              <div class="name">{{ commentInfos.comment.userName }}</div>
              <div class="date">{{ commentInfos.comment.checkInDate }}</div>
            </div>
          </div>
          <div class="text">
            {{ commentInfos.comment.commentDetail }}
          </div>
        </div>
      </div>
    </detail-section>
  </div>
</template>

<style lang="less" scoped>
  .comment-infos {
    .header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .comment-score {
        .score {
          font-size: 48px;
          font-weight: 600;
          color: #333;
        }
        .line {
          background: var(--theme-linear-gradient);
          height: 5px;
          border-radius: 2px;
          width: 100%;
        }
      } 
      .comment-infos {
        margin-left: 10px;
      }
      .comment-short {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        justify-content: flex-end;
        .item {
          color: #666;
          font-size: 12px;
          margin-left: 5px;
          line-height: 1.5;
        }
      }
    }
    .tags {
      padding: 15px 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .item {
        background-color: #999;
        color: #666;
        font-size: 12px;
        padding: 3px 5px;
        border-radius: 5px;
        margin: 10px 10px 0 0;
      }
    }
    .content {
      background-color: #f7f9fb;
      padding: 10px;
      border-radius: 10px;
      .user {
        display: flex;
        align-items: center;
        .avatar > img {
          width: 32px;
          height: 32px;
        }
        .profile {
          margin-left: 10px;
          font-size: 14px;
          .date {
            color: #666;
          }
        }
      }
      .text {
        margin-top: 10px;
        font-size: 12px;
      }
    }
  }
</style>