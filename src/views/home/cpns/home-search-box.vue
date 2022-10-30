<script setup>
  import useCityStore from '@/stores/modules/city';
  import useHomeStore from '@/stores/modules/home';
  import useMainStore from '@/stores/modules/main';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { ref, reactive, watch, computed } from "vue"
  import useDate from '@/hooks/useDate'
  
  const router = useRouter()
  const mainStore = useMainStore()
  const homeStore = useHomeStore()
  const cityStore = useCityStore()

  // 获取地理位置
  const positionClick = () => {
    navigator.geolocation.getCurrentPosition((res) => {
      console.log(res)
    }, (err) => {
      console.log(err)
    }, {
      timeout: 5000,
    })
  }

  // 切换城市
  const switchCity = () => {
    router.push('/city')
  }

  // 获取当前选择的城市
  const { currentCity } = storeToRefs(cityStore)

  // 获取当前日期、夜晚数
  const { startDateStr, endDateStr, stayDay } = useDate()

  // 日历日期选择 
  const showCalendar = ref(false)
  const selectDateRange = () => showCalendar.value = true
  const calendarformatter = (day) => {
    if (day.type === 'start') {
      day.bottomInfo = '入住';
    } else if (day.type === 'end') {
      day.bottomInfo = '离店';
    }
    return day
  }
  const calendarConfirm = (value) => {
    showCalendar.value = false
    const selectedStartDate = value[0]
    const selectedEndDate = value[1]
    mainStore.startDate = selectedStartDate
    mainStore.endDate = selectedEndDate
  }

  // 人数/床数选择
  const showSetPopup = ref(false)
  const countSet = reactive({ people: 0, bed: 0 }) // 和进步器响应的数量设置
  const currentCountSet = reactive({ people: 0, bed: 0 }) // 当前确认选择的数量设置
  const selectCounts = () => {
    showSetPopup.value = true
  }
  watch(countSet, value => {
    if(value.people === 0) {
      value.people = ''
    }
    if (value.bed === 0) {
      value.bed = ''
    }
  }, { deep: true, immediate: true })
  const resetCount = () => {
    countSet.people = ''
    countSet.bed = ''
  }
  const confirmCount = () => {
    showSetPopup.value = false
    currentCountSet.people = countSet.people || 0
    currentCountSet.bed = countSet.bed || 0
  }
  const cpuCurrentCount = computed(() => {
    if (!currentCountSet.people && !currentCountSet.bed) {
      return '人数/床数'
    }
    if (currentCountSet.people && currentCountSet.bed) {
      return `${currentCountSet.people}人-${currentCountSet.bed}床`
    }
    return currentCountSet.people ? `${currentCountSet.people}人` : `${currentCountSet.bed}床`
  })

  // 关键字推荐
  const { hotSuggests } = storeToRefs(homeStore)

</script>

<template>
  <div class="home-search-box">
    <!-- 地理位置 -->
    <div class="section location">
      <span class="city" @click="switchCity">{{ currentCity.cityName }}</span>
      <div class="position" @click="positionClick">
        <span>我的位置</span>
        <i class="position-icon"></i>
      </div>
    </div>
    <!-- 需求选择 -->
    <div class="section demands">
      <!-- 日期选择 -->
      <div class="date-range" @click="selectDateRange">
        <div class="start">
          <span class="tip">入住</span>
          <span class="date">{{ startDateStr }}</span>
        </div>
        <div class="range">共{{ stayDay }}晚</div>
        <div class="end">
          <span class="tip">离店</span>
          <span class="date">{{ endDateStr }}</span>
        </div>
      </div>
      <van-calendar 
        v-model:show="showCalendar" 
        type="range" 
        color="#ff9854"
        :show-confirm="false"
        :formatter="calendarformatter"
        @confirm="calendarConfirm"
      />
      <!-- 人数/床数 -->
      <div class="counts" @click="selectCounts">{{ cpuCurrentCount }}</div>
      <van-popup
        class="popup-counts"
        v-model:show="showSetPopup"
        round
        position="bottom"
        :style="{ height: '30%' }"
        closeable
        close-icon="close"
      >
        <div class="popup-title">人数床数</div>
        <div class="counts-set">
          <div class="set-item">
            <span class="label">居住人数</span>
            <van-stepper v-model="countSet.people" disable-input min="0" placeholder="不限" allow-empty />
          </div>
          <div class="set-item">
            <span class="label">床铺数量</span>
            <van-stepper v-model="countSet.bed" disable-input min="0" placeholder="不限" allow-empty/>
          </div>
        </div>
        <div class="btns">
          <van-button class="btn" round type="default" @click="resetCount">重置</van-button>
          <van-button class="btn" round color="#ff8754" @click="confirmCount">确认</van-button>
        </div>
      </van-popup>
    </div>
    <!-- 关键字推荐 -->
    <div class="keyword-recommand">
      <div class="recommand-title">关键字/位置/民宿名</div>
      <div class="keyword-wrap">
        <template v-for="(item, index) in hotSuggests" :key="index">
          <div 
            class="keyword-item" 
            :style="{ color: item.tagText.color }"
          >
            {{ item.tagText.text }}
          </div>
        </template>
      </div>
    </div>
    <!-- 搜索按钮 -->
    <div class="search-wrap">
      <div class="search-btn" @click="searchClick">开始搜索</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .home-search-box {
    .section {
      display: flex;
      align-items: center;
      padding: 0 20px;
    }
    .location {
      height: 44px;
      .city {
        flex: 1;
        color: #333;
        font-size: 15px;
      }
      .position {
        width: 77px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .position-icon {
          width: 18px;
          height: 18px;
          background: url("@/assets/img/home/icon_location.png") no-repeat center/18px;
        }
      }
    }
    .demands {
      justify-content: space-between;
    }
    .date-range {
      flex: 7;
      display: flex;
      align-items: center;
      color: #999;
      justify-content: space-between;
      .start, .end {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .tip {
          color: #999;
          font-size: 12px;
        }
        .date {
          color: #333;
          font-size: 15px;
        }
      }
      .range {
        font-size: 15px;
        color: #333;
        background-color: lightblue;
        padding: 2px 5px;
        border-radius: 10%;
      }
    }
    .counts {
      flex: 3;
      text-align: right;
      
    }
    :deep(.popup-counts) {
      display: flex;
      flex-direction: column;
      .popup-title {
        font-weight: 700;
        font-size: 18px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #333;
      }
      .counts-set {
        flex: 1;
        .set-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 15px;
          .label {
            font-size: 16px;
            color: #333;
          }
        }
      }
      .btns {
        display: flex;
        justify-content: space-between;
        padding: 15px;
        .btn {
          width: 47%;
          height: 40px;
          line-height: 40px;
        }
      }
    }
    .keyword-recommand {
      padding: 0 20px;
      .recommand-title {
        color: #999;
        margin: 20px 0;
      }
      .keyword-wrap {
        display: flex;
        flex-wrap: wrap;

        .keyword-item {
          background-color: #f1f3f5;
          color: #3f4954;
          border-radius: 5px;
          padding: 4px 8px;
          margin: 3px;
          font-size: 12px;
          line-height: 1;
        }
      }
    }
    .search-wrap {
      padding: 20px;
      text-align: center;
    }
    .search-btn {
      height: 40px;
      line-height: 40px;
      width: 100%;
      border-radius: 20px;
      color: #fff;
      background-image: var(--theme-linear-gradient);
      font-size: 18px;
    }
  }
</style>