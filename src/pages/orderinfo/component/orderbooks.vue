<template>
  <div class="order-book">
    <div class="order-book-tag">
      <img :src="getImg('dangdang.png')" class="img" alt="" />
      <span class="dangdang-own-business">当当自营</span>
    </div>
    <div class="order-book-list" v-if="getSubShkedSCLst">
      <div class="shopcart-book" v-for="(item, index) in getSubShkedSCLst" :key="item.bookisbn">
        <img :src="getImg(item.bookpicname)" class="shopcart-book-img" alt="" />
      </div>
      <div class="leftarrow" v-show="isShowLeftArrow" @click="leftScrollArrow">
        <van-icon name="arrow-left"></van-icon>
      </div>
      <div class="rightarrow" v-show="isShowRightArrow" @click="rightScrollArrow">
        <van-icon name="arrow"></van-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import getImg from '@/utils/imgUtils'
import OrderClass from '../service';

const { setChkedSCLst, storeToRefs, getSubChkSCLst, leftScrollArrow, rightScrollArrow, showLeftArrow, showRightArrow } = OrderClass
setChkedSCLst()
const { getSubShkedSCLst } = storeToRefs
getSubChkSCLst()
const isShowLeftArrow = showLeftArrow()
const isShowRightArrow = showRightArrow()
</script>

<style lang="scss" scoped>
.order-book {
  background-color: #ffffff;
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  .order-book-tag {
    display: flex;
    align-items: center;
    gap: 18px;
    img {
      width: 60px;
      height: 60px;
    }
    .dangdang-own-business {
      font-size: 36px;
      font-weight: 600;
    }
  }
  .order-book-list {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 20px;
    gap: 20px;
    .shopcart-book {
      .shopcart-book-img {
        width: 140px;
        height: 180px;
      }
    }
    .leftarrow, .rightarrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .leftarrow {
      left: 0px;
    }
    .rightarrow {
      right: 0px;
    }
  }
}
</style>
