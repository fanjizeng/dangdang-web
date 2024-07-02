<template>
  <div class="submitto">
    <div class="payable">
      <span class="tag">实付：</span>
      <span class="money">&yen;98</span>
    </div>
    <div class="submitto-order" @click="addOrdAndOrdDetailLst">
      <span>提交订单</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import OrderClass from '../service';

const { addOrdAndOrdDetailLst } = OrderClass
</script>

<style lang="scss" scoped>
.submitto {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 92vw;
  padding: 0 20px;
  display: flex;
  align-items: center;
  .payable {
    width: 56vw;
    height: 100px;
    color: #ffffff;
    background-color: #888888;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 120px;
    border-bottom-left-radius: 120px;
    font-size: 36px;
  }
  .submitto-order {
    width: 40vw;
    height: 100px;
    background-color: #ee0a24;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 120px;
    border-bottom-right-radius: 120px;
    font-size: 36px;
  }
}
</style>
