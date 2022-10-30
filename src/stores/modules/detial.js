import { defineStore } from "pinia";
import { getHouseDetail } from '@/service'

const useDetailStore = defineStore("detail", {
  state: () => ({
    houseDetail: {}
  }),
  actions: {
    async fetchHouseDetail(houseId) {
      const res = await getHouseDetail(houseId)
      this.houseDetail = res.data
    }
  }
})

export default useDetailStore