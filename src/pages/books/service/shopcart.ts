import { ref, Ref, computed } from 'vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import ShopCartStore from '@/piniastore/shopCart'
import { BookInfo } from '@/piniastore/books/state'
import { ShopCart } from '@/piniastore/shopCart/state'
import { showConfirmDialog } from 'vant';
import Books from './index'

type BallType = { showorhidden: boolean; addBtnTarget?: EventTarget | null }
class ShopCartClass {
  static store = ShopCartStore()
  static storeRefs = storeToRefs(ShopCartClass.store)
  static ball: Ref<BallType> = ref({ showorhidden: false })
  static isSelectAll: Ref<boolean> = ref(false)
  static selectAll() {
    const shopCartList = ShopCartClass.store.getShopCartList.map((shopcart: ShopCart) => {
      shopcart.checked = !ShopCartClass.isSelectAll.value
      return shopcart
    })
    ShopCartClass.store.storeShopCartList(shopCartList)
  }
  static async findCurUserShopCartLst() {
    await ShopCartClass.store.findCurUserShopCartLst(1)
    console.log('shopCartList:', ShopCartClass.store.getShopCartList)
  }
  static async addBookToShopCart(bookitem: BookInfo) {
    const shopcart: ShopCart = {
      userid: 1,
      bookisbn: bookitem.ISBN,
      bookname: bookitem.bookname,
      bookpicname: bookitem.bookpicname,
      bookprice: procDecimalZero(bookitem.originalprice * bookitem.discount),
      purcharsenum: 1
    }
    await ShopCartClass.store.addBookToShopCart(shopcart)
    Books.updateBookNum(1, bookitem.ISBN)
  }
  static uptBookNumWithSCLstNum(books: BookInfo[]) {
    const shopCartList = ShopCartClass.store.getShopCartList
    shopCartList.forEach((shopcart: ShopCart) => {
      books.forEach(book => {
        if (shopcart.bookisbn === book.ISBN) {
          book.purcharsenum = shopcart.purcharsenum
        }
      })
    })
  }
  static getExistsShopCartID(bookitem: BookInfo) {
    const shopCartList = ShopCartClass.store.ShopCartList
    let shopCart: ShopCart
    let shopCartId: number = 0
    for (let i = 0; i < shopCartList.length; i++) {
      shopCart = shopCartList[i]
      if (bookitem.ISBN === shopCart.bookisbn) {
        shopCartId = shopCart.shopcartid!
        break
      }
    }
    return shopCartId
  }
  static drop(event: Event) {
    ShopCartClass.ball.value.showorhidden = true
    ShopCartClass.ball.value.addBtnTarget = event.currentTarget
  }
  static async appOrSubtrBookInShopCart(shopCart: ShopCart, event: Event) {
    const curTarget = <HTMLBodyElement>event.currentTarget
    const className = curTarget.className
    if (className.includes('plus')) {
      shopCart.purcharsenum = shopCart.purcharsenum + 1
    } else if (className.includes('minus')) {
      shopCart.purcharsenum = shopCart.purcharsenum - 1
    }
    await ShopCartClass.store.appOrSubtrBookFrmShopCart(shopCart!)
  }
  static async appOrSubtrBookFrmShopCart(bookitem: BookInfo, event: Event) {
    const curShopCartId = ShopCartClass.getExistsShopCartID(bookitem)
    const curTarget = <HTMLBodyElement>event.currentTarget
    const className = curTarget.className
    let purcharsenum: number = 0
    if (className.includes('plus')) {
      purcharsenum = bookitem.purcharsenum + 1
      ShopCartClass.drop(event)
    } else if (className.includes('minus')) {
      purcharsenum = bookitem.purcharsenum - 1
    }
    const shopcart: ShopCart = {
      userid: 1,
      shopcartid: curShopCartId,
      bookisbn: bookitem.ISBN,
      bookname: bookitem.bookname,
      bookpicname: bookitem.bookpicname,
      bookprice: procDecimalZero(bookitem.originalprice * bookitem.discount),
      purcharsenum: purcharsenum
    }
    await ShopCartClass.store.appOrSubtrBookFrmShopCart(shopcart)
    Books.updateBookNum(purcharsenum, bookitem.ISBN)
  }
  static delCurBookInSC(shopCart: ShopCart) {
    showConfirmDialog({
      title: '删除提示',
      message:
        '是否将此书移出购物车',
    })
      .then(async () => {
        await ShopCartClass.store.delBookFrmSC(shopCart.shopcartid!)
      })
      .catch(() => {
        // on cancel
      });
  }
  static delCurBookFrmSC(bookitem: BookInfo) {
    showConfirmDialog({
      title: '删除提示',
      message:
        '是否将此书移出购物车',
    })
      .then(async () => {
        const curShopCartId = ShopCartClass.getExistsShopCartID(bookitem)
        await ShopCartClass.store.delBookFrmSC(curShopCartId)
        Books.updateBookNum(0, bookitem.ISBN)
      })
      .catch(() => {
        // on cancel
      });
  }
  static refreshShopCartList() {
    const totalCount = computed(() => {
      let totalCount_ = 0
      const shopcartlist = ShopCartClass.store.getShopCartList
      if (shopcartlist && shopcartlist.length > 0) {
        shopcartlist.forEach((shopcart: ShopCart) => {
          if(shopcart.checked) {
            totalCount_ += shopcart.purcharsenum
          }
        })
      }
      return totalCount_
    })
    const totalPrice = computed(() => {
      let totalPrice_ = 0
      const shopcartlist = ShopCartClass.store.getShopCartList
      if (shopcartlist && shopcartlist.length > 0) {
        shopcartlist.forEach((shopcart: ShopCart) => {
          if(shopcart.checked) {
            totalPrice_ += shopcart.bookprice * shopcart.purcharsenum
          }
        })
      }
      return procDecimalZero(totalPrice_)
    })
    return {
      totalCount,
      totalPrice
    }
  }
  static beforeDrop(ele: Element) {
    const curBallEle_ = ele as HTMLBodyElement
    // 1. 获取追加图书按钮对象
    const addBtnEle = <HTMLBodyElement>ShopCartClass.ball.value.addBtnTarget
    // 2. 计算底部小球移动到按钮对象的坐标
    const addBtnEleRect = addBtnEle.getBoundingClientRect()
    const x = addBtnEleRect.left - 80
    const y = -(window.innerHeight - addBtnEleRect.top - 20)
    curBallEle_.style.transform = `translate3d(0,${y}px,0)`
    const inner = curBallEle_.getElementsByClassName('inner')[0] as HTMLBodyElement
    inner.style.transform = `translate3d(${x}px,0,0)`
  }
  static dropping(ele: Element, done: (...args: any) => any) {
    document.body.scrollHeight
    const curBallEle_ = ele as HTMLBodyElement
    curBallEle_.style.transform = 'translate3d(0,0,0)'
    const inner = curBallEle_.getElementsByClassName('inner')[0] as HTMLBodyElement
    inner.style.transform = 'translate3d(0,0,0)'
    done()
  }
  static afterDrop(ele: Element) { 
    ShopCartClass.ball.value.showorhidden = false
    ShopCartClass.ball.value.addBtnTarget = undefined
  }
  static jumpShopcart() {
    router.push('/shopcartlist')
  }
  static checkEveryCheckBox() {
    const isSelectAll = ShopCartClass.store.getShopCartList.every(shopcart => {
      return shopcart.checked
    })
    ShopCartClass.store.storeShopCartList(ShopCartClass.store.getShopCartList)
    ShopCartClass.isSelectAll.value = isSelectAll
  }
}
function procDecimalZero(num: number) {
  let strValue = num.toString()
  const splitValues = strValue.split('.')
  if (splitValues.length === 1) {
    // 整数
    strValue = strValue + '.00'
  } else if (splitValues.length > 1) {
    if (splitValues[1].length === 1) {
      strValue = strValue + '0'
    } else {
      strValue = num.toFixed(2).toString()
    }
  }
  // 将string转换为number类型，但不能直接转，只有先转中间any才能转换
  return strValue as any as number
}

export default ShopCartClass