<template>
  <div class="header" :style="headerOpactity">
    <van-icon name="arrow-left" @click="back"></van-icon>
    <div class="header-wrapper">
      <span @click="switchTab(index)" :class="{ 'item-active': index === activeIndex }" v-for="(item, index) in navList">
        <router-link :to="item.url" replace>{{ item.text }}</router-link>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Books from '../service'

const { headerOpactity } = Books
const router = useRouter()
const activeIndex = ref(0)
const switchTab = (index: number) => {
  activeIndex.value = index
  router.replace(navList[index].url)
}
const back = ()=> {
  router.back()
}
const navList = [
  {
    text: '商品',
    name: 'goods',
    url: '/goods'
  },
  {
    text: '详情',
    name: 'goods',
    url: '/goods'
  },
  {
    text: '评论',
    name: 'evaluate',
    url: '/evaluate'
  },
  {
    text: '相关',
    name: 'evaluate',
    url: '/evaluate'
  }
]
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 99;
  .header-wrapper {
    padding: 20px;
    display: flex;
    justify-content: space-around;
    flex: 1;
    font-size: 32px;
    a {
      color: inherit;
    }
    .item-active {
      border-bottom: 6px solid #dc3a0d;
      color: #dc3a0d;
    }
  }
}
</style>
