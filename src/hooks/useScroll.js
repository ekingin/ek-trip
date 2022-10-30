import _ from "lodash"
import { ref, onActivated, onMounted, onUnmounted, onDeactivated } from "vue"

export default function (elRef) {
  let el = window

  const isReachBottom = ref(false)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  const clientHeight = ref(0)

  const scrollHandler = _.throttle(() => {
    if (el === window) {
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
      clientHeight.value = document.documentElement.clientHeight
    } else {
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
      clientHeight.value = el.clientHeight
    }
    
    if (scrollTop.value + clientHeight.value >= scrollHeight.value) {
      isReachBottom.value = true
    }
  }, 100)

  onMounted(() => {
    if(elRef) el = elRef.value
    el.addEventListener("scroll", scrollHandler)
  })
  // onActivated(() => {
  //   if(elRef) el = elRef.value
  //   el.addEventListener("scroll", scrollHandler)
  // })
  // onDeactivated(() => {
  //   el.removeEventListener("scroll", scrollHandler)
  // })
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollHandler)
  })
  
  return { isReachBottom, scrollTop, scrollHeight, clientHeight }
}