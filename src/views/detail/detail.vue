<script setup>
  import TabControl from '@/components/tab-control/tab-control.vue'
  import DetailSwipe from './cpns/detail-01-swipe.vue'
  import DetailInfos from './cpns/detail-02-infos.vue'
  import DetailFacility from './cpns/detail-03-facility.vue'
  import DetailLandlord from './cpns/detail-04-landlord.vue'
  import DetailComment from './cpns/detail-05-comment.vue'
  import DetailNotice from './cpns/detail-06-notice.vue'
  import DetailMap from './cpns/detail-07-map.vue'
  import DetailIntro from './cpns/detail-08-intro.vue'

  import { useRouter, useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia';
  import { computed, ref } from 'vue';
  import useDetailStore from '@/stores/modules/detial'
  import useScroll from '@/hooks/useScroll'

  const router = useRouter()
  const route = useRoute()
  const detailStore = useDetailStore()

  // 页面返回
  const onPageBack = () => {
    router.back()
  }

  // 发送请求
  const houseId = route.params.id
  detailStore.fetchHouseDetail(houseId)

  // 获取数据
  const { houseDetail } = storeToRefs(detailStore)
  const mainPart = computed(() => houseDetail.value.mainPart)

  // 滚动 
  const detailRef = ref()
  const sectionsRef = ref({})
  const names = computed(() => Object.keys(sectionsRef.value))
  const { scrollTop } = useScroll(detailRef)
  const isShowTabControl = computed(() => scrollTop.value > 350)
  const getSectionRef = (value) => {
    if(!value) return
    const name = value.$el.getAttribute("name")
    sectionsRef.value[name] = value.$el
  }
  const tabClick = (index) => {
    const key = names.value[index]
    let instance = sectionsRef.value[key].offsetTop
    if (index !== 0) {
      instance = instance - 57
    }
    detailRef.value.scrollTo({
      top: instance,
      behavior: 'smooth'
    })
  }

</script>

<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control 
      ref="tabControlRef"
      :titles="names" 
      v-if="isShowTabControl"
      class="tab-control" 
      @tab-click="tabClick"
    />
    <van-nav-bar
      title="房屋详情"
      left-text="路途"
      left-arrow
      @click-left="onPageBack"
    />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <detail-infos name="描述" :ref="getSectionRef" :infos="mainPart.topModule" />
      <detail-facility name="设施" :ref="getSectionRef" :facility-infos="mainPart.dynamicModule.facilityModule.houseFacility" />
      <detail-landlord name="房东" :ref="getSectionRef" :landlord-infos="mainPart.dynamicModule.landlordModule" />
      <detail-comment name="评论" :ref="getSectionRef" :comment-infos="mainPart.dynamicModule.commentModule" />
      <detail-notice name="须知" :ref="getSectionRef" :notice-infos="mainPart.dynamicModule.rulesModule.orderRules" />
      <detail-map name="周边" :ref="getSectionRef" :map-infos="mainPart.dynamicModule.positionModule" />
      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
    </div>

  </div>
</template>

<style lang="less" scoped>
  .tab-control {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 100;
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    img {
      width: 120px;
    }
  }
</style>