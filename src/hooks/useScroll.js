import _ from "lodash"
import { ref, onActivated, onMounted, onUnmounted, onDeactivated } from "vue"

export default function () {
  const isReachBottom = ref(false)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  const clientHeight = ref(0)

  const scrollHandler = _.throttle(() => {
    scrollTop.value = document.documentElement.scrollTop
    scrollHeight.value = document.documentElement.scrollHeight
    clientHeight.value = document.documentElement.clientHeight
    if (scrollTop.value + clientHeight.value >= scrollHeight.value) {
      isReachBottom.value = true
    }
  }, 100)

  onMounted(() => {
    window.addEventListener("scroll", scrollHandler)
  })
  onActivated(() => {
    window.addEventListener("scroll", scrollHandler)
  })
  onDeactivated(() => {
    window.removeEventListener("scroll", scrollHandler)
  })
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollHandler)
  })
  
  return { isReachBottom, scrollTop, scrollHeight, clientHeight }
}