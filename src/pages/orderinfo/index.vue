<template>
  <div class="order-info">
    <Header></Header>
    <Pay></Pay>
    <OrderBooks></OrderBooks>
    <Bottom></Bottom>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Header from './component/header.vue'
import Pay from './component/pay.vue'
import OrderBooks from './component/orderbooks.vue'
import Bottom from './component/bottom.vue'
</script>

<style lang="scss" scoped>
.order-info {
  width: 100%;
  height: 100vh;
  background-color: #f8f8f8;
  padding: 0 20px;
}
</style>
