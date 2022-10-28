import { defineStore } from "pinia";
import { getCategories, getHotSuggests, getHouseList } from "@/service";

const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    categories: [],
    houseList: [],
    currentPage: 1
  }),
  actions: {
    async fetchHotSuggests() {
      const res = await getHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategories() {
      const res = await getCategories()
      this.categories = res.data
    },
    async fetchHouseList() {
      const res = await getHouseList(this.currentPage++)
      this.houseList.push(...res.data)
    }
  }
})

export default useHomeStore