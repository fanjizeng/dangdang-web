import store from '@/store'

const ctgyGettersTarget = {
  getFirstCtgyList: [],
  getSecondCtgyList: []
}
// 代理目标对象的get属性，获取时，直接执行store的方法
const ctgyGettersProxy = new Proxy(ctgyGettersTarget, {
  get(ctgyGettersTarget, key) {
    if (key === 'getFirstCtgyList') {
      return store.getters['ctgyModule/getFirstCtgyList']
    }
    else if (key === 'getSecondCtgyList')
      return store.getters['ctgyModule/getSecondCtgyList']
  }
})

export { ctgyGettersProxy }