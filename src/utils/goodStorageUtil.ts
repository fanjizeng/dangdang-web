import goodStorage from 'good-storage'

export enum OPTION {
  ACCUMU = 0, //数组累加
  ADDORAPPOBJTOARR = 2, // 把对象添加或追加到数组
  NONE = -1, // 什么都不做
}
const isPlainObject = (val: unknown): val is object =>
  Object.prototype.toString.call(val) === '[object Object]'

type EleOfArr<T> = T extends Array<infer E> ? E : never

function getValArrOfObj<T extends any[], K extends keyof EleOfArr<T>, E = EleOfArr<T>>(t: T, k: K) {
  return t.map(({ [k]: v }: E) => v, {})
}
function isString(val: any): val is string {
  return typeof val === 'string'
}
class Storage {
  static storage: Storage = new Storage()
  public set(key: string, value: string): any
  public set(key: string, value: object): any
  public set(key: string, value: any[]): any
  public set(key: string, value: any[], option: OPTION): any
  public set(key: string, value: string, option: OPTION): any
  public set(key: string, value: object, option: OPTION, propkey: string, propvalue: any): any
  public set(key: string, value: any, option: OPTION = OPTION.NONE, propkey: string = '', propvalue?: any) {
    if (isPlainObject(value) && option === OPTION.ADDORAPPOBJTOARR) {
      const arr: any[] = goodStorage.get(key, [])
      if (propkey.length > 0 && propvalue) {
        const keyValsOfObj = getValArrOfObj(arr, propkey)
        if (!keyValsOfObj.includes(propvalue)) {
          arr.push(value)
        } else {
          const index = keyValsOfObj.indexOf(propvalue)
          if (index >= 0) arr[index] = value
        }
        goodStorage.set(key, arr)
        return arr
      }
    } else if (option === OPTION.ACCUMU) {
      const arr: any[] = goodStorage.get(key, [])
      if (Array.isArray(value)) arr.push(...value)
      else if (isString(value) && !arr.includes(value)) arr.push(value)
      goodStorage.set(key, arr)
      return arr
    }
    goodStorage.set(key, value)
  }

  remove(key: string): any
  remove(key: string, propkey: string, propvalue: any): any
  remove(key: string, propkey: string = '', propvalue?: any) {
    const arr: any[] = goodStorage.get(key, [])
    const keyValsOfObj = getValArrOfObj(arr, propkey)
    const eleIndex = keyValsOfObj.indexOf(propvalue)
    if (eleIndex !== -1) {
      arr.splice(eleIndex, 1)
      goodStorage.set(key, arr)
    }
  }

  get(key: string): any
  get(key: string, option: OPTION): any
  get(key: string, option: OPTION = OPTION.NONE) {
    if (option === OPTION.ACCUMU || option === OPTION.ADDORAPPOBJTOARR) return goodStorage.get(key, [])
    else return goodStorage.get(key)
  }
}

export default Storage.storage