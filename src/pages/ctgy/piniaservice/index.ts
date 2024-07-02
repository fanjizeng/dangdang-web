import { ref, Ref } from 'vue'
import { FirstCtgy, SecondCtgy, ThirdCtgy } from '@/store/ctgy/state'
import ctgyStore from '@/piniastore/ctgy'
import { storeToRefs } from 'pinia'
import router from '@/router'
import booksStore, {Operate} from '@/piniastore/books'

class FstToThrdCtgy {
  static store = ctgyStore()
  static bkStore = booksStore()
  static storeRefs = storeToRefs(FstToThrdCtgy.store)
  static firstCtgyList: Ref<FirstCtgy[]> = ref([])
  static secondCtgyList: Ref<SecondCtgy[]> = ref([])
  static firstCtgyActiveIndex: Ref<number> = ref(1)
  static async getFirstCtgys() {
    await FstToThrdCtgy.store.findFirstCtgyList()
    const { firstCtgyList } = FstToThrdCtgy.store
    const firstId = firstCtgyList?.[0]?.firstCtgyId
    FstToThrdCtgy.searchSec(firstId)
  }
  static changeTab(id: number) {
    FstToThrdCtgy.firstCtgyActiveIndex.value = id
    FstToThrdCtgy.searchSec(id)
  }
  static async searchSec(id: number) {
    await FstToThrdCtgy.store.findSecThrdCtgyList(id)
  }
  static openOrCollapse($event: Event, secondCtgy: SecondCtgy) {
    const currentTarget = <HTMLBodyElement>$event.currentTarget
    const ulPanel = currentTarget.parentElement!
    if (secondCtgy.isReadOpen) {
      secondCtgy.isReadOpen = false
      ulPanel.style.paddingBottom = 0 + 'px'
    } else {
      if (secondCtgy.thirdctgyList.length % 3 === 0) {
        ulPanel.style.paddingBottom = 1.2 + 'rem'
      }
      secondCtgy.isReadOpen = true
    }
  }
  static toBookInfo(thirdCtgy: ThirdCtgy) {
    FstToThrdCtgy.store.storeCtgy(thirdCtgy)
    FstToThrdCtgy.bkStore.storeOperate(Operate.THRDCTGYID)
    router.push({ path: '/books', query: {thirdCtgyid: thirdCtgy.thirdctgyid} })
  }
}
export default FstToThrdCtgy