import { Module } from 'vuex'
import { CtgyState, initCtgyState, SecondCtgy, FirstCtgy } from './state'
import ctgyApi from '@/api/CtgyApi'
import { AxiosResponse } from 'axios'

export const ctgyModule: Module<CtgyState, {}> = {
  namespaced: true,
  state: initCtgyState,
  getters: {
    getFirstCtgyList(state) {
      return state.firstCtgyList
    },
    getSecondCtgyList(state) {
      return state.secondCtgyList
    }
  },
  mutations: {
    storeFirstCtgyLst(state, firstCtgyList_: FirstCtgy[]) {
      state.firstCtgyList = firstCtgyList_
    },
    storeSecondCtgyLst(state, secondCtgyList: SecondCtgy[]) {
      state.secondCtgyList = secondCtgyList
    }
  },
  actions: {
    async findFirstCtgyList({ commit }) {
      const result = await ctgyApi.getFirstCtgyList()
      commit('storeFirstCtgyLst', result.data)
    },
    async findSecThrdCtgyList({ commit }, firstCtgyId: number) {
      const result: AxiosResponse<SecondCtgy[]> = await ctgyApi.getSecThrdCtgyList(firstCtgyId)
      if (result.data.length > 0) {
        result.data = result.data.map(e => {
          e.isReadOpen = false
          return e
        })
      }
      commit('storeSecondCtgyLst', result.data)
    }
  }
}

