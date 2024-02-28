<template>
  <ul class="content-second">
    <li class="second-item" v-for="item in secondCtgyList" :key="item.secondctgyid">
      <div class="item-head flex-jb">
        <span class="head-left">{{ item.secctgyname }}</span>
        <span class="head-right">{{ `${item.secctgyname}馆` }}<van-icon name="arrow" /></span>
      </div>
      <div class="item-child">
        <div class="child-contain" v-for="third in !item.isReadOpen ? item.thirdctgyList.slice(0, 5) : item.thirdctgyList" :key="third.thirdctgyid">
          <span @click="toBookInfo(third)">{{ third.thirdctgyname }}</span>
        </div>
        <div v-if="item.thirdctgyList.length > 5" class="expend-contain" :class="{ 'expend-closed': item.isReadOpen }" @click="openOrCollapse($event, item)">
          <div v-if="!item.isReadOpen">
            <span>展开</span>
            <div class="expend-icon">
              <van-icon name="arrow-down" size="10px" />
            </div>
          </div>
          <div v-if="item.isReadOpen">
            <span>收起</span>
            <div class="expend-icon">
              <van-icon name="arrow-up" size="10px" />
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'
// import FstToThrdCtgy from '../service'
import FstToThrdCtgy from '../piniaservice'
const { storeRefs, openOrCollapse, toBookInfo } = FstToThrdCtgy
const { secondCtgyList } = storeRefs
</script>

<style lang="scss" scoped>
.content-second {
  flex: 1;
  margin-left: 20px;
  .second-item {
    background: #ffffff;
    padding: 20px;
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    .item-head {
      font-size: 32px;
      .head-left {
        color: #323233;
        font-weight: 800;
      }
      .head-right {
        color: #969799;
      }
    }
    .item-child {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      position: relative;
      .child-contain {
        text-align: center;
        cursor: pointer;
        font-size: 28px;
        height: 90px;
        line-height: 90px;
        position: relative;
        &:not(:nth-child(3n)) {
          &::after {
            content: ' ';
            display: inline-block;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 50px;
            width: 2px;
            background-color: #dcdee0;
          }
        }
      }
      .expend-contain {
        text-align: center;
        font-size: 28px;
        height: 90px;
        line-height: 90px;
      }
      .expend-closed {
        position: absolute;
        right: 0;
        bottom: 0;
        width: calc(100% / 3);
        text-align: center;
      }
    }
  }
}
.expend-icon {
  display: inline-block;
  border: 2px solid #969799;
  margin-left: 8px;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  line-height: 26px;
}
</style>
