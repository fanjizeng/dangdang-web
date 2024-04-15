import { BookInfo } from './state'
import { defineStore } from 'pinia'
import BooksApi, { reqBooks } from '@/api/BooksApi'
import { AxiosResponse } from 'axios'
import goodStorage from 'good-storage'

export default defineStore('bookStore', {
  state: () => {
    return {
      bookList: [] as BookInfo[]
    }
  },
  getters: {
    getBookList(state): BookInfo[] {
      return state.bookList.length > 0
        ? state.bookList
        : goodStorage.get('bookList')
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
      goodStorage.set('bookList', this.bookList)
    },
    storeBookList(bookList: BookInfo[]) {
      this.bookList = bookList
    }
  }
})