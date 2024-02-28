import { BookInfo } from './state'
import { defineStore } from 'pinia'
import BooksApi from '@/api/BooksApi'
import { AxiosResponse } from 'axios'
import goodStorage from 'good-storage'

export default defineStore('bookStore', {
  state: () => {
    return {
      bookList: [] as BookInfo[] 
    }
  },
  getters: {
    getBookList(state) {
      return state.bookList.length > 0
        ? state.bookList
        : goodStorage.get('bookList')
    }
  },
  actions: {
    async findBooksList(thirdctgyid: number) {
      const res: AxiosResponse<BookInfo[]> = await BooksApi.getBooksByThirdId({
        thirdctgyid,
        secondctgyid: 3
      })
      this.bookList = res.data
      goodStorage.set('bookList', this.bookList)
    }
  }
})