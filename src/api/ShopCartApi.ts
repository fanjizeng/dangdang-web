import { ShopCart } from '@/piniastore/shopCart/state'
import request from '@/utils/axiosUtil'

class ShopCartAPI {
  static shopCartApi: ShopCartAPI = new ShopCartAPI()
  getShopCartList(userid: number) {
    return request.get(`/dang/shopcartmodule/findUserShopCartList/${userid}`, false)
  }
  addBookToShopCart(shopcart: ShopCart) {
    return request.post('/dang/shopcartmodule/addBookToShopCart', false, shopcart)
  }
  appOrSubtrBookFrmShopCart(shopcart: ShopCart) {
    return request.post('/dang/shopcartmodule/appOrSubtrBookFrmShopCart', false, shopcart)
  }
  delBookFrmSC(shopcartid: number) {
    return request.delete(`/dang/shopcartmodule/deOneBookFrmSc/${shopcartid}`, false)
  }
}

export default ShopCartAPI.shopCartApi