<template>
  <div class="wrap">
    <head-search></head-search>
    <div class="contain">
      <second-ctgy></second-ctgy>
      <third-ctgy></third-ctgy>
    </div>
    <Bottom></Bottom>
  </div>
</template>

<script setup lang="ts">
import headSearch from './commpents/search.vue'
import secondCtgy from './commpents/secondCtgy.vue'
import thirdCtgy from './commpents/thirdCtgy.vue'
import Bottom from '@/components/bottom/index.vue'
// import FstToThrdCtgy from './service'
import FstToThrdCtgy from './piniaservice'

const { getFirstCtgys } = FstToThrdCtgy
getFirstCtgys()
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: auto;
  .contain {
    display: flex;
    background-color: #ebedf0;
    height: calc(100% - 132px);
  }
}
</style>
