<template>
  <div class="comment">
    <div class="myself">
      <el-input
        type="textarea"
        placeholder="请留下你的评论"
        v-model="text"
        maxlength="140"
        show-word-limit
        resize="none"
      ></el-input>
      <el-button size="mini" style="float:right;marginTop:5px">
        评论
        <i class="el-icon-edit el-icon--right"></i>
      </el-button>
    </div>
    <p style="marginTop:30px;fontSize:14px">精彩评论</p>
    <div class="newComment" v-for="(item,index) in comments" :key="index">
      <div class="userComment">
        <div class="userImg">
          <img :src="item.user.avatarUrl" alt="404" />
          <div class="talk">
            <a href="#" style="color:#0a63ab;margin:0 8px">{{ item.user.nickname }}:</a>
            <span style="lineHeight:1.5">{{ item.content }}</span>
            <p style="margin:0 8px">{{item.time | showDate}}</p>
          </div>
        </div>
        <div class="doing">
          <span  class="to">举报!</span>
          <span><i class="el-icon-thumb"></i>{{ item.likedCount > 0 ?`(${ item.likedCount})`:'' }}</span>|
          <span>分享</span>|
          <span>回复</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {  getSongListComment } from "network/home";
import { formatDate } from "common/uctil";
export default {
  data() {
    return {
      text: "",
      id:0,
      total:0,
    };
  },
  props:{
      comments:{
          type:Array,
          default(){
              return []
          }
      },
    //   hotComments:{
    //       type:Array,
    //       default(){
    //           return []
    //       }
    //   },
  },
  methods:{
      
  },
  created(){
      
  },
  filters: {
    showDate: function (value) {
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
};
</script>

<style>
.comment{
    padding-bottom:20px ;
}
.doing{
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 12px;
    color: #999;
}
.doing span{
    margin: 0 8px;
    cursor: pointer;
}
.newComment:hover span.to{
    display: inline-block;
}
.to{
    display: none;
    cursor: pointer;
}
.talk span,.talk a{
   position: relative;
   top: -8px;
}
.myself {
  padding: 20px 0 40px 0;
  background: #f0f0f2;
}
.newComment {
  margin-top: 10px;
  font-size: 13px;
  position: relative;
}
.userComment {
  margin-top: 5px;
  border-top: 1px solid #f0f0f2;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
}
.userImg {
  display: flex;
  align-items: center;
}
.userImg img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin-right: 5px;
}
</style>