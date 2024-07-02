<template>
  <div class="nav">
    <div class="nav-item-list">
      <div class="nav-item" v-for="(item, index) in navItems" :key="index">
        <a :href="item.href">
          <img :src="getImg(item.img)" class="nav-item-icon" alt="" />
          <div class="nav-item-title">{{ item.name }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import getImg from '@/utils/imgUtils'
import { navItems } from '../compdata'
</script>

<style lang="scss" scoped>
.nav {
  .nav-item-list {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    .nav-item {
      width: 100%;
      height: 120px;
      text-align: center;
      padding-top: 30px;
      a {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .nav-item-icon {
          width: 30px;
          height: 30px;
          object-fit: contain;
        }
        .nav-item-title {
          font-size: 28px;
          color: #333333;
          padding-top: 10px;
        }
      }
    }
  }
}
</style>
