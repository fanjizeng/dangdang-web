<template>
  <div class="login">
    <img class="pic" :src="getImg('loginregisterPic.jpg')" alt="">
    <div class="username">
      <input type="text" v-model="username" class="username-input" name="username" placeholder="昵称、手机号、邮箱">
    </div>
    <div class="psw">
      <input type="password" v-model="password" name="psw" class="psw-input" placeholder="密码">
    </div>
    <div class="loginbtn" @click="login">登陆</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import getImg from '@/utils/imgUtils'
import userStore from '@/piniastore/userInfo'
import storage from '@/utils/goodStorageUtil';
import { useRouter } from 'vue-router';
const { username, password } = toRefs(reactive({
  username: '',
  password: ''
}))
const router = useRouter()
async function login() {
  await userStore().login(username.value, password.value)
  if(storage.get('token')) router.push({path: 'home'})
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 36px;
  .username {
    height: 110px;
    width: calc(100% - 80px);
    padding: 20px;
    background-color: #ededed;
    border-radius: 999px;
    .username-input {
      margin-left: 30px;
      border: none;
      background-color: transparent;
      font-size: 32px;
    }
  }
  .psw {
    height: 110px;
    width: calc(100% - 80px);
    padding: 20px;
    background-color: #ededed;
    border-radius: 999px;
    .psw-input {
      margin-left: 30px;
      border: none;
      background-color: transparent;
      font-size: 32px;
    }
  }
  .loginbtn {
    width: calc(100% - 80px);
    background-color: rgb(221, 26, 26);
    box-shadow: 0rem 0rem 1rem rgb(143, 14, 14);
    border-radius: 999px;
    text-align: center;
    padding: 18px;
    color: #ffffff;
    font-size: 40px;
  }
}
</style>
