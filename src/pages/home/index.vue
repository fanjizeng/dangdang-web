<template>
  <div class="home">
    <Header></Header>
    <Nav></Nav>
    <Books></Books>
    <Bottom></Bottom>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from './component/header.vue'
import Nav from './component/nav.vue'
import Books from './component/books.vue'
import Bottom from '@/components/bottom/index.vue'
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow-y: auto;
}
</style>
