import { defineStore } from 'pinia'
import searchApi from '../../api/SearchApi'
import { AxiosResponse } from 'axios'
import storage, { OPTION } from '@/utils/goodStorageUtil'

export const initKeywordVal = '请输入搜索图书关键字'
export default defineStore('searchStore', {
  state: () => {
    return initState
  },
  getters: {
    getKeyword(state) {
      return state.keyword.length > 0
        ? state.keyword
        : storage.get('keyword')
    },
    getHistoryKeywordList(state) {
      return state.historyKeywordList.length > 0 ? state.historyKeywordList : storage.get('historyKeywordList')
    },
    getHistoryKeywordObjList(state): HistoryKeyword[] {
      return state.historyKeywordObjList.length > 0 ? state.historyKeywordObjList : storage.get('historyKeywordObjList')
    }
  },
  actions: {
    storeKeyword(keyword: string = '') {
      this.keyword = keyword
    },
    async searchKeywords(key: string) {
      const keywordList: AxiosResponse<Keyword[]> = await searchApi.searchKeywords(key)
      this.keywordList = keywordList.data
    },
    async addOrUpdateHistoryKeyword(historyKeyword: string) {
      const result: AxiosResponse<number> = await searchApi.addOrUpdateHistoryKeyword(historyKeyword)
      if (result.data > 0) {
        const historyKeywordList = storage.get('historyKeywordList')
        if(!historyKeywordList.includes(historyKeyword)) {
          historyKeywordList.unshift(historyKeyword)
        }
        if(this.historyKeywordList.length > 12) {
          historyKeywordList.pop()
        }
        storage.set('historyKeywordList', historyKeywordList, OPTION.ADDORAPPOBJTOARR)
        this.historyKeywordList = historyKeywordList
      }
    },
    async searchDecovery() {
      const historyKeywordObjList: AxiosResponse<HistoryKeyword[]> = await searchApi.searchDecovery()
      storage.set('historyKeywordObjList', historyKeywordObjList.data)
      this.historyKeywordObjList = historyKeywordObjList.data
    },
    async searchHistoryList() {
      const res: AxiosResponse<HistoryKeyword[]> = await searchApi.searchHistoryList()
      const  historyKeywordList = res.data.map(e=> {
        return e.historykeyword
      })
      storage.set('historyKeywordList', historyKeywordList, OPTION.ADDORAPPOBJTOARR)
      this.historyKeywordList = historyKeywordList
    }
  }
})
export interface Keyword {
  id: number
  keyword: string
}
export interface HistoryKeyword {
  id: number
  historykeyword: string
  clickcount: number
}
type initStateType = {
  keyword: string
  keywordList: Keyword[]
  historyKeywordList: string[]
  historyKeywordObjList: HistoryKeyword[]
}
const initState: initStateType = {
  keyword: initKeywordVal,
  keywordList: [],
  historyKeywordList: [],
  historyKeywordObjList: []
}