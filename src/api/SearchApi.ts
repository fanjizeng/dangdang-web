import request from '@/utils/axiosUtil'

class SearchAPI {
  static searchAPI: SearchAPI = new SearchAPI()
  addOrUpdateHistoryKeyword(historyKeyword: string) {
    const query = { 'historyKeyword': historyKeyword }
    return request.post('/dang/searchmodule/addOrUpdateHistoryKeyword', false, query)
  }
  searchKeywords(key: string) {
    return request.get(`/dang/searchmodule/searchKeywords/${key}`, false)
  }
  searchDecovery() {
    return request.get('/dang/searchmodule/searchDecovery', false)
  }
  searchHistoryList() {
    return request.get('/dang/searchmodule/searchHistoryList', false)
  }
  deleteSearchDecovery() {
    return request.get('/dang/searchmodule/deleteSearchDecovery', false)
  }
  deleteSearchHistory() {
    return request.get('/dang/searchmodule/deleteSearchHistory', false)
  }
}

export default SearchAPI.searchAPI