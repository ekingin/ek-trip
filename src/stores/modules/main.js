import { defineStore } from "pinia";

const nowDate = new Date()
const dateGap = 24 * 60 * 60 * 1000
const newDate = new Date(nowDate.getTime() + dateGap)

const useMainStore = defineStore('main', {
  state: () => ({
    startDate: nowDate,
    endDate: newDate,
  }),
  actions: {

  }
})

export default useMainStore