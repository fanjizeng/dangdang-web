import { defineStore } from 'pinia'
import storage from '@/utils/goodStorageUtil'
import EvaluateApi from '@/api/EvaluateApi'
import ReplyApi from '@/api/ReplyApi'
import { AxiosResponse } from 'axios'
import booksStore from '../books/index'
function hasProps(obj: Record<string, any>) {
  return Boolean(Object.getOwnPropertyNames(obj).length)
}
export default defineStore('evaluateStore', {
  state: () => {
    return initState
  },
  getters: {
    getBookISBN() {
      return booksStore().getISBN
    },
    getEvalRepLst(state):Evaluate[]  {
      return hasProps(state.evalRepLst) ? state.evalRepLst : storage.get('evalRepLst')
    }
  },
  actions: {
    async findEvalRplLst() {
      const res: AxiosResponse<Evaluate[]> = await EvaluateApi.findEvalReplyLst(this.getBookISBN)
      this.evalRepLst = res.data
      storage.set('evalRepLst', res.data)
    },
    async addReply(reply: Reply){
      const res: AxiosResponse<Reply> = await ReplyApi.addReply(reply)
      const evalRepLst = this.getEvalRepLst
      const dbEvalRepLst = evalRepLst.map(evalRep => {
        if(evalRep.evaluateid === reply.evalid) {
          evalRep.replyLst.push(res.data)
        }
        return evalRep
      })
      this.evalRepLst = dbEvalRepLst
      storage.set('evalRepLst', this.evalRepLst)
    }
  }
})
export interface Evaluate {
  evaluateid: number
  content: string
  evaluator: string
  isbn: string
  headportrai: string
  givealikenum: string
  evaluatedegree: number
  pubdate: Date
  isanonymous: number
  replyLst: Reply[]
}
export interface Reply {
  replyid?: number
  replycontent: string
  replydate?: Date
  strReplyDate: string
  replyor: string
  evalid: number
}
type initStateType = {
  evalRepLst: Evaluate[],
  headAndDegree: boolean
}
const initState: initStateType = {
  evalRepLst: [],
  headAndDegree: false
}