import { ref } from 'vue'
import { Reply } from '@/piniastore/evaluate'
import storage from '@/utils/goodStorageUtil'
import evaluateStore from '@/piniastore/evaluate'
import { EvaluateClass } from './index'

export class ReplyClass {
  static endRplLstIndex = ref(2)
  static store = evaluateStore()
  static showReplyLst(rplLst: Reply[], endRplLstIndex: number) {
    return rplLst.slice(0, endRplLstIndex)
  }
  static foldRplLst(rplLst: Reply[]) {
    ReplyClass.endRplLstIndex.value = rplLst.length
  }
  static collapseRplLst() {
    ReplyClass.endRplLstIndex.value = 2
  }
  static isReadyCollapse(rplLst: Reply[]) {
    return ReplyClass.endRplLstIndex.value > 2 && rplLst.length > 2
  }
  static isEmpty(rplLst: Reply[]) {
    return rplLst.length === 0
  }
  static isReadyOpen(rplLst: Reply[]) {
    return ReplyClass.endRplLstIndex.value <= 2 && rplLst.length > 2
  }
  static async addReply($event: Event, evalid: number) {
    const replyEle = $event.currentTarget as HTMLBodyElement
    const replycontent = (replyEle.previousElementSibling! as HTMLInputElement).value
    const strReplyDate = getNowTime()
    const replyor = storage.get('loginUser').username
    const reply: Reply = {
      replycontent,
      strReplyDate,
      evalid,
      replyor
    }
    await ReplyClass.store.addReply(reply)
    EvaluateClass.evalRplLst.value = ReplyClass.store.getEvalRepLst
    const replyPanelEle = replyEle.parentElement!.parentElement! as HTMLBodyElement
    replyPanelEle.className = 'reply-panel'
    EvaluateClass.canclRplShowIndx.value = -1
    EvaluateClass.controlScrlOrHid('scroll')
    EvaluateClass.ctrlHeadAndDegree(true)
  }
}

function getNowTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  return `${year}-${month}-${day}`
}