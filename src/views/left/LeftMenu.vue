<template>
  <div class="leftmenu">
    <el-menu :default-openeds="['1']" default-active="1-1">
      <el-submenu index="1">
        <template slot="title">
          <i></i>推荐
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="findMusic">
            <i class="el-icon-magic-stick"></i>发现音乐
          </el-menu-item>
          <el-menu-item index="1-2" @click="toMyseilfFM">
            <i class="el-icon-news"></i>私人FM
          </el-menu-item>
          <el-menu-item index="1-3" @click="toLiveStream">
            <i class="el-icon-video-camera-solid"></i>LOOK直播
          </el-menu-item>
          <el-menu-item index="1-4" @click="togMusicvideo">
            <i class="el-icon-video-camera"></i>视频
          </el-menu-item>
          <el-menu-item index="1-5" @click="togFriend">
            <i class="el-icon-s-custom"></i>朋友
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i></i>我的音乐
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
            <i class="el-icon-bangzhu"></i>本地音乐
          </el-menu-item>
          <el-menu-item index="2-2">
            <i class="el-icon-download"></i>下载管理
          </el-menu-item>
          <el-menu-item index="2-3">
            <i class="el-icon-cloudy"></i>我的音乐云盘
          </el-menu-item>
          <el-menu-item index="2-4">
            <i class="el-icon-coin"></i>我的电台
          </el-menu-item>
          <el-menu-item index="2-5">
            <i class="el-icon-star-off"></i>我的收藏
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i></i>创建的歌单
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="'3-'+index"
            v-for="(item,index) in getUserSonglist"
            :key="item.id"
            class="song-list"
            @click="togSonglist(item.id)"
          >
            <i :class="[index === 0 ? 'el-icon-star-on' : 'el-icon-s-data']"></i>
            {{item.name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import {getUserAnchor} from 'network/login'
import { mapGetters } from "vuex";
export default {
  name: "LeftMenu",
  data() {
    return {
      currentUserInfo:
        window.localStorage.getItem("currentUserInfo") === "null"
          ? null
          : JSON.parse(window.localStorage.getItem("currentUserInfo")),
    };
  },
  methods: {
    toLiveStream(){
      this.$router.push('/livestreaming');
    },
    toMyseilfFM(){
      this.$router.push('/myseilffm');
    },
    togFriend(){
      this.$router.push('/friends');
    },
    togMusicvideo(){
      this.$router.push('/musicvideo');
    },
    togSonglist(id) {
      console.log(id);
      this.$router.push("/songs" + id);
    },
    findMusic() {
      this.$router.push("/home/rtstyle");
    },
    getUserAnchor(uid){
      getUserAnchor(uid).then(res => {
        console.log(res);
      })
    },
  },
  created() {
    // console.log(this.currentUserInfo.userId);
    if(this.currentUserInfo){
      this.getUserAnchor(this.currentUserInfo.userId);
    }
    // setTimeout(res => {
    //   // console.log(this.getUserSonglist);
    //   console.log(this.currentUserInfo);

    // },1000)
  },
  computed: {
    ...mapGetters(["getUserSonglist"]),
  },
};
</script>

<style scoped>
/* .leftmenu{
  position: relative;
  height: 600px;
}
.left-container{
  position: absolute;
  top: 0px;
  height: 600px;
  bottom: 70px;
  border: 1px solid #eee
} */
.song-list {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 255, 0.1);
  border-radius: 3px;
}
</style>