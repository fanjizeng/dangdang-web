import { ref, Ref } from 'vue'
import { CtgyActions } from '@/store/actions'
import { ctgyGettersProxy } from '@/store/getters'
import { FirstCtgy, SecondCtgy } from '@/store/ctgy/state'

class FstToThrdCtgy {
  static firstCtgyList: Ref<FirstCtgy[]> = ref([])
  static secondCtgyList: Ref<SecondCtgy[]> = ref([])
  static firstCtgyActiveIndex: Ref<number> = ref(1)
  static async getFirstCtgys() {
    await CtgyActions.findFirstCtgyList()
    FstToThrdCtgy.firstCtgyList.value = ctgyGettersProxy.getFirstCtgyList
    const firstId = FstToThrdCtgy.firstCtgyList.value?.[0].firstCtgyId
    FstToThrdCtgy.searchSec(firstId)
  }
  static changeTab(id: number) {
    FstToThrdCtgy.firstCtgyActiveIndex.value = id
    FstToThrdCtgy.searchSec(id)
  }
  static async searchSec(id: number) {
    await CtgyActions.findSecThrdCtgyList(id)
    FstToThrdCtgy.secondCtgyList.value = ctgyGettersProxy.getSecondCtgyList
  }
  static openOrCollapse($event: Event, secondCtgy: SecondCtgy) {
    const currentTarget = <HTMLBodyElement>$event.currentTarget
    const ulPanel = currentTarget.parentElement!
    if (secondCtgy.isReadOpen) {
      secondCtgy.isReadOpen = false
      ulPanel.style.paddingBottom = 0 + 'px'
    } else {
      if(secondCtgy.thirdctgyList.length % 3 === 0) {
        ulPanel.style.paddingBottom = 1.2 + 'rem'
      }
      secondCtgy.isReadOpen = true
    }
  }
}
export default FstToThrdCtgy