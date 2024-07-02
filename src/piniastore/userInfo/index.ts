import { defineStore } from 'pinia'
import storage from '@/utils/goodStorageUtil'
import { UserInfo } from './state'
import UserApi from '@/api/UserApi'
import { AxiosResponse } from 'axios'

function hasProps(obj: Record<string, any>) {
  return Boolean(Object.getOwnPropertyNames(obj).length)
}
export default defineStore('userStore', {
  state: () => {
    return initState
  },
  getters: {
    getUserinfo(state) {
      return hasProps(state.userinfo) ? state.userinfo : storage.get('userinfo')
    }
  },
  actions: {
    async login(username: string, password: string) {
      const loginUser = {username, password} as UserInfo
      const res: AxiosResponse<UserInfo> = await UserApi.login(loginUser)
      this.userinfo = res.data
      storage.set('token', res.data.token)
      this.saveUserinfo(res.data)
    },
    saveUserinfo(val: UserInfo) {
      this.userinfo = val
      storage.set('loginUser', this.userinfo)
    }
  }
})
type initStateType = {
  userinfo: UserInfo
}
const initState: initStateType = {
  userinfo: {} as UserInfo
}