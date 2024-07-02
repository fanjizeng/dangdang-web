import request from '@/utils/axiosUtil'
import { Orderinfo } from '@/piniastore/orderinfo/state'
class OrderinfoAPI {
  static api: OrderinfoAPI = new OrderinfoAPI()
  addOrdAndOrdDetail(ordAndOrdDetailInfo: Orderinfo) {
    return request.post('/dang/ordAndOrdDetailmodule/addOrdAndOrdDetail', false, ordAndOrdDetailInfo)
  }
  findCurUsrOrdAndOrdDetail(customerid: number) {
    return request.get(`/dang/ordAndOrdDetailmodule/findCurUsrOrdAndOrdDetail/${customerid}`, false)
  }
  uptOrdStatusByOrdId(orderid: number) {
    return request.get(`/dang/ordAndOrdDetailmodule/uptOrdStatusByOrdId/${orderid}`, false)
  }
}
export default OrderinfoAPI.api