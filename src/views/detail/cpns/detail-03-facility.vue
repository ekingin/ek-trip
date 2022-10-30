<script setup>
  import DetailSection from '@/components/detail-section/detail-section.vue'

  defineProps({
    facilityInfos: {
      type: Object,
      default: () => ({})
    }
  })

</script>

<template>
  <div class="detail-facility">
    <detail-section title="房屋设施" more-text="查看更多房屋">
      <div class="facility-detail">
        <template v-for="group in facilityInfos.houseFacilitys" :key="group.groupId">
          <div class="group-item">
            <div class="left">
              <img class="group-img" :src="group.icon" alt="">
              <span class="group-txt">{{ group.groupName }}</span>
            </div>
            <div class="right">
              <template v-for="facility in group.facilitys.slice(0, 4)">
                <div class="detail-item">
                  <i class="icon-check icon"></i>
                  <span class="item-txt">{{ facility.name }}</span>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </detail-section>
  </div>
</template>

<style lang="less" scoped>
  .facility-detail {
    background-color: #f7f9fb;
    font-size: 12px;
    border-radius: 10px;
    padding: 5px 0;
    .group-item {
      display: flex;
      margin: 20px 0;
      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 90px;
        .group-img {
          width: 20px;
          height: 20px;
        }
        .group-txt {
          color: #333;
          margin-top: 5px;
        }
      }
      .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        flex: 1;
        .detail-item {
          width: 50%;
          margin: 5px 0;
          display: flex;
          align-items: center;
          .icon-check {
            display: inline-block;
            width: 12px;
            height: 12px;
            background: url(@/assets/img/detail/icon_check.png) 0 0 / 100% 100%;
          }
          .icon {
            margin-right: 5px;
          }
        }
      }
    }
  }
</style>