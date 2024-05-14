export class LoadImgUtil {
  static imgList: Record<string, string> = {}
  static storageImgList() {
    if(this.isEmpty(LoadImgUtil.imgList)) {
      this.loadAllImg()
    }
  }
  static isEmpty(imgList: Record<string, string>) {
    return !Object.getOwnPropertyNames(imgList).length
  }

  static getImg(imgName: string) {
    return LoadImgUtil.imgList[imgName]
  }
  static loadAllImg() {
    const imgMap = import.meta.glob('../assets/img/**/*.png', { eager: true })
    let absolutePath: string = '' //绝对路径
    let imgName: string = ''
    for(const relativePath in imgMap) {
      // 默认拿到的地址是被编码过的，需要解码才能匹配上
      absolutePath = decodeURI(imgMap[relativePath].default)
      if(absolutePath) {
        imgName = absolutePath.substring(absolutePath.lastIndexOf('/') + 1)
        if(imgName.includes('?t=')) {
          imgName = imgName.split('?t=')[0]
        }
        LoadImgUtil.imgList[imgName] = absolutePath
      }
    }
    console.log('imgList:', LoadImgUtil.imgList)
  }
}

export default LoadImgUtil.getImg