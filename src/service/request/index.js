import axios from 'axios'
import { BASE_URL, TIME_OUT } from "./config"

class EkRequest {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL,
      timeout: TIME_OUT
    })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
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