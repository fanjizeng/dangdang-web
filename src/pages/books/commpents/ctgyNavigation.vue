<template>
  <div class="nav-menu">
    <span class="nav-name">{{ ctgyDetail.firstctgyname }}</span>
    <van-icon name="arrow" size="18" />
    <span class="nav-name">{{ ctgyDetail.secctgyname }}</span>
  </div>
  <div class="nav-all">
    <div
      :class="{ 'nav-item': true, 'active-nav': item.thirdctgyid === currencyThird.thirdctgyid }"
      v-for="item in thirdList"
      :key="item.thirdctgyid"
      @click="checkThirdCtgy(item)"
      >
      {{ item.thirdctgyname }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Books from '../service'

const { ctgyDetail, currencyThird, thirdList, findBooksList, getCtgysDetail, getThirdList, checkThirdCtgy } = Books
const route = useRoute()
onMounted(async () => {
  currencyThird.value.thirdctgyid = Number(route.query.thirdCtgyid)
  await getCtgysDetail(currencyThird.value.thirdctgyid)
  currencyThird.value.secondctgyid = Number(ctgyDetail.value.secctgyid)
  getThirdList(ctgyDetail.value.secctgyid)
  findBooksList(currencyThird.value)
})
</script>

<style lang="scss" scoped>
.nav-menu {
  padding: 10px 20px;
  .nav-name {
    font-size: 36px;
    font-weight: 600;
    color: #323233;
  }
}
.nav-all {
  padding: 0px 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  align-items: center;
  .nav-item {
    font-size: 32px;
    font-weight: 500;
    height: 48px;
    line-height: 48px;
  }
  .active-nav {
    background-color: #ed6a0c;
    color: #ffffff;
    border: 1px solid transparent;
    border-radius: 1rem;
    text-align: center;
  }
}
</style>
