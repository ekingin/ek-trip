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
  import { computed, ref, watch, onMounted } from 'vue';
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
  
  // 滚动相关的逻辑
  // 1. 点击tab control滚动到对应的section
  const detailRef = ref()
  const sectionsRef = ref({})
  const { scrollTop } = useScroll(detailRef)
  const isShowTabControl = computed(() => scrollTop.value > 307)
  // 1.1 动态获取tab control的数组
  const names = computed(() => Object.keys(sectionsRef.value))
  // 1.2 获取每个section的根元素
  const getSectionRef = (value) => {
    if(!value) return
    const name = value.$el.getAttribute("name")
    sectionsRef.value[name] = value.$el
  }
  // 1.3 tab点击滚动到对应的section
  let isClick = false
  let currentDistance = -1
  const tabClick = (index) => {
    const key = names.value[index]
    let distance = sectionsRef.value[key].offsetTop
    if (index !== 0) {
      distance = distance - 57
    }

    isClick = true
    currentDistance = distance
    console.log("currentDistance", currentDistance)

    detailRef.value.scrollTo({
      top: distance,
      behavior: 'smooth'
    })
  }
  // 1.4 滚动到section时，显示对应的tab
  const tabControlRef = ref()
  watch(scrollTop, value => {
    console.log("scrollTop", value)
    if (value === currentDistance) {
      isClick = false
    }
    if (isClick) return
    const sectionsTop = Object.values(sectionsRef.value).map(el => el.offsetTop)

    let index = sectionsTop.length - 1
    for(let i = 0; i < sectionsTop.length; i++) {
      if (sectionsTop[i] > value + 57) {
        index = i - 1
        break
      }
    }
    tabControlRef.value?.setCurrentIndex(index)
  })

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