import useMainStore from "@/stores/modules/main"
import { formatDate, getDateDiff } from '@/utils';
import { computed } from "vue";
import { storeToRefs } from 'pinia'

export default function(format) {
  const mainStore = useMainStore()
  
  const { startDate, endDate } = storeToRefs(mainStore)
  const startDateStr = computed(() => formatDate(startDate.value, format)) 
  const endDateStr = computed(() => formatDate(endDate.value, format))
  const stayDay = computed(() => getDateDiff(endDate.value, startDate.value))

  return { startDateStr, endDateStr, stayDay }
} 