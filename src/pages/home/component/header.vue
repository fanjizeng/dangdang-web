<template>
  <div class="header" :stylr="headerOpacity" ref="headerRef">
    <h1 class="header-title">当当</h1>
    <div class="header-content">
      <div class="head flex-ac">
        <div class="search-contain flex-ac" @click="goSearch">
          <span class="iconfont icon-sousuo"></span>
          <van-field :disabled="true" v-model="searchValue" placeholder="请输入搜索书名" />
        </div>
        <div class="head-ellipsis">
          <span class="iconfont icon-shenglvehao"></span>
          <span class="sort-text">分类</span>
        </div>
      </div>
      <div class="header-adv-img">
        <img class="imgadv" src="@/assets/img/adv.png" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import HomeClass from '../service'

const { headerOpacity, headerRef } = HomeClass.storeToRefs
const { init } = HomeClass
const searchValue = ref('')
const showTag = ref(true)
function closeTag () {
  showTag.value = false
}
onMounted(()=> {
  init()
})
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0px;
  z-index: 99;
}
.head {
  width: 100%;
  position: sticky;
  z-index: 99;
  padding: 20px;
  top: 0;
  .search-contain {
    background-color: var(--van-slider-inactive-background);
    .iconfont {
      color: #333333;
      font-size: 40px;
    }
    padding: 0 32px 0 20px;
    border-radius: 1rem;
    border: 2px solid #dcdee0;
    width: 100%;
  }
}
.header-title {
  width: 100%;
  font-size: 48px;
  text-align: center;
  padding: 10px 0;
  margin: 0;
  background-color: #fff;
}
.content {
  @extend .head;
}
.header-content {
  height: 360px;
  width: 100%;
  background-image: linear-gradient(#06086c, #04086c, #e7e7ef);
}
.head-ellipsis {
  margin-left: 20px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  .iconfont {
    color: #dcdee0;
    font-size: 48px;
  }
  .sort-text {
    font-size: 32px;
    color: #dcdee0;
  }
}
.header-adv-img {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  .imgadv {
    width: 98%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
