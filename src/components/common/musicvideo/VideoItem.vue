<template>
  <div class="musiclistitem" @click="toListPage(item.vid)" :style="{width:wth+'%'}">
    <el-card :body-style="{ padding: '0px',width:'100%' }" shadow="hover">
      <img :src="item.coverUrl" class="image" />
      <slot name="music-t">
        <div class="right-t">
          <i class="el-icon-video-camera" style="paddingTop: 4px;paddingLeft:15px"></i>
          <span>{{item.playTime >= 10000 ? (item.playTime/10000).toFixed(0)+'万' : item.playTime}}</span>
        </div>
        <div class="top-t" v-if="topShow">
          <span>{{item.name}}</span>
        </div>
      </slot>
      <div class="btm">
        <i class="el-icon-video-play"></i>
      </div>
      <div class="user" v-if="userShow">
        <span>{{item.durationms | showTime}}</span>
      </div>
    </el-card>
    <div class="namet">
      <span>{{item.name}}</span>
    </div>
    <div class="btm-comment">
        <div class="title-ct">{{item.title}}</div>
        <span><i class="el-icon-user"></i>{{item.creator.nickname}}</span>
    </div>
  </div>
</template>

<script>
import {timeFormat} from 'common/uctil'
export default {
  name:'MusicListItem',
  data() {
    return {
    };
  },
  props: {
    //传入数据
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    //设置单个宽度
    wth:{
      type:Number,
      default:18
    },
    //设置顶部文字是否显示
    topShow:{
      type:Boolean,
      default:true,
    },
    //设置用户名是否显示
    userShow:{
      type:Boolean,
      default:false,
    }
  },
  created() {
    // console.log(this.item);
  },
  methods: {
    //跳转到播放页
    toListPage(id) {
      this.$router.push('/videos' + id);
      console.log(id);
    },
  },
  filters:{
    //时间格式过滤
      showTime(value){
          return timeFormat(value);
      }
  }
};
</script>

<style scped>
.title-ct{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    width: 250px;
}
.btm-comment{
    position: absolute;
    bottom: 0px;
    left: 0;
    font-size: 12px;
}
.user{
  width: 100%;
  position: absolute;
  bottom: 50px;
  left: 0;
  font-size: 13px;
  color: aliceblue;
  background-image: linear-gradient(rgba(0,0,0,0.02), rgba(0,0,0,0.4));
}
.namet {
  padding-top: 10px;
  font-size: 13px;
  height: 40px;
}

.btm {
  position: absolute;
  bottom: 30%;
  /* bottom: 36px; */
  right: 6px;
  font-size: 28px;
  color: red;
  cursor: pointer;
  transform: translateX(115%);
  transition: transform 0.3s;
}
.btm:hover {
  color: rgba(255, 255, 255, 0.95);
}
.musiclistitem:hover .btm {
  transform: translateX(0);
}
.top-t {
  position: absolute;
  top: 0px;
  color: rgba(255, 255, 255, 0.95);
  font-size: 12px;
  background: rgba(0, 0, 0, 0.5);
  padding: 6px 0px;
  transform: translateY(-100%);
  transition: transform 0.5s;
  width: 100%;
  height: 20px;
  overflow: hidden;
}
.musiclistitem:hover .top-t {
  transform: translateY(0);
}
.right-t {
  width: 80px;
  height: 14px;
  position: absolute;
  padding-top: 1px;
  top: 0px;
  right: 0;
  font-size: 12px;
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0)
  );
  color: #fff;
  display: flex;
  justify-content: space-evenly;
}
.musiclistitem {
  margin-top: 25px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 10px;
  line-height: 1.5;
  /* min-height: 250px; */
}
.time {
  font-size: 13px;
  color: #999;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 150px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>