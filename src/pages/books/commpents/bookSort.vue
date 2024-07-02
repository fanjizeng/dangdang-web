<template>
  <ul class="book-sort">
    <li class="sort-item" :class="{ 'currency-sort': currencyThird.sortField === '' }" @click="sortBook('')">综合</li>
    <li class="sort-item" :class="{ 'currency-sort': currencyThird.sortField === 'monthsalecount' }" @click="sortBook('monthsalecount')">销量</li>
    <li class="sort-item" :class="{ 'currency-sort': currencyThird.sortField === 'originalprice' }" @click="sortBook('originalprice')">
      价格
      <span class="ascdesc">
        <van-icon name="arrow-up" v-show="currencyThird.ascOrDesc === 'asc'" />
        <van-icon name="arrow-down" v-show="currencyThird.ascOrDesc === 'desc'" />
      </span>
    </li>
    <li class="sort-item">店铺</li>
    <li class="sort-item">
      筛选
      <van-icon name="filter-o" />
    </li>
  </ul>
  <ul class="autocompsearch_incr" v-show="isAutocompSearch">
    <li class="sort-item">当当发货</li>
    <li class="sort-item">促销</li>
    <li class="publisher sort-item" ref="pblsTabEle" @click="controlPanel">
      出版社
      <span class="down-or-up-arrow">
        <van-icon v-show="!isReadyOpen" name="arrow-down" />
        <van-icon v-show="isReadyOpen" name="arrow-up" />
      </span>
      <div>
        <div class="publisher-panel" ref="publisherPanelRef">
          <div class="publisher-panel-items">
            <div class="publisher-panel-item" v-for="(item,index) in publisherList" :key="index">
              <span>{{ item.publishername}}</span>
              <van-icon name="success" />
            </div>
          </div>
          <div class="confirmOrReset">
            <span class="reset">重制</span>
            <span class="confirm" @click="findBksBypublishIds">搜索</span>
          </div>
          <div class="overlay"></div>
        </div>
      </div>
    </li>
    <li class="sort-item">
      作者
      <span class="down-or-up-arrow">
        <van-icon v-show="!isReadyOpen" name="arrow-down" />
        <van-icon v-show="isReadyOpen" name="arrow-up" />
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import Books from '../service'
import {ref, Ref} from 'vue'
const { sortBook, currencyThird, isAutocompSearch, isReadyOpen, findBksBypublishIds, init } = Books
const { publisherList } = Books.storeBookRefs
const publisherPanelRef: Ref<HTMLBodyElement | undefined> = ref<HTMLBodyElement>()
// getOperate()
init()
function controlPanel() {
  const publisherPanel = publisherPanelRef.value
  const bookdetail = document.querySelector('.bookdetail')
  isReadyOpen.value = !isReadyOpen.value
  if(publisherPanel!.className === 'publisher-panel') {
    bookdetail!.style.overflowY = 'hidden'
    publisherPanel!.className ='publisher-panel-show'
  }else {
    bookdetail!.style.overflowY = 'auto'
    publisherPanel!.className ='publisher-panel'
  }
}
</script>

<style lang="scss" scoped>
.book-sort,.autocompsearch_incr {
  display: flex;
  padding: 10px 20px;
  align-items: center;
  .sort-item {
    font-size: 32px;
    flex: 1;
    color: #323233;
  }
  .currency-sort {
    color: #ed6a0c;
  }
}
.autocompsearch_incr {
  .publisher {
    position: relative;
    .publisher-panel {
      display: none;
    }
    .publisher-panel-show {
      position: absolute;
      top: 56px;
      left: -50vw;
      background-color: #ffffff;
      width: 100vw;
      .publisher-panel-items {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        .publisher-panel-item {
          display: flex;
          align-items: center;
          height: 80px;
          padding: 20px 16px;
        }
      }
      .confirmOrReset {
        border-top: 1px solid #f6f6f6;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 20px;
        .confirm, .reset {
          text-shadow: 0rem 0rem 0.1rem #777;
          background-color: #f94836;
          color: white;
          padding: 10px 16px;
          border-radius: 8px ;
          font-size: 28px;
        }
      }
      .overlay {
        position: absolute;
        width: 100vw;
        background-color: #777;
        height: 100vh;
        z-index: 9999;
        opacity: 0.4;
      }
    }

  }
}
</style>
