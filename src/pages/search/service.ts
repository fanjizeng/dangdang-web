import { ref } from 'vue'
import router from '@/router'
import searchStore, { initKeywordVal } from '@/piniastore/search'
import { storeToRefs } from 'pinia'
import bookStore, { Operate } from '@/piniastore/books'
import storage from '@/utils/goodStorageUtil'
import searchAPI from '@/api/SearchApi'
import { showConfirmDialog } from 'vant';

export default class SearchClass {
  static isOpenAutoComplete = ref(false)
  static store = searchStore()
  static bkStore = bookStore()
  static storeRefs = storeToRefs(SearchClass.store)
  static searchKeywords = debounce(async () => {
    const keyword = SearchClass.store.keyword
    if (!keyword) {
      SearchClass.isOpenAutoComplete.value = false
    } else {
      await SearchClass.store.searchKeywords(keyword)
      SearchClass.isOpenAutoComplete.value = true
    }
  }, 400)
  static async init() {
    if(SearchClass.store.historyKeywordList.length <= 0 && !storage.get('historyKeywordList')) {
      await SearchClass.store.searchHistoryList()
    }
    await SearchClass.store.searchDecovery()
  }
  static async searchBookByKey(historyKeyword: string) {
    await SearchClass.store.addOrUpdateHistoryKeyword(historyKeyword)
    SearchClass.isOpenAutoComplete.value = false
    SearchClass.bkStore.storeOperate(Operate.AUTOCOMPKEYWORD)
    SearchClass.store.storeAutoCompKeyword(historyKeyword)
    // router.push({path: '/books'})
    router.back()
  }
  static async resetKeywords() {
    const keyword = SearchClass.store.keyword
    if (keyword === initKeywordVal) SearchClass.store.storeKeyword()
    else SearchClass.isOpenAutoComplete.value = true
  }
  static closeKeywords() {
    const keyword = SearchClass.store.keyword
    if (!keyword) {
      SearchClass.store.storeKeyword(initKeywordVal)
    }
    SearchClass.isOpenAutoComplete.value = false
  }
  static async deleteFind() {
    await searchAPI.deleteSearchDecovery()
    SearchClass.store.searchDecovery()
  }
  static deleteSearch() {
    if(SearchClass.storeRefs.getHistoryKeywordList.value.length <= 0) return
    showConfirmDialog({
      title: '删除搜索',
      message:
        '确认删除全部历史记录？',
    })
      .then(async () => {
        await searchAPI.deleteSearchHistory()
        SearchClass.store.searchHistoryList()
      })
      .catch(() => {
        // on cancel
      });
  }
}

type CommonFunType = (...args: any) => any
function debounce<T extends CommonFunType>(fn: T, wait: number = 200) {
  let timer: any = 0
  return function () {
    if (timer) window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      fn()
      timer = 0
    }, wait)
  }
}