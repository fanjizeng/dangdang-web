import request from '@/utils/axiosUtil'

class CtgyAPI {
  static api: CtgyAPI = new CtgyAPI()
  getFirstCtgyList() {
    return request.get('/dang/ctgymodule/findFirstCtgyList', false)
  }
  getSecThrdCtgyList(firstctgyid: number) {
    return request.get(`/dang/ctgymodule/findSecThrd/${firstctgyid}`, false)
  }
  getCtgyDetail(firstctgyid: number) {
    return request.get(`/dang/ctgymodule/findThirdCtgy/${firstctgyid}`, false)
  }
  getThirdBySecId(secctgyid: number) {
    return request.get(`/dang/ctgymodule/getThirdBySecId/${secctgyid}`, false)
  }
}

export default CtgyAPI.api