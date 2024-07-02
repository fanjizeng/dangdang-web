import request from '@/utils/axiosUtil'

class EvaluateAPI {
  static api: EvaluateAPI = new EvaluateAPI()
  findEvalReplyLst(isbn: string) {
    return request.get(`/dang/evaluatemodule/findEvalReplyLst/${isbn}`, false)
  }
}

export default EvaluateAPI.api