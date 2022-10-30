import { defineStore } from "pinia";

// 获取本地日期
const nowDate = new Date()
const dateGap = 24 * 60 * 60 * 1000
const newDate = new Date(nowDate.getTime() + dateGap)

const useMainStore = defineStore('main', {
  state: () => ({
    startDate: nowDate,
    endDate: newDate,
    isShowLoading: true,
  }),
  actions: {

  }
})

export default useMainStore