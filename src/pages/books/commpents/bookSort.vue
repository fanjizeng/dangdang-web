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
</template>

<script setup>
import { ref } from 'vue'
import Books from '../service'

const { sortBook, currencyThird } = Books
</script>

<style lang="scss" scoped>
.book-sort {
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
</style>
