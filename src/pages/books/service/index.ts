import { ref, Ref } from 'vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { BookInfo, thirdCtgyList } from '@/piniastore/books/state'
import { reqBooks } from '@/api/BooksApi'
import CtgyStore from '@/piniastore/ctgy'
import BookStore, { Operate } from '@/piniastore/books'
import ShopStore from '@/piniastore/shopCart'
import ctgyApi from '@/api/CtgyApi'
import ShopCart from './shopcart'
import { getValArrOfObj } from '@/utils/goodStorageUtil'

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
  static shopStore = ShopStore()
  static storeBookRefs = storeToRefs(Books.bookStore)
  static ctgyDetail: Ref<thirdCtgyDetail> = ref({}) as Ref<thirdCtgyDetail>
  static thirdList: Ref<thirdCtgyList[]> = ref([]) as Ref<thirdCtgyList[]>
  static currencyThird: Ref<reqBooks> = ref({
    sortField: '',
    ascOrDesc: 'desc'
  } as reqBooks)
  static isAutocompSearch = ref(false)
  static isReadyOpen = ref(false)
  static getOperate() {
    Books.isAutocompSearch.value = Books.bookStore.getOperate === Operate.AUTOCOMPKEYWORD ? true : false
  }
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
  static searcnBooks(reqBooks: reqBooks) {
    const operate = Books.bookStore.getOperate
    console.log(operate, '分类')
    if (operate === Operate.AUTOCOMPKEYWORD) Books.findByAutoCompKeyword()
    else Books.findBooksList(reqBooks)
  }
  static async findByAutoCompKeyword() {
    const autoCompKeyword = Books.bookStore.getAutoCompKeyword
    console.log(autoCompKeyword, '不全')
    await Books.bookStore.findBooksByAutoCompKeyword(autoCompKeyword)
    const bookList = Books.bookStore.getBookList
    const ctgy = {
      secctgyid: bookList[0].secondctgyid,
      thirdctgyid: null,
      thirdctgyname: '全部'
    }
    Books.store.storeCtgy(ctgy)
  }
  static async findBooksList(reqBooks: reqBooks) {
    await Books.bookStore.findBooksList(reqBooks)
    const shopcartList = Books.shopStore.ShopCartList
    if (!shopcartList || shopcartList.length === 0) {
      await ShopCart.findCurUserShopCartLst()
    }
    Books.uptBookNumWithSCLstNum()
  }
  static checkThirdCtgy(third: thirdCtgyList) {
    Books.currencyThird.value.thirdctgyid = third.thirdctgyid,
      Books.currencyThird.value.secondctgyid = third.secctgyid
    Books.store.storeCtgy(third)
    Books.findBooksList(Books.currencyThird.value)
  }
  static init() {
    Books.getOperate()
    Books.findPublisersByAutoCompkey()
  }
  static async findPublisersByAutoCompkey() {
    if(Books.bookStore.getOperate === Operate.AUTOCOMPKEYWORD) {
      await Books.bookStore.findPublishersByAutoCompKeyword()
    }
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
      } else if (!curbookisbn) {
        book.purcharsenum = bookNum
      }
    }
    return booklist
  }
  static uptBookNumWithSCLstNum() {
    const booklist = Books.updateBookNum(0)
    ShopCart.uptBookNumWithSCLstNum(booklist)
  }
  static async findBksBypublishIds() {
    const publisherids = getValArrOfObj(Books.bookStore.publisherList, 'publishid')
    await Books.bookStore.findBksBypublishIds(publisherids)
  }
  static openBook(isbn: string) {
    Books.bookStore.storeISBN(isbn)
    router.push({
      path: 'bookdetail'
    })
  }
}
export default Books