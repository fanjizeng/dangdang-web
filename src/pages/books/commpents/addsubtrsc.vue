<template>
  <div class="shopcart">
    <div class="addBtn" v-if="bookitem && bookitem.purcharsenum === 0">
      <div class="inner" @click="addBookToShopCart(bookitem)">添加购物车</div>
    </div>
    <div class="shopcart-operate" v-if="bookitem && bookitem.purcharsenum >= 1">
      <div class="" @click="delCurBookFrmSC(bookitem)">
        <van-icon name="delete-o" v-show="bookitem.purcharsenum === 1" />
      </div>
      <div class="shopcart-icon minus" @click="appOrSubtrBookFrmShopCart(bookitem, $event)" v-show="bookitem.purcharsenum > 1">
        <van-icon name="minus" />
      </div>
      <div class="purchasenum">{{ bookitem.purcharsenum }}</div>
      <div class="shopcart-icon plus" @click="appOrSubtrBookFrmShopCart(bookitem, $event)">
        <van-icon name="plus" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ShopCartClass from '../service/shopcart'

defineProps(['bookitem'])
const { addBookToShopCart, appOrSubtrBookFrmShopCart, delCurBookFrmSC } = ShopCartClass
</script>

<style lang="scss" scoped>
.shopcart {
  width: 100%;
  .addBtn {
    width: 100%;
    background-color: #fef3ed;
    color: #e94039;
    font-size: 28px;
    text-align: center;
    padding: 12px;
    border-radius: 999px;
  }
  &-operate {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
    font-size: 40px;
    gap: 60px;
    .shopcart-icon {
      width: 48px;
      height: 48px;
      font-size: 30px;
      border-radius: 50%;
      border: 2px solid transparent;
      background-color: #1989fa;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fef3ed;
    }
  }
}
</style>
