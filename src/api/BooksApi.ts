import request from '@/utils/axiosUtil'

export interface reqBooks {
  thirdctgyid: number | null
  secondctgyid: number
  sortField: string
  ascOrDesc: 'asc' | 'desc'
}
class BooksAPI {
  static api: BooksAPI = new BooksAPI()
  getBooksByThirdId(reqBooks: reqBooks) {
    return request.get('/dang/booksmodule/findBooksByThirdCtgyId', false, reqBooks)
  }
  findBooksByAutoCompKeyword(autoCompKeyword: string) {
    return request.get(`/dang/booksmodule/findBooksByAutoCompKeyword/${autoCompKeyword}`, false)
  }
  findPublishersByAutoCompKeyword(autoCompKeyword: string) {
    return request.get(`/dang/booksmodule/findPublishersByAutoCompKeyword/${autoCompKeyword}`, false)
  }
  findBksBypublishIds(publishids: number[]) {
    return request.post('/dang/booksmodule//findBksBypublishIds', false, publishids)
  }
  findBooksByISBN(isbn: string) {
    return request.get(`/dang/booksmodule/findBooksByISBN/${isbn}`, false)
  }
  findBookLstWithPager(curPageNo: number) {
    return request.get(`/dang/booksmodule/findBookLstWithPager/${curPageNo}`,false)
  }
}

export default BooksAPI.api