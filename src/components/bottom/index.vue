<template>
  <div class="bottom-nav-wrapper">
    <div class="bottom-nav">
      <div @click="change(index)" :class="{ 'nav-item': true, 'nav-item_acitve': index === activeIndex }" v-for="(item, index) in bottomNavList" :key="index">
        <van-icon :name="item.icon" />
        <router-link :to="{ path: item.url }" class="bottom-nav-item-title">{{ item.text }}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'
import { bottomNavList } from './compdata'

const activeIndex: Ref<number> = ref(0)
const change = (index: number)=> {
  activeIndex.value = index
}
</script>

<style lang="scss" scoped>
.bottom-nav-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  padding: 10px 0;
  border-top: 2px solid #ebd4ce;
  .bottom-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #aba9ac;
      .bottom-nav-item-title {
        font-size: 28px;
        color: #aba9ac;
      }
    }
    .nav-item_acitve {
      color: #21a2ff;
      .bottom-nav-item-title {
        color: #21a2ff;
      }
    }
  }
}
</style>
