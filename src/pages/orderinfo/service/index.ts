import { storeToRefs } from 'pinia'
import shopCartStore from '@/piniastore/shopCart'
import orderinfoStore, {getRestTimesAndSecs} from '@/piniastore/orderinfo'
import router from '@/router/index'
import { ref, Ref, watchEffect, computed } from 'vue'
import { timeConversion } from '@/utils/dateUtil'
export default class OrderClass {
  static store = shopCartStore()
  static ordStore = orderinfoStore()
  static storeToRefs = storeToRefs(OrderClass.store)
  static ordStoreToRefs = storeToRefs(OrderClass.ordStore)
  static startIndex: Ref<number> = ref(0)
  static async addOrdAndOrdDetailLst() {
    await OrderClass.ordStore.addOrdAndOrdDetail()
    OrderClass.clearSCLstCache()
    router.push({
      path: '/orderSort'
    })
  }
  static clearSCLstCache() {
    OrderClass.store.storeShopCartList([])
  }
  static setChkedSCLst() {
    OrderClass.store.setChkedSCLst()
  }
  static showLeftArrow() {
    return computed(() => {
      return OrderClass.startIndex.value > 0
    })
  }
  static showRightArrow() {
    return computed(() => {
      return OrderClass.startIndex.value + 4 <= OrderClass.store.getChkedSCLst.length - 1
    })
  }
  static leftScrollArrow() {
    OrderClass.startIndex.value = OrderClass.startIndex.value - 1
  }
  static rightScrollArrow() {
    OrderClass.startIndex.value = OrderClass.startIndex.value + 1
  }
  static getSubChkSCLst() {
    watchEffect(() => {
      OrderClass.store.subShkedSCLst =
        OrderClass.store.getChkedSCLst.slice(OrderClass.startIndex.value, OrderClass.startIndex.value + 4)
    })
  }
  static changeTab(index: number) {
    OrderClass.ordStore.setActiveIndex(index)
  }
  static loopCutDownTime() {
    watchEffect(()=> {
      OrderClass.ordStore.getOrdList.forEach(orderitem => {
        if (orderitem.orderstatus === 1) {
           orderitem.countdownfn = setInterval(async()=> {
            // 1. 如果支付时间结束了，就更新订单状态
            const rest = getRestTimesAndSecs(orderitem)
            if(rest.restSecs === 0) {
              clearInterval(orderitem.countdownfn)
              await OrderClass.ordStore.uptOrdStatusByOrdId(orderitem.orderid!)
            }else {
              // 2. 如果支付时间没有结束，就刷新页面倒计时时间
              orderitem.countDownTime = timeConversion(rest.restTimes)
            }
           }, 1000)
        } else {
          return
        }
      })
    })
  }
}