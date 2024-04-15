<template>
  <div class="head flex-ac">
    <van-icon name="arrow-left" @click="goBack" />
    <div class="search-contain flex-ac">
      <span class="iconfont icon-sousuo"></span>
      <div class="tosearch-keyword" v-if="showTag">
        {{ getThirdCtgy.thirdctgyname }}
        <van-icon name="cross" @click="closeTag" />
      </div>
      <van-field :disabled="showTag" v-model="searchValue" placeholder="请输入搜索书名" />
    </div>
    <div class="head-ellipsis">
      <span class="iconfont icon-shenglvehao"></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Books from '../service'

const searchValue = ref('')
const showTag = ref(true)
const { storeRefs, goBack } = Books
function closeTag () {
  showTag.value = false
}
const { getThirdCtgy } = storeRefs
</script>

<style lang="scss" scoped>
@import '@/styles/layout.scss';
.content {
  @extend .head;
}
.head-ellipsis {
  margin-left: 20px;
  .iconfont {
    color: #333333;
    font-size: 48px;
  }
}
.tosearch-keyword {
  margin-left: 10px;
  font-size: 24px;
  color: #ffffff;
  background-color: #838383;
  white-space: nowrap;
  padding: 8px 16px;
  border: 2px solid transparent;
  border-radius: 2rem;
}
</style>
