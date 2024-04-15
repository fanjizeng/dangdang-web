<template>
  <div class="shopcart-content">
    <div class="content-left">
      <van-badge :content="totalCount">
        <van-icon name="shopping-cart-o" />
      </van-badge>
    </div>
    <div class="content-right">
      <span class="cost">¥{{ totalPrice }}</span>
      <span class="pay-font">去支付<van-icon name="arrow" /></span>
    </div>
    <div class="ball-container">
      <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
        <div class="ball" v-show="ball.showorhidden">
          <div class="inner"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import ShopCartClass from '../service/shopcart'

const { beforeDrop, dropping, afterDrop, ball } = ShopCartClass
const { totalCount, totalPrice } = ShopCartClass.refreshShopCartList()
</script>

<style lang="scss" scoped>
.shopcart-content {
  position: relative;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 110px;
  padding: 0 40px;
  gap: 90px;
  .content-left {
    font-size: 56px;
  }
  .content-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background-color: #fdc830;
    border-radius: 999px;
    border: 1px solid transparent;
    font-size: 40px;
    height: 80px;
    .cost {
      font-weight: 800;
    }
    .pay-font {
      font-size: 36px;
    }
  }
  .ball-container {
    position: absolute;
    bottom: 20px;
    left: 80px;
    .ball {
      width: 36px;
      height: 36px;
      transition: all 1s cubic-bezier(0.48, -0.35, 0.78, 0.45);
      .inner {
        background-color: #1989fa;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        transition: all 1s linear;
      }
    }
  }
}
</style>
