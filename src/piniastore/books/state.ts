export interface BookInfo {
  'ISBN': string
  'bookname': string
  'author': string
  'publishid': number
  'publishername': string
  'monthsalecount': number
  'bookpicname': string
  'secondctgyid': number
  'thirdctgyid': number
  'originalprice': number
  'discount': number
  'discountprice': string
  'purcharsenum': number
}

export interface thirdCtgyList {
  thirdctgyid: number | null
  thirdctgyname: string
  secctgyid: number
}

export type CurPageDataType = {
  curPageDataList: BookInfo[]
  totalPageNumber: number
  curPageNo: number
}
