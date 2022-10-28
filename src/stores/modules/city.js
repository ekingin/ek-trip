import { defineStore } from 'pinia'
import { getAllCities } from '@/service'

const useCityStore = defineStore('city', {
  state: () => ({
    allCities: {}, // 所有的城市数据
    currentCity: { cityName: '杭州' }, // 当前选择的城市
  }),
  actions: {
    async fetchAllCities() {
      const res = await getAllCities()
      this.allCities = res.data
    }
  }
})

export default useCityStore