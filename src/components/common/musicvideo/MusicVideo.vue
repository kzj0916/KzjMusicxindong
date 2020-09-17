<template>
  <div class="musicvideo" ref="scroll">
    <div class="musicvideo-main">
      <div class="musicvideo-btm">
        <el-button :class="[isTog ? 'active' : '']" size="small" round @click.native="togVideo">视频</el-button>
        <el-button :class="[isTog ? '' : 'active']" size="small" round @click.native="togMv">MV</el-button>
      </div>
      <div class="title">
        <span>热门标签:</span>
        <span
          v-for="(item,index) in catlist"
          :key="index"
          style="cursor: pointer;"
          :class="[curIndex === index ? 'actived' : '']"
          @click="changeMusicListCat(item.name,index)"
        >
          {{item.name}}
          <i
            style="paddingLeft:8px;color:#666;"
          >{{index === catlist.length-1 ? '' : "|"}}</i>
        </span>
      </div>
      <div class="videosList">
        <VideoItem
          v-for="item in videosList"
          :key="item.id"
          :item="item.data"
          :wth="24"
          :topShow="false"
          :userShow="true"
          v-show="isTog"
        ></VideoItem>
        <MusicListItem
          v-for="item in mvList"
          :key="item.id"
          :item="item"
          :wth="24"
          :topShow="false"
          :userShow="true"
          :mvType="true"
          v-show="!isTog"
        ></MusicListItem>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :page-size="limit"
        :total="totals"
        @current-change="handleCurrentChange"
        style="textAlign:center;margin:0 auto;marginBottom:20px"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getVideoTitleList,
  getVideoGroups,
  getVideoAll,
} from "network/musicvideo";
import VideoItem from "components/common/musicvideo/VideoItem";
import MusicListItem from "components/common/musiclist/MusicListItem";
export default {
  name: "MusicVideo",
  components: {
    VideoItem,
    MusicListItem,
  },
  data() {
    return {
      isTog: true,//是否切换
      curIndex: 0,//标签下标
      catlist: [],//标签
      videosList: [],//视频
      mvList: [],//Mv
      limit: 20,//每次显示数量
      totals: 0,//总数
      offset: 0,//偏移量
      titleIds: [],//标签id
      mvTitles: [
        { name: "内地" },
        { name: "港台" },
        { name: "欧美" },
        { name: "韩国" },
        { name: "日本" },
      ],//mv标签接口未找到 自己写的
    };
  },
  methods: {
    //请求视频数据
    getVideoGroups(id, offset) {
      getVideoGroups(id, offset).then((res) => {
        //判断本地是否有用户信息 没有则提示 
        if (window.localStorage.getItem("currentUserInfo") === "null") {
          return this.$message.error("需要登录获取视频数据!");
        }
        this.videosList = res.datas;
      });
    },
    //请求MV数据
    getVideoAll(area, limit, offset) {
      getVideoAll(area, limit, offset).then((res) => {
        // console.log(res);
        //注意只有第一次请求有count 所以只在切换标签时执行一次就行
        if(this.totals === 0){
           this.totals = res.count;
        }
        this.mvList = res.data;
      });
    },
    //页码切换时的操作
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.offset = (newPage - 1) * this.limit;
      //判断时视频界面还是MV界面 再相应的获取数据
      if (this.isTog) {
        this.getVideoGroups(this.titleIds[index], this.offset);
      } else {
        this.getVideoAll(
          this.mvTitles[this.curIndex].name,
          this.limit,
          this.offset
        );
      }
      // //返回顶部
      this.$refs.scroll.scrollTop = 0;
    },
    //切换视频
    togVideo() {
      if (this.isTog) return;
      console.log("切换了视频");
      this.isTog = true;
      this.getVideoTitleList();
      this.curIndex = 0;
      this.offset = 0;
      this.totals = 0;
    },
    //切换MV
    togMv() {
      if (!this.isTog) return;
      console.log("切换了mv");
      this.isTog = false;
      this.totals = 0;
      this.curIndex = 0;
      this.offset = 0;
      this.getVideoAll(
        this.mvTitles[this.curIndex].name,
        this.limit,
        this.offset
      );
      this.catlist = this.mvTitles;
    },
    //切换标签
    changeMusicListCat(name, index) {
      if (this.isTog) {
        this.curIndex = index;
        this.offset = 0;
        this.getVideoGroups(this.titleIds[index], this.offset);
      } else {
        this.curIndex = index;
        this.offset = 0;
        this.totals = 0;
        this.getVideoAll(
          this.mvTitles[this.curIndex].name,
          this.limit,
          this.offset
        );
      }
    },
    //获取视频标签分类
    getVideoTitleList() {
      getVideoTitleList().then((res) => {
        this.catlist = res.data.splice(0, 9);
        if (this.catlist.length === 9) {
          this.catlist.map((res) => {
            this.titleIds.push(res.id);
          });
          this.getVideoGroups(this.titleIds[0], this.offset);
        }
      });
    },
  },
  created() {
    //默认是视频页 请求视频页数据 参数有默认值，可不传
    this.getVideoTitleList();
  },
};
</script>

<style scoped>
.videosList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.title {
  font-size: 13px;
  margin-top: 15px;
  color: #888;
}
.active {
  background: skyblue;
  color: #f5f5f7;
}
.actived {
  color: red;
}
.musicvideo {
  width: 100%;
  padding-top: 20px;
  overflow: auto;
  max-height: 630px;
}
.musicvideo-main {
  width: 90%;
  margin: 0 auto;
}
.musicvideo-btm {
  display: flex;
  justify-content: center;
}
</style>