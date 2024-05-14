<template>
  <div class="search">
    <div class="search-header">
      <van-icon name="arrow-left" size="24" @click="goBack" />
      <span class="search-header-text">搜索</span>
      <van-icon name="close" size="24" @click="goBack" />
    </div>
    <div class="search-keyword flex-ac">
      <div class="gray-field flex-ac">
        <span class="iconfont icon-sousuo"></span>
        <van-field v-model="keyword" @keyup="searchKeywords" @blur="closeKeywords" @focus="resetKeywords" placeholder="请输入搜索书名" />
      </div>
      <div class="search-btn">搜索</div>
      <div class="autocomplete" v-show="isOpenAutoComplete">
        <div v-if="keywordList.length > 0">
          <div class="autocomplete-item" @mousedown="searchBookByKey(item.keyword)" v-for="(item, index) in keywordList" :key="index">
            <span class="keyword">{{ item.keyword }}</span>
          </div>
        </div>
        <van-empty v-else image-size="220" image="search" description="暂无您想要的内容" />
      </div>
    </div>
    <div class="search-history">
      <div class="search-history-header">
        <span>搜索历史</span>
        <van-icon name="delete-o" size="20" @click="deleteSearch" />
      </div>
      <div class="search-history-items">
        <div class="item" v-for="(item, index) in getHistoryKeywordList">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="search-history">
      <div class="search-history-header">
        <span>搜索发现</span>
        <van-icon name="delete-o" size="20" @click="deleteFind" />
      </div>
      <div class="search-history-items">
        <div class="item" v-for="(item, index) in getHistoryKeywordObjList">
          {{ item.historykeyword }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchClass from './service'

const router = useRouter()
const { isOpenAutoComplete, searchKeywords, closeKeywords, resetKeywords, searchBookByKey, init, deleteFind, deleteSearch } = SearchClass
const { keyword, keywordList, getHistoryKeywordList,  getHistoryKeywordObjList } = SearchClass.storeRefs
const goBack = () => {
  router.back()
}
const historyList = ref(['语文', '数据库原理', '童年一起集结', '语文', '数据库原理', '童年一起集结', '语文', '数据库原理', '童年一起集结'])
const keywords = ref(['语文', '数据库原理', '童年一起集结', '语文', '数据库原理', '童年一起集结', '语文', '数据库原理', '童年一起集结'])
init()
</script>

<style lang="scss" scoped>
.search {
  .search-header {
    width: 100%;
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 36px;
    border-bottom: 2px solid #f6f6f6;
    .search-header-text {
      font-size: 32px;
      font-weight: 600;
    }
  }
  .autocomplete {
    position: absolute;
    top: 88px;
    background-color: #ffffff;
    width: 100vw;
    height: calc(100vh - 188px);
    padding: 20px 10px;
    z-index: 99;
    .autocomplete-item {
      font-size: 32px;
      font-weight: 400;
      padding: 16px 0;
      border-bottom: 2px solid #f6f6f6;
    }
  }
  .search-keyword {
    gap: 24px;
    padding: 12px 24px;
    width: 100%;
    position: relative;
    .gray-field {
      flex: 1;
      background-color: var(--van-slider-inactive-background);
      border-radius: 999px;
      padding: 8px 24px;
    }
    .iconfont {
      font-size: 40px;
    }
    .search-btn {
      width: 80px;
      font-size: 32px;
    }
    .van-field {
      height: 60px;
      border-radius: 2rem;
      font-size: 32px;
      line-height: 40px;
    }
  }
  .search-history {
    width: 100%;
    padding: 0 36px;
    .search-history-header {
      margin: 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 36px;
      font-weight: 500;
    }
    .search-history-items {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-auto-flow: row;
      gap: 24px;
      .item {
        font-size: 24px;
        text-align: center;
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        background-color: #f6f6f6;
        padding: 14px 18px;
        border-radius: 999px;
      }
    }
  }
}
</style>
