<template>
  <div class="goods" ref="goodsRef" v-if="getBookDetail">
    <div class="left-arrow">
      <van-icon class="arrow-img" name="arrow-left" />
    </div>
    <div class="pic" ref="picRef">
      <img :src="getImg(bookStore.bookDetail.bookpicname)" alt="" />
    </div>
    <div class="goods-detail">
      <div class="price-detail">
        <div class="favourable">
          <span class="discount-price">
            <strong class="symbol">&yen;</strong>
            <strong class="discountprice">{{ (getBookDetail.originalprice * getBookDetail.discount).toFixed(2) }}</strong>
          </span>
          <span class="discount-condition">
            <span class="innner">每满100减50</span>
          </span>
          <span class="jiangjia">
            <van-icon name="cash-o" />
          </span>
        </div>
        <div class="other">
          <span class="original-price">定价&yen;{{ getBookDetail.originalprice }}</span>
          <span class="discount">{{ getBookDetail.discount }} 折</span>
          <span class="reduction-notice">降价通知</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="fullminus">
        <div class="fullminus-item">
          <div class="fullminus-item-desc">
            <strong class="symbol">&yen;</strong>
            <span class="integerpart">10</span>
            <span class="sale-price">满99</span>
          </div>
          <div class="fullminus-item-get">领</div>
          <span class="radius-up"></span>
          <span class="radius-down"></span>
          <span class="connect-line-1"></span>
          <span class="connect-line-2"></span>
          <span class="connect-line-3"></span>
        </div>
        <div class="extra-item-1">
          <span class="yuan-field"> N元场</span>
          <span class="discount"> 3月49元5件 & 88元10件</span>
          <span class="collect-coupons">
            领券
            <van-icon name="arrow" />
          </span>
        </div>
        <div class="extra-item-1">
          <span class="yuan-field"> 满额减</span>
          <span class="discount"> 每满¥1000元减50元</span>
          <span class="collect-coupons">
            领券
            <van-icon name="arrow" />
          </span>
        </div>
        <div class="book-brief">
          <div class="descr">
            <span class="ziying">当当自营</span>
            <span class="book-name">{{ getBookDetail.bookname }}</span>
          </div>
          <div class="book-introduce">
            本套丛书是特别为中国学生精心打造，量身定制的“新阅读”知识成长计划。它以先进的教学理念
          </div>
          <div class="book-introduce">
            本套丛书是特别为中国学生精心打造，量身定制的“新阅读”知识成长计划。它以先进的教学理念
          </div>
          <div class="book-introduce">
            本套丛书是特别为中国学生精心打造，量身定制的“新阅读”知识成长计划。它以先进的教学理念
          </div>
          <div class="book-introduce">
            本套丛书是特别为中国学生精心打造，量身定制的“新阅读”知识成长计划。它以先进的教学理念
          </div>
          <div class="book-introduce">
            本套丛书是特别为中国学生精心打造，量身定制的“新阅读”知识成长计划。它以先进的教学理念
          </div>
          <div class="book-introduce">
            本套丛书是特别为中国学生精心打造，量身定制的“新阅读”知识成长计划。它以先进的教学理念
          </div>
          <div class="book-introduce">
            本套丛书是特别为中国学生精心打造，量身定制的“新阅读”知识成长计划。它以先进的教学理念
          </div>
          <div class="book-introduce">
            本套丛书是特别为中国学生精心打造，量身定制的“新阅读”知识成长计划。它以先进的教学理念
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Books from '../service'
import getImg from '@/utils/imgUtils'
const { bookStore, picRef, goodsRef, init, bookScroll} = Books
const { getBookDetail } = bookStore
init()
onMounted(()=> {
  window.addEventListener('scroll', bookScroll, true)
})
onUnmounted(()=> {
  window.removeEventListener('scroll', bookScroll, true)
})
</script>

<style lang="scss" scoped>
.goods {
  width: 100%;
  position: relative;
  overflow-y: auto;
  height: 100vh;
  .left-arrow {
    position: absolute;
    opacity: 0.4;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background-color: #999999;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 40px;
    top: 20px;
    .arrow-img {
      font-size: 48px;
    }
  }
  .pic {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 600px;
    img {
      width: 90%;
      height: 80%;
      object-fit: contain;
    }
  }
  .goods-detail {
    width: 100%;
    min-height: 800px;
    background-image: linear-gradient(#ff5244 35%, #ffc3bc, #fff);
    box-shadow: 0rem -0.01rem 0.01rem 0.01rem gainsboro;
    border-radius: 24px 24px 0 0;
    .price-detail {
      padding: 10px 20px;
      color: #ffffff;
      .favourable {
        position: relative;
        .discount-price {
          font-size: 32px;
          margin-right: 40px;
        }
        .discount-condition {
          display: inline-block;
          border: 2px solid #ffffff;
          font-size: 28px;
          border-radius: 8px;
          padding: 4px 16px;
          text-shadow: 0 0 16px gray;
          box-shadow: 0 2px 6px 2px #ffffff inset;
        }
        .jiangjia {
          position: absolute;
          top: 10px;
          right: 30px;
        }
      }
      .other {
        position: relative;
        margin-top: 14px;
        font-size: 28px;
        .original-price {
          text-decoration: line-through;
          margin-right: 40px;
        }
        .reduction-notice {
          position: absolute;
          top: 4px;
          right: 3 0px;
        }
      }
    }
    .line {
      height: 12px;
      background-color: #e94230;
      margin: 0 16px;
      border-radius: 4px;
    }
    .fullminus {
      background-image: linear-gradient(#ffc3bc 5%, #fff 30%, #fff 30%, #fff 30%);
      position: relative;
      margin: 0 24px;
      top: -6px;
      padding: 20px;
      &-item {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 28px;
        font-size: 28px;
        color: #ffffff;
        position: relative;
        &-desc,
        &-get {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ff5347;
          border-radius: 8px;
          padding: 10px 14px;
        }
        &-desc {
          width: 180px;
          box-shadow: -4px 0 12px 0 black;
          .sale-price {
            text-wrap: nowrap;
          }
          .symbol {
            font-size: 36px;
          }
          .integerpart {
            font-size: 36px;
          }
        }
        &-get {
          width: 100px;
          box-shadow: 4px 0 12px 0 black;
        }
        .radius-up,.radius-down {
          width: 28px;
          height: 10px;
          position: absolute;
          border: 4px solid #ff5347;
          left: 180px;
          border-top: none;
          border-bottom-left-radius: 50% 100%;
          border-bottom-right-radius: 50% 100%;
        }
        .radius-up {
          top: 12px;
        }
        .radius-down {
          bottom: 12px;
          transform: rotate(180deg);
        }
        .connect-line-1,
        .connect-line-2,
        .connect-line-3 {
          width: 28px;
          height: 2px;
          position: absolute;
          border-top: 2px solid #ff5347;
          left: 180px;
        }
        .connect-line-1 {
          top: 26px;
        }
        .connect-line-2 {
          top: 36px;
        }
        .connect-line-3 {
          top: 45px;
        }
      }
      .extra-item-1,
      .extra-item-2 {
        display: flex;
        align-items: center;
        gap: 20px;
        height: 80px;
        font-size: 28px;
        margin-top: 10px;
        .yuan-field {
          background-color: #f6e8e7;
          width: 120px;
          padding: 6px 15px;
          white-space: nowrap;
          text-align: center
        }
        .discount {
          flex: 1;
        }
        .collect-coupons {
          width: 80px;
          color: #e24a56;
          white-space: nowrap;
          font-weight: 500;
        }
      }
      .book-brief {
        margin-top: 10px;
        .descr {
          display: flex;
          align-items: baseline;
          height: 120px;
          gap: 20px;
          .ziying {
            background-color: #f34949;
            color: #ffffff;
            width: 150px;
            border-radius: 8px;
            font-size: 32px;
            white-space: nowrap;
            text-align: center;
            padding: 6px 10px;
          }
          .book-name {
            font-size: 32px;
            font-weight: bolder;
          }
        }
        .book-introduce {
          font-size: 28px;
          color: #999999;
        }
      }
    }
  }
}
</style>
