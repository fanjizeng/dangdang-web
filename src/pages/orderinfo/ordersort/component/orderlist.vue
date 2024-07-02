<template>
  <div class="order" v-if="getOrdList">
    <div class="order-list" v-for="(item, index) in getOrdList" :key="index">
      <div class="order-status">
        <img :src="getImg('dangdang.png')" alt="" class="img" />
        <span>当当自营</span>
        <span> {{ item.orderstatus_ }} </span>
        <van-icon class="delete-icon" name="delete"></van-icon>
      </div>
      <div class="order-submit-info" v-if="item.orderstatus === 1">
        <div>订单提交成功</div>
        <div>{{ item.ordertime }}</div>
      </div>
      <div class="order-detail-list" v-for="detailItem in item.orderDetailLst" :key="detailItem.orderid">
        <div class="book-pic">
          <img :src="getImg(detailItem.bookpicname)" alt="" class="img" />
        </div>
        <div class="book-name-num">
          <div class="book-name">{{ detailItem.bookname }}</div>
          <div class="book-num">x {{ detailItem.purcharsenum }}</div>
        </div>
        <div class="book-numandprice">
          <span>共{{ detailItem.purcharsenum }}件商品</span>
          <span>需付款：</span>
          <span>&yen;{{ detailItem.bookprice }}</span>
        </div>
        <div class="other">
          <div class="cut-down" v-if="item.orderstatus === 1">
            <van-icon name="clock-o" />
            <span>支付结束：</span>
            <span class="countdowntime" v-html="item.countDownTime"></span>
          </div>
          <div class="pay-or-cancelord">
            <button class="cancel-order">取消订单</button>
            <button class="immidate-pay">立即支付</button>
          </div>
        </div>
      </div>
      <dov class="empty-order"></dov>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import getImg from '@/utils/imgUtils'
import OrderClass from '../../service'
const { findCurUsrOrdAndOrdDetail } = OrderClass.ordStore
const { loopCutDownTime } = OrderClass
findCurUsrOrdAndOrdDetail()
const { getOrdList } = OrderClass.ordStoreToRefs
onMounted(() => {
  loopCutDownTime()
})
</script>

<style lang="scss" scoped>
.order {
  width: 100%;
  padding: 10px 20px;
  .order-list {
    width: 100%;
    .order-status {
      display: flex;
      align-items: center;
      font-size: 36px;
      .img {
        width: 60px;
        height: 60px;
      }
      span:nth-child(2) {
        margin-left: 18px;
        margin-right: auto;
        color: #333333;
        font-weight: 600;
      }
      span:nth-child(3) {
        color: #989898;
      }
      .delete-icon {
        color: #989898;
        margin-left: 20px;
      }
    }
    .order-submit-info {
      font-size: 32px;
      line-height: 56px;
    }
    .order-detail-list {
      display: grid;
      height: 400px;
      width: 100%;
      padding: 8px 0;
      grid-template-columns: [col1]1fr[col2] 1fr[col3] 1fr[col4] 1fr[col5] 1fr[col6] 1fr[col7] 1fr[col8];
      grid-template-rows: [row1]1fr[row2] 1fr[row3] 1fr[row4] 1fr[row5];
      .book-pic {
        grid-area: 1/1/3/3;
        .img {
          width: 180px;
          height: 160px;
          object-fit: contain;
        }
      }
      .book-name-num {
        grid-area: 1/3/3/8;
        display: grid;
        grid-template-rows: 1fr 1fr;
        height: 180px;
        font-size: 36px;
        .book-num {
          align-self: flex-end;
        }
      }
      .book-numandprice {
        grid-area: 3/1/4/8;
        font-size: 36px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 0;
        gap: 16px;
      }
      .other {
        grid-area: 5/1/4/8;
        display: flex;
        align-items: center;
        justify-content: space-between;
        white-space: nowrap;
        .cut-down {
          font-size: 32px;
          .countdowntime {
            white-space: nowrap;
          }
        }
        .pay-or-cancelord {
          display: flex;
          align-items: center;
          gap: 18px;
          .cancel-order {
            border: none;
            border-radius: 99px;
            background-color: #989898;
            font-size: 32px;
            padding: 8px 20px;
          }
          .immidate-pay {
            border: none;
            border-radius: 99px;
            background-color: #ed6a0c;
            font-size: 32px;
            padding: 8px 20px;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
