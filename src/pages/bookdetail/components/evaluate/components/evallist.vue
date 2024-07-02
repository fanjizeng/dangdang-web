<template>
  <div class="evaluate-list" ref="evalLstRef">
    <div class="evaluate-item" v-for="(item, index) in evalRplLst" :key="index">
      <div class="evaluate-item-user">
        <div class="img-wrapper">
          <img :src="getImg(item.headportrai)" alt="" />
        </div>
        <span class="">{{ item.evaluator }}</span>
        <span class="givealike">
          <van-icon name="good-job-o" />
        </span>
      </div>
      <div class="evaluate-item-star">
        <span class="icon" v-for="star in [0, 0, 0, 0, 0]">
          <img class="starimg" :src="getImg('redstar.png')" alt="" />
        </span>
        <span class="line">|</span>
        <span class="star-score">10分</span>
      </div>
      <div class="evaluate-item-content">
        {{ item.content }}
        <div class="reply-action">
          <span class="date">{{ item.pubdate }}</span>
          <span class="reply-to-evaluate">
            <!-- 回复评论 -->
            <span class="replyinfo">
              <span class="reply" v-show="canclRplShowIndx === -1" @click="reply($event, index)">回复</span>
              <van-icon class="reply-icon" v-show="canclRplShowIndx === -1" name="comment-o" />
              <span class="cancelreply" v-show="canclRplShowIndx === index" @click="cancelReply($event)">取消回复</span>
            </span>
            <div class="reply-panel">
              <div class="overlay-before" ref="overlayEle"></div>
              <div class="publish_area">
                <textarea class="reply-content" :placeholder="'回复' + item.evaluator"></textarea>
                <div class="publish" @click="addReply($event, item.evaluateid)">发表</div>
              </div>
              <div class="overlay-after"></div>
            </div>
          </span>
        </div>
        <div class="replylst">
          <div class="reply" v-for="(reply, index) in showReplyLst(item.replyLst, endRplLstIndex)" :key="reply.replyid">
            <span class="replyor">{{ reply.replyor }}：</span>
            <span class="reply-content">{{ reply.replycontent }}</span>
          </div>
          <div class="allreply">
            <span v-if="isEmpty(item.replyLst)">暂无回复</span>
            <span v-show="isReadyOpen(item.replyLst)" @click="foldRplLst(item.replyLst)">展开</span>
          </div>
          <div class="allreply" v-show="isReadyCollapse(item.replyLst)" @click="collapseRplLst">
            收起<van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="evaluate-list" v-show="evalRplLst.length === 0">
    <div class="noevaluate">暂无评价</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { EvaluateClass } from '@/pages/bookdetail/service'
import { ReplyClass } from '@/pages/bookdetail/service/reply'
import getImg from '@/utils/imgUtils'

const { searchEvalRplLst, storeRefs, evalRplLst, canclRplShowIndx, cancelReply, reply } = EvaluateClass
const { showReplyLst, endRplLstIndex, foldRplLst, collapseRplLst, isReadyCollapse, isEmpty, isReadyOpen, addReply } = ReplyClass
searchEvalRplLst()
const value = ref(4)
</script>

<style lang="scss" scoped>
.evaluate-list {
  width: 100%;
  height: auto;
  display: grid;
  gap: 20px;
  .evaluate-item {
    display: grid;
    &-user {
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 28px;
      .img-wrapper {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
    &-star {
      display: flex;
      align-items: center;
      gap: 8px;
      .icon {
        width: 40px;
        height: 40px;
        white-space: nowrap;
        display: flex;
        align-items: center;
        .starimg {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .line {
        font-size: 40px;
      }
      .star-score {
        font-size: 32px;
        color: #e2412c;
      }
    }
    &-content {
      font-size: 28px;
      text-shadow: 0 0 4px gray;
      .reply-action {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-top: 20px;
        position: relative;
        .reply-to-evaluate {
          flex: 1;
          text-align: right;
          .replyinfo {
          }
          .reply-panel {
            display: none;
          }
          .reply-panel-show {
            display: block;
            position: absolute;
            top: 60px;
            left: 0;
            height: 240px;
            width: 660px;
            z-index: 99;
            .publish_area {
              display: flex;
              width: 100%;
              height: 100%;
              gap: 10px;
              .reply-content {
                flex: 1;
                height: 80%;
                width: 90%;
                background-color: #f1f1f1;
                resize: none;
              }
              .publish {
                width: 80px;
                flex-basis: 80px;
                text-align: center;
              }
            }s
            .overlay-before {
              position: absolute;
              top: -460px;
              width: 760px;
              background-color: #ffffff;
              opacity: 0.6;
              height: 440px;
            }
            .overlay-after {
              position: absolute;
              top: 200px;
              width: 800px;
              background-color: #ffffff;
              opacity: 0.6;
              height: 50vh;
            }
          }
        }
        .reply {
          margin-right: 10px;
        }
        .reply-icon {
          position: relative;
          top: 4px;
        }
      }
      .replylst{
        margin-top: 10px;
        line-height: 50px;
        background-color: #f6f6f6;
        padding: 10px;
        .reply {
          .replyor {
            color: #526198;
          }
          &-content {
            font-family: '楷体';
          }
        }
      }
    }
  }
}
.evaluate-list::after{
  display: block;
  height: 100px;
  content: ' ';
}
</style>
