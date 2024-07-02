import request from '@/utils/axiosUtil'
import { UserInfo } from '@/piniastore/userInfo/state'

class UserAPI {
  static userAPI: UserAPI = new UserAPI()
  login(userinfo: UserInfo) {
    return request.post('/dang/usermodule/login', false, userinfo)
  }
}

export default UserAPI.userAPI