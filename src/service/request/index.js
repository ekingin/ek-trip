import axios from 'axios'
import { BASE_URL, TIME_OUT } from "./config"
import useMainStore from '@/stores/modules/main'

class EkRequest {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL,
      timeout: TIME_OUT
    })

    const mainStore = useMainStore()
    // 拦截器
    this.instance.interceptors.request.use(config => {
      mainStore.isShowLoading = true
      return config
    }, err => {
      return err
    })
    this.instance.interceptors.response.use(res => {
      mainStore.isShowLoading = false
      return res.data
    }, err => {
      mainStore.isShowLoading = false
      return err
    })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    }) 
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new EkRequest(BASE_URL)