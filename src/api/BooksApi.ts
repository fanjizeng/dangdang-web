import request from '@/utils/axiosUtil'

interface reqBooks {
  thirdctgyid: number
  secondctgyid: number
}
class BooksAPI {
  static api: BooksAPI = new BooksAPI()
  getBooksByThirdId(reqBooks: reqBooks) {
    return request.get(`/dang/booksmodule/findBooksByThirdCtgyId`, false, reqBooks)
  }
}

export default BooksAPI.api