<template>
  <div class="contain">
    <Evaldegree></Evaldegree>
    <Evallist></Evallist>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Evaldegree from './components/evaldegree.vue'
import Evallist from './components/evallist.vue'
</script>

<style lang="scss" scoped>
.contain {
  position: absolute;
  top: 68px;
  left: 30px;
  width: calc(100vw - 60px);
  height: 100%;
  overflow-y: auto;
}
</style>
