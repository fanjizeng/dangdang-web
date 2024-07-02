import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios'
import conf from '@/config'
import storage from '@/utils/goodStorageUtil'
import router from '@/router'
import { showToast } from 'vant';

const SERVER_ERR = '请求服务器的网址错误或网络连接失败'

interface AxiosRequestConfig_ extends AxiosRequestConfig {
  isMock: boolean
}

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'
const methods: Method[] = ['get', 'post', 'put', 'delete', 'patch']
type ReqFn = (url: string, isMock: boolean, data?: any, config?: AxiosRequestConfig) => Promise<any>
interface ReqExecute {
  get: ReqFn
  post: ReqFn
  put: ReqFn
  delete: ReqFn
  patch: ReqFn
}

class AxiosUtil {
  static axiosUtil: AxiosUtil = new AxiosUtil()
  axiosInstance!: AxiosInstance
  request!: ReqExecute
  constructor() {
    this.request = {
      'get': (): any => { },
      'post': (): any => { },
      'put': (): any => { },
      'delete': (): any => { },
      'patch': (): any => { }
    }
    this.createAxiosInstance()
    this.beforeReqIntercpt()
    this.beforeResponseIntercpt()
    this.reqPrepare()
  }
  createAxiosInstance() {
    this.axiosInstance = axios.create({ timeout: 15000 })
  }
  // 1.请求开始之前的请求拦截器
  beforeReqIntercpt() {
    this.axiosInstance.interceptors.request.use((request) => {
      const token = storage.get('token')
      const headers = request.headers
      if (!headers.authorization && token)
        headers.authorization = `Bearer ${token}`
      return request
    })
  }
  // 2.数据响应之前的响应拦截器
  beforeResponseIntercpt() {
    this.axiosInstance.interceptors.response.use((response) => {
      const { msg, code } = response.data
      if (code === 200) return response.data
      else if (code === 500) {
        console.log(`发生了错误${msg}`)
        return
      } else if (code === 401) {
        if (msg === '这是不合法或过期的token') {
          storage.set('token', '')
          showToast(msg)
          router.push({ path: '/login' })
          throw new Error(msg)
        }
      }
      else {
        console.log(SERVER_ERR)
      }
    }, (err) => {
      console.log(SERVER_ERR)
    })
  }
  // 3.发送请求给服务器
  sendRequest(options: AxiosRequestConfig_) {
    if (conf.env === 'production') this.axiosInstance.defaults.baseURL = conf.baseApi
    else if (conf.env === 'development') {
      const isMock: boolean = options.isMock || conf.isMock
      this.axiosInstance.defaults.baseURL = isMock ? conf.mockBaseApi : conf.baseApi
    }
    return this.axiosInstance(options)
  }
  // 4. 深入灵活应用TS完成method类型自动提示
  reqPrepare() {
    return methods.forEach(method => {
      this.request[method] = (url, isMock, data) => {
        if (method === 'get') {
          return this.sendRequest({
            url,
            isMock,
            params: data
          })
        } else {
          return this.sendRequest({
            url,
            isMock,
            data,
            method
          })
        }
      }
    })
  }
}

export default AxiosUtil.axiosUtil.request