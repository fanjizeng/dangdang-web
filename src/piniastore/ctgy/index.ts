import { initCtgyState, SecondCtgy, ThirdCtgy } from './state'
import ctgyApi from '@/api/CtgyApi'
import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import goodStorage from 'good-storage'

function hasProps(obj: Record<string, any>) {
  console.log(Object.getOwnPropertyNames(obj), '--000')

  return Boolean(Object.getOwnPropertyNames(obj).length)
}
export default defineStore('ctgyStore', {
  state: () => {
    return {
      ...initCtgyState
    }
  },
  getters: {
    getFirstCtgyList(state) {
      return state.firstCtgyList
    },
    getSecondCtgyList(state) {
      return state.secondCtgyList
    },
    getThirdCtgy(state) {
      return hasProps(state.thirdCtgy) ? state.thirdCtgy : goodStorage.get('thirdCtgy')
    }
  },
  actions: {
    async findFirstCtgyList() {
      const result = await ctgyApi.getFirstCtgyList()
      this.firstCtgyList = result.data
    },
    async findSecThrdCtgyList(firstCtgyId: number) {
      const result: AxiosResponse<SecondCtgy[]> = await ctgyApi.getSecThrdCtgyList(firstCtgyId)
      if (result.data.length > 0) {
        result.data = result.data.map(e => {
          e.isReadOpen = false
          return e
        })
      }
      this.secondCtgyList = result.data
    },
    storeCtgy(thirdCtgy: ThirdCtgy) {
      console.log(thirdCtgy, '存在')
      goodStorage.set('thirdCtgy', thirdCtgy)
      this.thirdCtgy = thirdCtgy
    }
  }
})

