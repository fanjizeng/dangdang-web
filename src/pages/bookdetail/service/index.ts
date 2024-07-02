import { ref, Ref } from 'vue'
import { storeToRefs } from 'pinia'
import bookStore from '@/piniastore/books'
import evaluateStore from '@/piniastore/evaluate'
import type { Evaluate } from '@/piniastore/evaluate'
import { getOneItemValuesFrmArr } from '@/utils/commontypes'
class BookDetail {
  static bookStore = bookStore()
  static bookStoreRefs = storeToRefs(BookDetail.bookStore)
  static headerOpactity = ref({ opacity: 0 })
  static goodsRef = ref<HTMLBodyElement | undefined>()
  static picRef = ref<HTMLBodyElement | undefined>()
  static async searchBooksByISBN() {
    await BookDetail.bookStore.findBooksByISBN()
  }
  static bookScroll() {
    const scrollTop = BookDetail.goodsRef.value!.scrollTop
    // const scrollTop = window.pageXOffset || document.body.scrollTop || document.documentElement.scrollTop
    const picHeight = BookDetail.picRef.value!.offsetHeight
    if (scrollTop > 90) {
      BookDetail.headerOpactity.value.opacity = scrollTop / picHeight
    } else {
      BookDetail.headerOpactity.value.opacity = 0
    }
  }
  static init() {
    if (BookDetail.goodsRef.value) {
      BookDetail.goodsRef.value.scrollTop = 0
      BookDetail.setHeaderOpacity(0)
    }
    BookDetail.searchBooksByISBN()
  }
  static setHeaderOpacity(opacity: number) {
    BookDetail.headerOpactity.value.opacity = opacity
  }
}
export default BookDetail

export class EvaluateClass {
  static store = evaluateStore()
  static storeRefs = storeToRefs(EvaluateClass.store)
  static goodEvalNums = ref(0)
  static mediumEvalNums = ref(0)
  static nagativeEvalNums = ref(0)
  static evalRplLst: Ref<Evaluate[]> = ref([])
  static canclRplShowIndx = ref(-1)
  static async searchEvalRplLst() {
    await EvaluateClass.store.findEvalRplLst()
    EvaluateClass.evalRplLst.value = EvaluateClass.store.getEvalRepLst
    EvaluateClass.calEvalDegrees()
  }
  static calEvalDegrees() {
    EvaluateClass.restoreEvalNum()
    const evalDegrees = getOneItemValuesFrmArr(EvaluateClass.store.evalRepLst, 'evaluatedegree')
    console.log('获取', evalDegrees)
    evalDegrees.forEach(evalDegree => {
      if (evalDegree === 1) {
        EvaluateClass.goodEvalNums.value++
      } else if (evalDegree === 2) {
        EvaluateClass.mediumEvalNums.value++
      } else {
        EvaluateClass.nagativeEvalNums.value++
      }
    })
  }
  static restoreEvalNum() {
    EvaluateClass.goodEvalNums.value = 0
    EvaluateClass.mediumEvalNums.value = 0
    EvaluateClass.nagativeEvalNums.value = 0
  }
  static getEvalRplLst(evalDegree: number) {
    EvaluateClass.evalRplLst.value = EvaluateClass.store.evalRepLst
    if(evalDegree !== 0) {
      EvaluateClass.evalRplLst.value = EvaluateClass.evalRplLst.value.filter(evalRpl => {
        return evalRpl.evaluatedegree === evalDegree
      })
    }
  }
  static checkEValRplLst(type: number) {
    EvaluateClass.getEvalRplLst(type)
  }
  static reply($event: Event, index: number) {
    EvaluateClass.canclRplShowIndx.value = index
    EvaluateClass.updateClassName($event, 'reply-panel-show')
    EvaluateClass.controlScrlOrHid('hidden')
  }
  static cancelReply($event: Event) {
    EvaluateClass.canclRplShowIndx.value = -1
    EvaluateClass.updateClassName($event, 'reply-panel')
    EvaluateClass.controlScrlOrHid('scroll')
   }
  static updateClassName($event: Event, className: string) {
    const rplEle = $event.currentTarget as HTMLBodyElement
    const rplPanel = rplEle.parentElement!.nextElementSibling!
    rplPanel.className = className
  }
  static ctrlHeadAndDegree(isShow: boolean) {
    EvaluateClass.store.headAndDegree = isShow
  }
  static controlScrlOrHid(scrollMode: string) {
    const ele = document.querySelector('.contain') as HTMLElement
    if(ele) {
      ele.style.overflowY = scrollMode
    }
  }
}