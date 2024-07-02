<template>
    <div class="container">
      <Ordersorthead></Ordersorthead>
      <Orderlist></Orderlist>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue' 
import Ordersorthead from './component/ordersorthead.vue'
import Orderlist from './component/orderlist.vue'

</script>

<style lang="scss" scoped>

</style>