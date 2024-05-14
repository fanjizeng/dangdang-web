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
}

export default BooksAPI.api