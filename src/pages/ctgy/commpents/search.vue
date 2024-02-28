<template>
  <div class="head flex-ac">
    <div class="search-contain flex-ac">
      <span class="iconfont icon-sousuo"></span>
      <van-field v-model="searchValue" placeholder="请输入搜索书名" />
      <span class="iconfont icon-saoma"></span>
    </div>
    <van-badge class="head-message" :content="6">
      <span class="iconfont icon-xiaoxi"></span>
    </van-badge>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
const searchValue: Ref<string> = ref('')
</script>

<style lang="scss" scoped>
@import '@/styles/layout.scss';
.content {
  @extend .head;
}
.head-message {
  margin-left: 20px;
  .iconfont {
    color: #333333;
    font-size: 48px;
  }
}
</style>
