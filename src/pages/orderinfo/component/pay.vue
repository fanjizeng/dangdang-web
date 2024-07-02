<template>
    <div class="pay-method">
      <span class="pay-txt">支付方式</span>
      <span class="pay-type">
        <img class="pay-type-img" :src="getImg('zhifubao.png')" alt="">
        <span class="pay-type-txt">支付宝支付</span>
        <van-icon size="20" name="arrow"></van-icon>
      </span>
    </div>
</template>

<script setup>
import getImg from '@/utils/imgUtils'

</script>

<style lang="scss" scoped>
.pay-method {
  background-color: #ffffff;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  .pay-txt {
    color: #888888;
    font-size: 28px;
  }
  .pay-type {
    display: flex;
    align-items: center;
    .pay-type-img {
      width: 60px;
      height: 60px;
      margin-right: 12px;
    }
    .pay-type-txt {
      font-size: 28px;
      font-weight: 600;
    }
  }
}
</style>