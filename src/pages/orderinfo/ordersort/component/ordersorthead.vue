<template>
  <div class="order-header">
    <div class="order-search">
      <van-icon class="icon" name="arrow-left" @click="back"></van-icon>
      <van-icon class="icon" name="search"></van-icon>
      <input id="input" type="text" placeholder="搜索我的订单" class="keyword-input" />
    </div>
    <div class="order-status">
      <div
        v-for="(orderinfo, index) in orderinfos"
        :key="index"
        @click="changeTab(index)"
        :class="{
          item_active: activeIndex === index && activeIndex !== 4
        }"
      >{{ orderinfo }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import OrderClass from '../../service'

const { changeTab } = OrderClass
const { activeIndex } = OrderClass.ordStoreToRefs
const router = useRouter()
const back = ()=> {
  router.back()
}
const orderinfos = ['全部订单', '待付款', '待收货', '待评价', '|', '筛选']
</script>

<style lang="scss" scoped>
.order-header {
  margin: 14px 18px;
  .order-search {
    display: flex;
    align-items: center;
    gap: 16px;
    background-color: var(--van-slider-inactive-background);
    border-radius: 120px;
    padding: 18px 20px;
    .icon {
      font-size: 48px;
    }
    #input {
      border: none;
      background-color: transparent;
      font-size: 36px;
      flex: 1;
    }
  }
  .order-status {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 36px;
    padding: 10px 0;
  }
  .item_active {
    color: #f04f54; 
    border-bottom: 1px solid #936e7f;
    padding: 14px 0;
  }
}
</style>
