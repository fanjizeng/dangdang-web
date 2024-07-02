<template>
  <div class="evaldegree">
    <div class="more">
      <span class="all evaluate" @click="checkEValRplLst(0)">全部</span>
      <span class="newest evaluate">最新</span>
      <span class="figure-video evaluate">图/视频</span>
    </div>
    <div class="ratings">
      <span class="goodEvals evaluate" @click="checkEValRplLst(1)">好评 ({{ goodEvalNums }})</span>
      <span class="mediumEvals evaluate" @click="checkEValRplLst(2)">中评 ({{ mediumEvalNums }})</span>
      <span class="negativeEvals evaluate" @click="checkEValRplLst(3)">差评 ({{ nagativeEvalNums }})</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BookDetail from '@/pages/bookdetail/service'
import { EvaluateClass } from '@/pages/bookdetail/service'

const { setHeaderOpacity } = BookDetail
const { goodEvalNums, mediumEvalNums, nagativeEvalNums, checkEValRplLst } = EvaluateClass
setHeaderOpacity(1)
</script>

<style lang="scss" scoped>
.evaldegree {
  margin-top: 80px;
  width: 100%;
  .more,
  .ratings {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    line-height: 35px;
    font-size: 28px;
    font-weight: 500;
    .evaluate {
      background-color: #fef2f6;
      border-radius: 10px;
      padding: 12px 16px;
    }
  }
  .more {
    margin-bottom: 20px;
  }
}
</style>
