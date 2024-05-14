<template>
  <div class="shopcart">
    <div class="addBtn" v-if="bookitem && bookitem.purcharsenum === 0">
      <div class="inner" @click="addBookToShopCart(bookitem)">添加购物车</div>
    </div>
    <div class="shopcart-operate gapL" v-if="bookitem && bookitem.purcharsenum >= 1">
      <div v-show="bookitem.purcharsenum === 1"  class="" @click="delCurBookFrmSC(bookitem)">
        <van-icon name="delete-o"/>
      </div>
      <div class="shopcart-icon minus" @click="appOrSubtrBookFrmShopCart(bookitem, $event)" v-show="bookitem.purcharsenum > 1">
        <van-icon name="minus" />
      </div>
      <div class="purchasenum">{{ bookitem.purcharsenum }}</div>
      <div class="shopcart-icon plus" @click="appOrSubtrBookFrmShopCart(bookitem, $event)">
        <van-icon name="plus" />
      </div>
    </div>
    <div class="shopcart-operate gapM" v-else-if="shopcart && shopcart.bookisbn">
      <div v-show="shopcart.purcharsenum === 1"  class="" @click="delCurBookInSC(shopcart)">
        <van-icon name="delete-o"/>
      </div>
      <div class="shopcart-icon minus" @click="appOrSubtrBookInShopCart(shopcart, $event)" v-show="shopcart.purcharsenum > 1">
        <van-icon name="minus" />
      </div>
      <div class="purchasenum">{{ shopcart.purcharsenum }}</div>
      <div class="shopcart-icon plus" @click="appOrSubtrBookInShopCart(shopcart, $event)">
        <van-icon name="plus" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ShopCartClass from '../service/shopcart'

defineProps(['bookitem', 'shopcart'])
const { addBookToShopCart, appOrSubtrBookFrmShopCart, delCurBookFrmSC, appOrSubtrBookInShopCart, delCurBookInSC } = ShopCartClass
</script>

<style lang="scss" scoped>
.shopcart {
  // width: 100%;
  .addBtn {
    width: 100%;
    background-color: #fef3ed;
    color: #e94039;
    font-size: 28px;
    text-align: center;
    padding: 12px;
    border-radius: 999px;
  }
  .gapL {
    gap: 60px;
  }
  .gapM {
    gap: 40px;
  }
  &-operate {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
    font-size: 40px;
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
