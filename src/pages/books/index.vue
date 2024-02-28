<template>
  <div class="bookdetail">
    <to-search></to-search>
    <adv-swiper></adv-swiper>
    <ctgy-navigation></ctgy-navigation>
    <book-item></book-item>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import toSearch from './commpents/toSearch.vue'
import advSwiper from './commpents/advSwiper.vue'
import CtgyNavigation from './commpents/ctgyNavigation.vue';
import BookItem from './commpents/bookItem.vue'
</script>

<style lang="scss" scoped>
.bookdetail {
  height: 100%;
  overflow-y: auto;
}
</style>
