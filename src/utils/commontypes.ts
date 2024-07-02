export type EleOfArr<T> = T extends Array<infer E> ? E : never
type ItemType<T extends object[]> = {
  [K in keyof EleOfArr<T>]: EleOfArr<T>[K]
}
type UnionToIntersection<U> = (U extends any ? (args: U) => void : never) extends (args: infer I) => void ? I : never

export function getSubItemsFrmArr<T extends ItemType<T>[], K extends keyof EleOfArr<T>>(t: T, ...keys: K[]): Pick<EleOfArr<T>, K>[] {
  return t.map(item => {
    return keys.reduce((pre, cur, index) => {
      return { ...pre, [keys[index]]: item[keys[index]] }
    }, {})
  }) as Pick<EleOfArr<T>, K>[]
}

export function getOneItemValuesFrmArr<T extends ItemType<T>[], K extends keyof EleOfArr<T>, E = EleOfArr<T>>(arr: T, k: K) {
  return arr.map(({ [k]: v }: E) => {
    return v
  })
}
function getNoReptValsItem(arr: any[]) {
  const data: any[] = []
  return arr.filter((item) => !data.includes(item) && data.push(item))
}
export function getNoReptItem<T extends ItemType<T>[], K extends keyof EleOfArr<T> = keyof EleOfArr<T>>(arr: T, k: K): ItemType<T>[] {
  const data: ItemType<T>[] = []
  // 1 获取对象中某个元素的值组成的数组
  const oneItemValues: any[] = getOneItemValuesFrmArr(arr, k)
  // 2 对oneItemValues数组去重
  const noReptOneItemvalues = getNoReptValsItem(oneItemValues)
  // 3 对象去重
  arr.filter((item) => {
    // 如果数组中元素是否包含在这个第二步中元素的值数组中
    if (noReptOneItemvalues.includes(item[k])) {
      // 先删除这个元素
      noReptOneItemvalues.splice(noReptOneItemvalues.indexOf(item[k]), 1)
      // 然后添加到数组中
      return data.push(item)
    }
    return false
  })
  return data
}
export function combine<T extends Record<string, any>[]>(...unionObj: T): UnionToIntersection<T[number]>
export function combine<T extends Record<string, any>[]>(...unionObj: T) {
  return unionObj.reduce((pre, cur) => {
    return { ...pre, ...cur }
  }, {})
}