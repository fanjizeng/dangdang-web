import request from '@/utils/axiosUtil'
import type { Reply } from '@/piniastore/evaluate'
class ReplyAPI {
  static api: ReplyAPI = new ReplyAPI()
  addReply(reply: Reply) {
    return request.post('/dang/replymodule/addReply', false, reply)
  }
}

export default ReplyAPI.api