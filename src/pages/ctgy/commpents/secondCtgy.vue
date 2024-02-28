<template>
  <ul class="content-first">
    <li
      v-for="item in firstCtgyList"
      :key="item.firstCtgyId"
      @click="changeTab(item.firstCtgyId)"
      :class="{ 'first-item': true, 'first-item-active': firstCtgyActiveIndex === item.firstCtgyId }"
    >
      {{ item.firstctgyname }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'
// import FstToThrdCtgy from '../service'
import FstToThrdCtgy from '../piniaservice'

// const { firstCtgyList, firstCtgyActiveIndex, changeTab } = FstToThrdCtgy
const { storeRefs, firstCtgyActiveIndex, changeTab } = FstToThrdCtgy
const { firstCtgyList } = storeRefs
</script>

<style lang="scss" scoped>
.content-first {
  width: 240px;
  flex-basis: 240px;
  height: 100%;
  overflow: auto;
  background-color: #ffffff;
  .first-item {
    text-align: center;
    height: 140px;
    line-height: 140px;
    font-size: 36px;
  }
  .first-item-active {
    color: #ee0a24;
    background-color: #f7f7f7;
    text-shadow: 0 0 0.03rem #dcdee0;
    position: relative;
    &::before {
      content: '|';
      position: absolute;
      left: 0;
    }
  }
}
</style>
