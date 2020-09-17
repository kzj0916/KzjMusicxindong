<template>
  <div class="singmv" @click="toPlayMv(mvss.id)">
    <div class="mv-img">
      <img :src="mvss.picUrl || mvss.imgurl" alt="404" />
      <div class="mv-right" v-show="mvright">
        <i class="el-icon-video-camera"></i>
        {{mvss.playCount > 1000 ? (mvss.playCount/10000).toFixed(0) + '万' : mvss.playCount}}
      </div>
      <div class="mv-time" v-show="mvtime">{{mvss.duration | showTime}}</div>
    </div>
    <p class="mv-name">{{mvss.name}}</p>
  </div>
</template>

<script>
import { timeFormat } from "common/uctil";
export default {
  name: "SingerMvCard",
  props: {
    mvss: {
      type: Object,
      default() {
        return {};
      },
    },
    mvright:{
      type:Boolean,
      default:true,
    },
    mvtime:{
      type:Boolean,
      default:true,
    },
  },
  methods:{
      toPlayMv(id){
        if(this.mvss.picUrl){
          // console.log("歌手");
          this.$router.push("/singer" + id);
        }else{
          // console.log(id);
          this.$router.push("/mvvideo" + id);
        }
      }
  },
  filters: {
    showTime(value) {
      return timeFormat(value);
    },
  },
};
</script>

<style scoped>
.mv-name {
  margin-top: 5px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.singmv {
  width: 18%;
  margin-top: 25px;
  cursor: pointer;
}
.mv-img {
  position: relative;
  width: 100%;
  color: #f5f5f5;
  font-size: 14px;
}
.mv-img img {
  width: 100%;
}
.mv-right {
  position: absolute;
  top: 2px;
  right: 3px;
}
.mv-time {
  position: absolute;
  bottom: 2px;
  left: 3px;
}
</style>