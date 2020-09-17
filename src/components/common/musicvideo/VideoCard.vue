<template>
  <div class="mvsimicard">
    <div class="simi-img" @click="togMv(simis.vid)">
      <img :src="simis.coverUrl " alt="404" />
      <div class="r-top">
        <i class="el-icon-video-camera"></i>
        {{simis.playTime > 10000 ? (simis.playTime/10000).toFixed(0) + '万' : simis.playTime}}
      </div>
    </div>
    <div class="simi-content">
      <div class="simi-title">
        <span class="simi-mv">视频</span>
        <span>{{simis.title}}</span>
      </div>
      <p style="fontSize:13px;color:#888;marginBottom:10px">{{simis.durationms | showTime}}</p>
      <div
        style="fontSize:13px;color:#888;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
        v-if="simis.creator.length > 1"
      >
        <i
          v-for="(item,index) in simis.creator"
          :key="item.userId"
        >{{simis.creator.length === index+1 ? item.userName : item.userName + '/' }}</i>
      </div>
      <span style="fontSize:13px;color:#888" v-else>{{simis.creator[0].userName}}</span>
    </div>
  </div>
</template>

<script>
import {timeFormat } from 'common/uctil'
export default {
  name: "MvSimiCard",
  props: {
    //传入数据
    simis: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods:{
    //跳转到播放页
      togMv(id){
          console.log(id);
          this.$router.push('/videos' + id);
      }
  },
  filters:{
    // 时间过滤 显示格式为 00:00
      showTime(value){
          return timeFormat(value);
      }
  },
  
};
</script>

<style scoped>
.mvsimicard {
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.simi-img {
  width: 46%;
  position: relative;
  cursor: pointer;
}
.simi-content {
  width: 46%;
}
.simi-img img {
  width: 100%;
}
.simi-img .r-top {
  position: absolute;
  top: 2px;
  right: 3px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.03),
    rgba(0, 0, 0, 0.4)
  );
  color: #f5f5f7;
  font-size: 13px;
}
.simi-mv {
  font-size: 13px;
  padding: 3px 2px;
  border: 1px solid red;
  display: inline;
  margin-right: 4px;
}
.simi-title {
  width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  display: inline-block;
  padding: 15px 0;
}
</style>