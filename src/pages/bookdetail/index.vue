<template>
  <div class="bookDetail">
    <Header></Header>
    <router-view></router-view>
    <!-- <Goods></Goods> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from './components/header.vue'
import Goods from './components/goods.vue'
</script>

<style lang="scss" scoped>
.bookDetail {
  height: 100%;
}
</style>
