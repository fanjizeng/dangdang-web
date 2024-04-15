<template>
  <div class="bookdetail">
    <to-search></to-search>
    <adv-swiper></adv-swiper>
    <ctgy-navigation></ctgy-navigation>
    <book-sort></book-sort>
    <book-item></book-item>
    <shop-cart></shop-cart>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import toSearch from './commpents/toSearch.vue'
import advSwiper from './commpents/advSwiper.vue'
import CtgyNavigation from './commpents/ctgyNavigation.vue'
import BookSort from './commpents/bookSort.vue'
import BookItem from './commpents/bookItem.vue'
import ShopCart from './commpents/shopcart.vue'
</script>

<style lang="scss" scoped>
.bookdetail {
  height: 100%;
  overflow-y: auto;
  padding-bottom: 110px;
}
</style>
