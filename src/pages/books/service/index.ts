import { ref, Ref } from 'vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { BookInfo, thirdCtgyList } from '@/piniastore/books/state'
import { reqBooks } from '@/api/BooksApi'
import CtgyStore from '@/piniastore/ctgy'
import BookStore from '@/piniastore/books'
import ctgyApi from '@/api/CtgyApi'
import ShopCart from './shopcart'

interface thirdCtgyDetail {
  thirdctgyid: number
  thirdctgyname: string
  secctgyid: number
  secctgyname: string
  firstctgyname: string
  firstCtgyId: number
}

class Books {
  static store = CtgyStore()
  static storeRefs = storeToRefs(Books.store)
  static bookStore = BookStore()
  static storeBookRefs = storeToRefs(Books.bookStore)
  static ctgyDetail: Ref<thirdCtgyDetail> = ref({}) as Ref<thirdCtgyDetail>
  static thirdList: Ref<thirdCtgyList[]> = ref([]) as Ref<thirdCtgyList[]>
  static currencyThird: Ref<reqBooks> = ref({
    sortField: '',
    ascOrDesc: 'desc'
  } as reqBooks)
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
      secctgyid: Books.ctgyDetail.value.secctgyid,
      thirdctgyid: null,
      thirdctgyname: '全部'
    })
  }
  static async findBooksList(reqBooks: reqBooks) {
    await Books.bookStore.findBooksList(reqBooks)
    await ShopCart.findCurUserShopCartLst()
    Books.uptBookNumWithSCLstNum()
  }
  static checkThirdCtgy(third: thirdCtgyList) {
    Books.currencyThird.value.thirdctgyid = third.thirdctgyid,
      Books.currencyThird.value.secondctgyid = third.secctgyid
    Books.store.storeCtgy(third)
    Books.findBooksList(Books.currencyThird.value)
  }
  static sortBook(sortField: string) {
    Books.currencyThird.value.sortField = sortField
    if (sortField === 'originalprice') {
      Books.currencyThird.value.ascOrDesc = Books.currencyThird.value.ascOrDesc === 'desc' ? 'asc' : 'desc'
    }
    Books.findBooksList(Books.currencyThird.value)
  }
  static updateBookNum(bookNum: number, curbookisbn?: string) {
    const booklist = Books.bookStore.getBookList
    let book: BookInfo
    for (let i = 0; i < booklist.length; i++) {
      book = booklist[i]
      if (curbookisbn && curbookisbn === book.ISBN) {
        book.purcharsenum = bookNum
        break
      } else if( !curbookisbn ) {
        book.purcharsenum = bookNum
      }
    }
    return booklist
  }
  static uptBookNumWithSCLstNum() {
    const booklist = Books.updateBookNum(0)
    ShopCart.uptBookNumWithSCLstNum(booklist)
  }
}
export default Books