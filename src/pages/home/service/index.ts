import { Ref, ref } from 'vue'
import { storeToRefs } from 'pinia'
import bookStore from '@/piniastore/books'
export default class HomeClass {
  static store = bookStore()
  static storeToRefs = storeToRefs(HomeClass.store)
  static loading = ref(false)
  static finished = ref(false)
  static async findBookWithPager() {
    if (HomeClass.finished.value === true) return
    const finished = await HomeClass.store.findBookWithPager()
    HomeClass.finished.value = finished
  }
  static async onLoad() {
    HomeClass.loading.value = true
    await HomeClass.findBookWithPager()
    HomeClass.loading.value = false
  }
  static init() {
    HomeClass.store.headerHeight = HomeClass.store.headerRef!.offsetHeight
  }
  static getScrollTop() {
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
  }
  static headerScroll() {
    const scrollTop = HomeClass.getScrollTop()
    console.log('出发', scrollTop)
    if(scrollTop >= 0 && scrollTop <= HomeClass.store.headerHeight - 30) {
      HomeClass.store.headerRef!.style.display = 'block'
      HomeClass.store.headerOpacity.opacity = 1 - scrollTop / HomeClass.store.headerHeight
    }else {
      HomeClass.store.headerRef!.style.display = 'none'
    }
  }
}