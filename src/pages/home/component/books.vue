<template>
  <div class="dangdang-books" ref="dangdangBookRef">
    <van-list class="books-list" v-model:loading="loading" offset="100" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="dangdang-books-wrapper" ref="booksRef">
        <div class="dangdang-books-item" v-for="item in getCurPageBookList" :key="item.ISBN">
          <div class="dangdang-books-pic">
            <img :src="getImg(item.bookpicname)" alt="" class="bookpic" />
          </div>
          <div class="dangdang-books-summary">
            <div class="dangdang-books-title">{{ item.bookname }}</div>
            <div class="dangdang-books-favourable">
              <span class="self-support">自营</span>
              <span class="coupons">券</span>
              <span class="free-shipping">包邮</span>
            </div>
            <div class="price-and-addcart">
              <span class="price">&yen;{{ (item.originalprice * item.discount).toFixed(2) }}</span>
              <span class="shopcart">
                <van-icon name="shopping-cart-o" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import getImg from '@/utils/imgUtils'
import HomeClass from '../service/index'

const { findBookWithPager, onLoad, headerScroll, loading, finished, storeToRefs } = HomeClass
const { getCurPageBookList } = storeToRefs
const dangdangBookRef = ref<HTMLBodyElement>(undefined)
</script>

<style lang="scss" scoped>
.dangdang-books {
  background-color: #e0dddd;
  padding-top: 12px;
  .books-list {
    height: 800px;
    overflow-y: auto;
  }
  .dangdang-books-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px 12px;
    .dangdang-books-item {
      background-color: #ffffff;
      flex: 1;
      padding: 12px;
      .dangdang-books-pic {
        display: flex;
        justify-content: center;
        height: 380px;
        .bookpic {
          width: 80%;
          height: 90%;
          object-fit: contain;
        }
      }
    }
    .dangdang-books-title {
      font-size: 36px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .dangdang-books-favourable {
      display: flex;
      gap: 10px;
      .self-support {
        display: block;
        height: 54px;
        padding: 8px;
        border-radius: 8px;
        text-shadow: 0 2px #7f7f7f;
        background-color: #eb636d;
        color: #ffffff;
        font-size: 24px;
      }
      .coupons,
      .free-shipping {
        display: block;
        height: 54px;
        padding: 8px;
        border-radius: 8px;
        border: 2px #d06d70 solid;
        background-color: #ffffff;
        color: #7f7f7f;
        box-shadow: 0 0 0 1x #d06d70;
        text-shadow: 0 2px #d06d70;
        font-size: 24px;
      }
    }
    .price-and-addcart {
      display: flex;
      justify-content: space-between;
      margin-right: 8px;
      .price {
        font-size: 40px;
      }
      .shopcart {
        width: 48px;
        height: 48px;
        background-color: #fb4b3c;
        border-radius: 50%;
        color: #ffffff;
        padding: 4px 4px 4px 8px;
        display: flex;
        align-items: center;
        font-size: 32px;
      }
    }
  }
}
</style>
