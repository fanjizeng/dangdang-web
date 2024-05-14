<template>
  <div class="shopcartlist">
    <div class="header flex-sc">
      <van-icon class="back" name="arrow-left" @click="back"/>
      <input type="checkbox" class="check" v-model="isSelectAll" @click="selectAll()"/>
      <span class="danglabel">当当网</span>
    </div>
    <div class="items" v-for="shopcartitem in getShopCartList" :key="shopcartitem.bookisbn">
      <div class="item">
        <div class="content flex-sc">
          <input type="checkbox" v-model="shopcartitem.checked" @change="checkEveryCheckBox" class="check" />
          <div class="pic">
            <img class="bookimg" :src="getImg(shopcartitem.bookpicname)" alt="" />
          </div>
          <div class="descri">
            <div class="book-title">{{ shopcartitem.bookname }}</div>
            <div class="price flex-sc">
              <span class="curprice">¥{{ shopcartitem.bookprice }}</span>
              <Addsubtrsc :shopcart="shopcartitem"></Addsubtrsc>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cal flex-sc">
      <input type="checkbox" class="check" />
      <span class="checkall">
        全选
      </span>
      <span class="payall">合计：¥{{ totalPrice }}</span>
      <button class="pay">去结算({{ totalCount }})</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import getImg from '@/utils/imgUtils'
import ShopCartClass from '../books/service/shopcart'
import Addsubtrsc from '../books/commpents/addsubtrsc.vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const back = () => {
  router.back()
}
const { isSelectAll, selectAll, checkEveryCheckBox } = ShopCartClass
const { getShopCartList } = ShopCartClass.storeRefs
const { totalCount, totalPrice } = ShopCartClass.refreshShopCartList()
</script>

<style lang="scss" scoped>
.shopcartlist {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 0 16px 120px 20px;
  position: relative;
  .header {
    position: sticky;
    top: 0;
    background-color: #ffffff;
    height: 100px;
    width: 100%;
    gap: 30px;
    .danglabel {
      font-size: 36px;
      font-weight: 600;
    }
  }
  .items {
    padding-bottom: 60px;
    .content {
      gap: 28px;
      .pic {
        width: 260px;
        height: 320px;
        .bookimg {
          width: 100%;
          height: 100%;
          object-fit: fill;
        }
      }
      .descri {
        flex: 1;
        .book-title {
          font-size: 32px;
          height: 320px;
          font-weight: 400;
          color: #000000;
          height: 220px;
        }
        .price {
          .curprice {
            font-size: 36px;
            font-weight: 500;
            color: #e94039;
            margin-right: 20px;
          }
        }
      }
    }
  }
  .cal {
    position: fixed;
    bottom: 0;
    background-color: #ffffff;
    padding: 24px 0;
    width: 100vw;
    height: 120px;
    .checkall {
      font-size: 32px;
      color: #333333;
      margin: 0 20px;
    }
    .payall {
      font-size: 32px;
      color: #000000;
      font-weight: 500;
    }
    .pay {
      flex: 1;
      font-size: 36px;
      color: #ffffff;
      background-color: #ee0a24;
      border: 1px solid transparent;
      border-radius: 999px;
      padding: 20px 0;
      margin-left: 48px;
      margin-right: 32px;
    }
  }
}
.check {
  width: 34px;
  height: 34px;
}
.flex-sc {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
