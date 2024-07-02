export type Orderinfo = {
  orderid?: number // 订单id
  ordertime: string // 订单时间
  customerid: number // 顾客id,就是当前登录的用户
  orderstatus: number 
  orderstatus_?: string 
  orderDetailLst?: OrderDetail[]
  strOrderstatus?: string
  countDownTime?: string //页面显示的倒计时
  orderEndTime?: number // 订单结束时间
  countdownfn?: NodeJS.Timeout // 倒计时执行函数
}

export type OrderDetail = {
  orderdetailid?: number
  bookname: string
  bookprice: number
  bookpicname: string
  purcharsenum: number
  orderid?: number
  shopcartid?: number // 这个属性数据表没有，是接受前端传递过来的值，保证提交某个订单详情后删除购物车列表中对应的图书信息
}