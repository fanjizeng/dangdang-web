<template>
  <div class="header">
    <van-icon class="back" name="arrow-left" @click="back" />
    <div class="order-text">确认订单</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import router from '@/router'

function back() {
  router.back()
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 10px;
  background-color: #ffffff;
  .order-text {
    flex: 1;
    text-align: center;
    font-size: 36px;
  }
}
</style>
