import { ref, Ref } from 'vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import CtgyStore from '@/piniastore/ctgy'
import BookStore from '@/piniastore/books'
import ctgyApi from '@/api/CtgyApi'

interface thirdCtgyDetail {
  thirdctgyid: number
  thirdctgyname: string
  secctgyid: number
  secctgyname: string
  firstctgyname: string
  firstCtgyId: number
}
interface thirdCtgyList {
  thirdctgyid: number
  thirdctgyname: string
  secctgyid: number
}

class Books {
  static store = CtgyStore()
  static storeRefs = storeToRefs(Books.store)
  static bookStore = BookStore()
  static storeBookRefs = storeToRefs(Books.bookStore)
  static ctgyDetail: Ref<thirdCtgyDetail> = ref({}) as Ref<thirdCtgyDetail>
  static thirdList: Ref<thirdCtgyList[]> = ref([]) as Ref<thirdCtgyList[]>
  static currencyThirdId: Ref<number> = ref(0)
  static goBack() {
    router.back()
  }
  static async getCtgysDetail(firstctgyid: number) {
    const res = await ctgyApi.getCtgyDetail(firstctgyid)
    Books.ctgyDetail.value = res.data
  }
  static async getThirdList(secctgyid: number) {
    const res = await ctgyApi.getThirdBySecId(secctgyid)
    Books.thirdList.value = res.data
    Books.thirdList.value.unshift({
      secctgyid: 0,
      thirdctgyid: 0,
      thirdctgyname: '全部'
    })
  }
  static async findBooksList(thirdctgyid: number) {
    await Books.bookStore.findBooksList(thirdctgyid)
  }
  static checkThirdCtgy(thirdctgyid: number) {
    Books.currencyThirdId.value = thirdctgyid
    Books.findBooksList(thirdctgyid)
  }
}
export default Books