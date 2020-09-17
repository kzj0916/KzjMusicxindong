<template>
  <div class="songs" ref="table">
    <div class="s-img">
      <img :src="anchorMenus.picUrl" alt="404" />
    </div>
    <div class="s-menu">
      <div class="title">
        <div>
          <span class="tol">电台</span>
          <span class="title-a">{{anchorMenus.name}}</span>
        </div>
      </div>
      <div class="time">
        <a href="#">
          <img :src="users.avatarUrl" alt="404" />
        </a>
        <a href="#" class="source">{{users.nickname}}</a>
      </div>
      <div class="btn">
        <el-button size="mini" type="primary" icon="el-icon-video-play">
          播放全部
          <button class="btn-a">+</button>
        </el-button>
        <el-button size="small" icon="el-icon-star-off" @click="subscripe(songList.id)">订阅({{anchorMenus.subCount}})</el-button>
        <el-button size="small" icon="el-icon-thumb">分享({{anchorMenus.shareCount}})</el-button>
      </div>
      <div class="tag">
        <span class="ti">{{anchorMenus.category}}</span>
        <span>{{anchorMenus.rcmdText}}</span>
      </div>
      <div class="brief">
        <p>{{users.signature}}</p>
        <p>{{anchorMenus.desc}}</p>
      </div>
    </div>
    <div class="songstable" style="width:90%;marginTop:20px;">
      <el-tabs v-model="activeName" @tab-click="handleClick" style="marginLeft:50px;">
        <el-tab-pane label="节目" name="first">
          <AnchorProgram :load="load" :numbers="count"></AnchorProgram>
        </el-tab-pane>
        <el-tab-pane :label="'订阅者('+anchorMenus.subCount+')'" name="third">
          <AnchorSubscr></AnchorSubscr>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AnchorProgram from "./AnchorProgram";
import AnchorSubscr from "./AnchorSubscr";

import { getAnchorDetail } from "network/anchor";
export default {
  name: "AnchorList",
  components: {
    AnchorSubscr,
    AnchorProgram,
  },
  data() {
    return {
      id: 0,
      ids: [],
      anchorMenus: {},
      users:{},
      activeName: "first",
      load: false,
      count: 0,
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    //获取电台基本数据
    getAnchorDetail(id) {
      getAnchorDetail(id).then((res) => {
        // console.log(res);
        this.anchorMenus = res.djRadio;
        this.users =res.djRadio.dj;
        // console.log(this.anchorMenus);
      });
    },
  },
  created() {
    this.id = parseInt(this.$route.params.id);
    this.getAnchorDetail(this.id);
  },
};
</script>

<style scoped>
.songs {
  display: flex;
  flex-wrap: wrap;
  max-height: 680px;
  overflow: auto;
  padding-top: 30px;
}
.songstable {
  position: relative;
}

.brief {
  font-size: 14px;
  margin-top: 5px;
}
.brief p {
  margin-top: 13px;
  line-height: 1.4;
}
.tag {
  margin-top: 15px;
  font-size: 13px;
}
.tag .ti {
  border: 1px solid #44aaf8;
  color: #44aaf8;
  padding: 2px;
  font-size: 12px;
}
.tag span {
  margin-right: 8px;
}
.tag a {
  color: #0c73c2;
}
.btn {
  margin-top: 15px;
}
.btn-a {
  background: #409eff;
  cursor: pointer;
  border: none;
  color: #fff;
}
.time {
  margin-top: 15px;
}
.time-t {
  font-size: 13px;
  color: #333;
}
.time img {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  vertical-align: middle;
}
.source {
  color: rgba(255, 0, 0, 0.7);
  margin-right: 8px;
}
.source:hover {
  color: red;
}
.s-img {
  width: 20%;
  margin: 0 20px;
}
.s-img img {
  width: 100%;
}
.s-menu {
  width: 70%;
  display: flex;
  flex-direction: column;
}
.title {
  display: flex;
  justify-content: space-between;
}
.tol {
  background: red;
  font-size: 14px;
  color: #fff;
  padding: 2px 6px;
  margin-right: 7px;
}
.title-a {
  font-size: 23px;
  font-weight: 10px;
}
.r-nums {
  display: flex;
  color: #ccc;
  font-size: 14px;
  min-width: 110px;
  min-height: 30px;
}
.sums {
  border-right: 1px solid #ccc;
  padding-right: 8px;
  position: relative;
}
.plays {
  position: relative;
  padding-left: 15px;
}
.sums p {
  position: absolute;
  right: 8px;
  top: 17px;
}
.plays p {
  position: absolute;
  right: 0;
  top: 17px;
}
</style>