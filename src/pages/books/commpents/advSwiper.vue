<template>
  <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
    <van-swipe-item>
      <img class="swiper-img" :src="getImg('1.png')" alt="">
    </van-swipe-item>
    <van-swipe-item>
      <img class="swiper-img" :src="getImg('2.png')" alt="">
    </van-swipe-item>
    <van-swipe-item>
      <img class="swiper-img" :src="getImg('3.png')" alt="">
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import getImg from '@/utils/imgUtils'
</script>

<style lang="scss" scoped>
.my-swipe {
  margin: 0 20px;
  height: 280px;
  .swiper-img {
    width: 100%;
    height: 100%;
    object-fit:fill;
  }
}
</style>
