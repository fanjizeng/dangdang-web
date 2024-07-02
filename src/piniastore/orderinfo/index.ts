import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import OrderinfoAPI from '@/api/OrderInfoApi'
import { Orderinfo, OrderDetail } from './state'
import { UserInfo } from '@/piniastore/userInfo/state'
import storage from '@/utils/goodStorageUtil'
import { ShopCart } from '../shopCart/state'
import { combine } from '@/utils/commontypes'
import { timeConversion } from '@/utils/dateUtil'
function hasProps(obj: Record<string, any>) {
  return Boolean(Object.getOwnPropertyNames(obj).length)
}

export default defineStore('orderinfoStore', {
  state: () => {
    return initOrdAndOrdDetailState
  },
  getters: {
    getOrdAndOrdDetails(state) {
      return hasProps(state.ordAndOrdDetails) ? state.ordAndOrdDetails : storage.get('ordAndOrdDetails')
    },
    getActiveIndex(state) {
      return state.ordAndOrdDetails !== undefined ? state.activeIndex : storage.get('activeIndex')
    },
    getOrdList(state): Orderinfo[] {
      return state.orderinfoLst.length > 0 ? state.orderinfoLst : storage.get('orderinfoLst')
    }
  },
  actions: {
    async addOrdAndOrdDetail() {
      // 1. 封装订单对象
      const customerid = (storage.get<UserInfo>('loginUser')).userid
      const orderinfo: Orderinfo = {
        ordertime: getNowTime(),
        orderstatus: 1,
        customerid: Number(customerid)
      }
      // 2. 封装订单详情
      const orderDetailLst: OrderDetail[] = []
      const chkedSCLst = storage.get<ShopCart[]>('chkedSCLst')
      chkedSCLst.forEach(checkSC => {
        const { bookname, bookprice, bookpicname, purcharsenum } = checkSC
        orderDetailLst.push({
          bookname,
          bookprice,
          bookpicname,
          purcharsenum,
          shopcartid: checkSC.shopcartid
        })
      })
      // 3. 合并订单和订单详情列表
      const lastOrdAndOrdDetailLst: Orderinfo = combine(orderinfo, {
        orderDetailLst
      })
      // 4. 调用接口执行后端订单和订单详情添加功能
      const res: AxiosResponse<Orderinfo> = await OrderinfoAPI.addOrdAndOrdDetail(lastOrdAndOrdDetailLst)
      // 5. 保存后端回传的订单和订单详情到state和缓存中
      this.ordAndOrdDetails = res.data
      storage.set('ordAndOrdDetails', res.data)
    },
    setActiveIndex(activeIndex: number) {
      this.activeIndex = activeIndex
      storage.set('activeIndex', activeIndex)
    },
    async findCurUsrOrdAndOrdDetail() {
      const customerid = Number((storage.get<UserInfo>('loginUser')).userid)
      const orderinfoLst: AxiosResponse<Orderinfo[]> = await OrderinfoAPI.findCurUsrOrdAndOrdDetail(customerid)
      this.orderinfoLst = setOrdEndTimeAndCutDownTime(converOrdStatus(orderinfoLst.data))
      storage.set('orderinfoLst', this.orderinfoLst)
    },
    async uptOrdStatusByOrdId(orderid: number) {
      await OrderinfoAPI.uptOrdStatusByOrdId(orderid)
    }
  }
})
function setOrdEndTimeAndCutDownTime(orderinfoList: Orderinfo[]) {
  return orderinfoList.map(item => {
    if (item.orderstatus === 1) {
      const orderTime = new Date(item.ordertime)
      item.orderEndTime = orderTime.getTime() + 600000
    }
    getCutDownTime(item)
    return item
  })
}
export function getRestTimesAndSecs(orderinfo: Orderinfo) {
  const restTimes = orderinfo.orderEndTime! - (new Date()).getTime()
  const restSecs = Math.floor(restTimes / 1000)
  return { restTimes, restSecs }
}
function getCutDownTime(orderinfo: Orderinfo) {
  const { restTimes, restSecs } = getRestTimesAndSecs(orderinfo)
  if (restSecs > 0) {
    orderinfo.countDownTime = timeConversion(restTimes)
  }
}
type InitOrdAndOrdDetailState = {
  ordAndOrdDetails: Orderinfo
  activeIndex: number
  orderinfoLst: Orderinfo[]
}
const initOrdAndOrdDetailState: InitOrdAndOrdDetailState = {
  ordAndOrdDetails: {} as Orderinfo,
  activeIndex: 0,
  orderinfoLst: []
}

function getNowTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() >= 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`
  const day = now.getDate() >= 10 ? now.getDate() : `0${now.getDate()}`
  const hour = now.getHours() >= 10 ? now.getHours() : `0${now.getHours()}`
  const minutes = now.getMinutes() >= 10 ? now.getMinutes() : `0${now.getMinutes()}`
  const seconds = now.getSeconds() >= 10 ? now.getSeconds() : `0${now.getSeconds()}`
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
}
function converOrdStatus(orderinfoLst: Orderinfo[]): Orderinfo[] {
  const ordLst = orderinfoLst.map((orderinfo) => {
    if (orderinfo.orderstatus === 1) {
      orderinfo.orderstatus_ = '等待付款'
    }
    else if (orderinfo.orderstatus === 2) {
      orderinfo.orderstatus_ = '交易成功'
    }
    else if (orderinfo.orderstatus === 3) {
      orderinfo.orderstatus_ = '待评价'
    }
    else if (orderinfo.orderstatus === -1) {
      orderinfo.orderstatus_ === '订单已取消'
    }
    return orderinfo
  })
  return ordLst as Orderinfo[]
}