import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import ShopCartApi from '@/api/ShopCartApi'
import { ShopCart, initShopcart } from './state'
import storage, { OPTION } from '@/utils/goodStorageUtil'

export default defineStore('shopCartStore', {
  state: () => {
    return {
      ShopCartList: initShopcart
    }
  },
  getters: {
    getShopCartList(state) {
      return state.ShopCartList.length > 0 ? state.ShopCartList : []
    }
  },
  actions: {
    async findCurUserShopCartLst(userid: number) {
      const result: AxiosResponse<ShopCart[]> = await ShopCartApi.getShopCartList(userid)
      this.ShopCartList = result.data
      storage.set('shopcartlist', result.data)
    },
    async addBookToShopCart(shopCart: ShopCart) {
      const result = await ShopCartApi.addBookToShopCart(shopCart)
      const dbShopCart: ShopCart = result.data
      const shopCartlist: ShopCart[] = storage.set('shopcartlist', dbShopCart, OPTION.ADDORAPPOBJTOARR, 'shopcartid', dbShopCart.shopcartid)
      this.ShopCartList = shopCartlist
    },
    async appOrSubtrBookFrmShopCart(shopCart: ShopCart) {
      await ShopCartApi.appOrSubtrBookFrmShopCart(shopCart)
      const shopCartlist: ShopCart[] = storage.set('shopcartlist', shopCart, OPTION.ADDORAPPOBJTOARR, 'shopcartid', shopCart.shopcartid)
      this.ShopCartList = shopCartlist
    },
    async delBookFrmSC(shopcartid: number) {
      const result: AxiosResponse<number> = await ShopCartApi.delBookFrmSC(shopcartid)
      if(result.data > 0) {
        storage.remove('shopcartlist', 'shopcartid', shopcartid)
        this.ShopCartList = storage.get('shopcartlist', OPTION.ADDORAPPOBJTOARR)
      }else {
        console.log('删除失败')
      }
    }
  }
})