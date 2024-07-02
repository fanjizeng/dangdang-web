<template>
  <div class="bookitem" v-for="item in bookList" :key="item.ISBN">
    <img class="book-pic" @click="openBook(item.ISBN)" :src="getImg(item.bookpicname)" />
    <div class="bookinfo">
      <div class="bookinfo-breief"  @click="openBook(item.ISBN)">
        <div class="book-name">{{ item.bookname }}</div>
        <div class="book-author-publs">
          <span class="author spacing">{{ item.author }}</span>
          <span class="separator spacing">|</span>
          <span class="publs spacing">{{ item.publishername }}</span>
        </div>
      </div>
      <div class="bookinfo-other">
        <div class="price">
          <span class="discountPrice spacing">
            <span class="symbol">&yen;</span>
            {{ (item.originalprice * item.discount).toFixed(2) }}
          </span>
          <span class="originprice spacing">&yen;{{ item.originalprice }}</span>
          <span class="discount">{{ item.discount }}折</span>
        </div>
        <div class="give">
          <span class="self-support">自营</span>
          <span class="coupons">券</span>
          <span class="free-shipping">包邮</span>
        </div>
        <div class="monthsalescount">
          <span>月售{{ item.monthsalecount }}</span>
        </div>
        <div class="ranklist">
          <span>图书畅销总排行榜第1名</span>
        </div>
      </div>
      <div class="empty" v-show="show">库存所有书已经售完</div>
      <add-subtrsc :bookitem="item"></add-subtrsc>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import getImg from '@/utils/imgUtils'
import books from '../service'
import AddSubtrsc from './addsubtrsc.vue'

const { storeBookRefs, openBook } = books
const { bookList } = storeBookRefs
const show = ref(false)
</script>

<style lang="scss" scoped>
.bookitem {
  padding: 0 20px 40px;
  display: grid;
  grid-template-columns: 240px auto;
  justify-items: center;
  column-gap: 20px;
  .book-pic {
    width: 100%;
    height: 320px;
    object-fit: contain;
    box-sizing: border-box;
  }
  .bookinfo {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    .book-name {
      font-size: 46px;
      color: #4c4c4c;
    }
    .book-author-publs {
      color: #848484;
      font-size: 28px;
      .spacing {
        margin-right: 16px;
      }
    }
    .bookinfo-other {
      .price {
        .spacing {
          margin-right: 16px;
        }
        .discountprice {
          font-size: 32px;
          color: #e94039;
        }
        .symbol {
          font-size: 32px;
        }
      }
      .discountPrice {
        font-size: 36px;
        font-weight: 500;
        color: #e94039;
      }
      .originprice,
      .discount {
        color: #c6c6c6;
        font-size: 30px;
        text-align: 4px;
      }
      .originprice {
        text-decoration: line-through;
      }
    }
    .give {
      display: flex;
      line-height: 32px;
      justify-content: flex-start;
      gap: 6px;
      font-size: 24px;
      .self-support {
        padding: 0 16px;
        border-radius: 5px;
        text-shadow: 0 1px #7f7f7f;
        background-color: #eb636d;
        color: white;
      }
      .coupons {
        padding: 0 16px;
        border-radius: 5px;
        border: 2px #d06d70 solid;
        background-color: #ffffff;
        color: #7f7f7f;
        text-shadow: 0 1px #d06d70;
      }
      .free-shipping {
        padding: 0 16px;
        border-radius: 5px;
        border: 1px #d06d70 solid;
        background-color: #ffffff;
        color: #7f7f7f;
        text-shadow: 0 1px #d06d70;
      }
    }
    .monthsalescount,
    .ranklist {
      width: 100%;
      color: #db8441;
      font-size: 28px;
      padding-top: 10px;
    }
    .ranklist {
      background-color: #fef3ed;
      padding: 12px;
      white-space: nowrap;
      span {
      }
    }
  }
  .empty {
    font-size: 40px;
  }
}
</style>
