import type { BookInfo, CurPageDataType } from './state'
import { defineStore } from 'pinia'
import BooksApi, { reqBooks } from '@/api/BooksApi'
import { AxiosResponse } from 'axios'
import storage from '@/utils/goodStorageUtil'
import searchStore from '@/piniastore/search'

function hasProps(obj: Record<string, any>) {
  return Boolean(Object.getOwnPropertyNames(obj).length)
}

export default defineStore('bookStore', {
  state: () => {
    return initState
  },
  getters: {
    getBookList(state): BookInfo[] {
      return state.bookList.length > 0 ? state.bookList : storage.get('bookList')
    },
    getCurPageBookList(state): BookInfo[] {
      return state.curPageAllData.curPageDataList
    },
    getCurPageAllData(state): CurPageDataType {
      return state.curPageAllData
    },
    getISBN(state): string {
      return state.isbn.length > 0 ? state.isbn : storage.get('isbn')
    },
    getOperate(state) {
      return state.operate
        ? state.operate
        : storage.get('operate')
    },
    getBookDetail(state): BookInfo {
      return hasProps(state.bookDetail) ? state.bookDetail : storage.get('bookDetail')
    },
    getCurrentBook(state) {
      return state.bookDetail
        ? state.bookDetail
        : storage.get('bookDetail')
    },
    getAutoCompKeyword() {
      return searchStore().getAutoCompKeyword
    }
  },
  actions: {
    async findBooksList(req: reqBooks) {
      const res: AxiosResponse<BookInfo[]> = await BooksApi.getBooksByThirdId({
        thirdctgyid: req.thirdctgyid,
        secondctgyid: req.secondctgyid,
        sortField: req.sortField,
        ascOrDesc: req.ascOrDesc
      })
      res.data = res.data.map((book) => {
        book.discountprice = (book.originalprice * book.discount).toFixed(2)
        return book
      })
      this.bookList = res.data
      storage.set('bookList', this.bookList)
    },
    storeBookList(bookList: BookInfo[]) {
      this.bookList = bookList
    },
    storeOperate(operate: Operate) {
      this.operate = operate
    },
    storeBookDetail(book: BookInfo) {
      this.bookDetail = book
    },
    storeISBN(isbn: string) {
      this.isbn = isbn
      storage.set('isbn', isbn)
    },
    async findBookWithPager() {
      if (this.curPageAllData.curPageNo <= this.curPageAllData.totalPageNumber) {
        this.curPageAllData.curPageNo = this.curPageAllData.curPageNo + 1
        const res: AxiosResponse<CurPageDataType> = await BooksApi.findBookLstWithPager(this.curPageAllData.curPageNo)
        // 第一页
        if (this.curPageAllData.curPageDataList.length === 0) {
          this.curPageAllData = res.data
        } else {
          const { curPageNo, totalPageNumber } = res.data
          this.curPageAllData.curPageDataList.push(...res.data.curPageDataList)
          Object.assign(this.curPageAllData, { curPageNo, totalPageNumber })
        }
        return false
      }else {
        return true
      }
    },
    async findBooksByAutoCompKeyword(autoCompKeyword: string) {
      const res: AxiosResponse<BookInfo[]> = await BooksApi.findBooksByAutoCompKeyword(autoCompKeyword)
      this.bookList = res.data
      storage.set('bookList', res.data)
    },
    async findPublishersByAutoCompKeyword() {
      const res = await BooksApi.findPublishersByAutoCompKeyword(this.getAutoCompKeyword)
      this.publisherList = res.data
    },
    async findBksBypublishIds(publishids: number[]) {
      const bookList = await BooksApi.findBksBypublishIds(publishids)
      this.bookList = bookList.data
      storage.set('bookList', bookList.data)
    },
    async findBooksByISBN() {
      const bookDetail = await BooksApi.findBooksByISBN(this.getISBN)
      this.bookDetail = bookDetail.data
      storage.set('bookDetail', bookDetail.data)
    }
  }
})
export enum Operate {
  INIT = 0,
  THRDCTGYID = 1,
  AUTOCOMPKEYWORD = 2
}
interface publisherType {
  publishid: number
  publishername: string
}
type initStateType = {
  isbn: string
  bookList: BookInfo[]
  bookDetail: BookInfo,
  curPageAllData: CurPageDataType
  operate: Operate
  publisherList: publisherType[]
  headerRef: HTMLBodyElement | undefined
  headerOpacity: { opacity: number}
  headerHeight: number
}
const initState: initStateType = {
  bookList: [],
  operate: Operate.INIT,
  publisherList: [],
  bookDetail: {} as BookInfo,
  isbn: '',
  curPageAllData: {
    curPageNo: 0,
    curPageDataList: [],
    totalPageNumber: 0
  },
  headerRef: undefined,
  headerOpacity: {
    opacity: 1
  },
  headerHeight: 0
}