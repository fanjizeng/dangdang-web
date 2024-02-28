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
    console.log(imgMap, 'img')
    let absolutePath: string = '' //绝对路径
    let imgName: string = ''
    for(const relativePath in imgMap) {
      absolutePath = imgMap[relativePath].default
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