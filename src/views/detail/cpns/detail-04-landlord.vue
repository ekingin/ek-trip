<script setup>
  import DetailSection from '@/components/detail-section/detail-section.vue'

  defineProps({
    landlordInfos: {
      type: Object,
      default: () => ({})
    }
  })
</script>

<template>
  <div class="detail-landlord">
    <detail-section title="房东介绍" more-text="查看房东主页">
      <div class="intros">
        <div class="top" v-if="landlordInfos.topScroll">
          <img :src="landlordInfos.topScroll" alt="">
        </div>
        <div class="header">
          <div class="left">
            <img class="avatar" :src="landlordInfos.hotelLogo" alt="">
            <div class="infos">
              <span class="name">{{ landlordInfos.hotelName }}</span>
              <div class="tags">
                <template v-for="(item, index) in landlordInfos.hotelTags" :key="index">
                  <div class="item">
                    <span :style="{ color: item.tagText.color }" >{{ item.tagText.text }}</span>
                    <span v-if="index !== landlordInfos.hotelTags.length - 1" class="divider">|</span>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="contact">联系房东</div>
          </div>
        </div>
        <div class="bottom">
          <template v-for="(item, index) in landlordInfos.hotelSummary">
            <div class="item">
              <div class="title">{{ item.title }}</div>
              <div class="score">{{ item.introduction }}</div>
              <div class="desc">{{ item.tip }}</div>
            </div>
          </template>
        </div>
      </div>
    </detail-section>
  </div>
</template>

<style lang="less" scoped>
  .intros {
    .top > img {
      width: 100%;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        .avatar {
          width: 54px;
          height: 54px;
          margin-right: 10px;
        }
        .infos {
          display: flex;
          flex-direction: column;
          justify-content: center;          
          .name {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 5px;
          }
          .tags {
            display: flex;
            flex: wrap;
            .item {
              font-size: 12px;
              .divider {
                margin: 0 5px;
              }
            }
          }
        }
      }
      .right {
        .contact {
          height: 24px;
          line-height: 24px;
          padding: 0 12px;
          border-radius: 5px;
          background: var(--theme-linear-gradient);
          color: #fff;
          font-size: 12px;
        }
      }
    }
    .bottom {
      margin: 50px 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item {
        color: #999;
        font-size: 10px;
        .score {
          margin: 5px 0;
          color: #333;
          font-size: 15px;
          font-weight: 700;
        }
      }
    }
  }
</style>