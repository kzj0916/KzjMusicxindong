<template>
  <div class="songs" ref="singerMenu">
    <div class="s-img">
      <img :src="singerMessage.picUrl" alt="404" />
      <div class="myself" @click="toMyself(singerMessage.accountId)">
        <i class="el-icon-user"></i>
        <span>个人主页</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="s-menu">
      <div class="title">
        <div>
          <span class="tol">歌手</span>
          <span class="title-a">{{singerMessage.name}}</span>
        </div>
        <div class="like">
          <span @click="addLike(singerMessage.id)">
            <i :class="likeClass">{{likeContent}}</i>
          </span>
        </div>
      </div>
      <div class="title-son" style="marginTop:30px">
        <span>
          <i class="el-icon-service" style="fontSize:18px"></i>
          单曲数 : {{singerMessage.musicSize}}
        </span>
      </div>
      <div class="title-son">
        <span>
          <i class="el-icon-film" style="fontSize:18px"></i>
          专辑数 : {{singerMessage.albumSize}}
        </span>
      </div>
      <div class="title-son">
        <span>
          <i class="el-icon-video-camera" style="fontSize:18px"></i>
          MV数 : {{singerMessage.mvSize}}
        </span>
      </div>
      <div class="title-son">
        <i class="el-icon-mic" style="fontSize:18px"></i>
        <a href="#" class="showTime">演出数 : 1</a>
      </div>
    </div>
    <div class="songstable" style="width:90%;marginTop:20px;">
      <el-tabs v-model="activeName" @tab-click="handleClick" style="marginLeft:50px;">
        <el-tab-pane label="专辑" name="first">
          <SingerAlbum :tableList="singerSongs"></SingerAlbum>
          <SingerAlbum
            :tableList="item.songs"
            v-for="(item,index) in albumAll"
            :key="index"
            style="marginTop:20px"
          >
            <img :src="item.album.picUrl" alt slot="albumImg" />
            <el-table-column type="index" width="120" :label="item.album.name" slot="albumTitle"></el-table-column>
          </SingerAlbum>
        </el-tab-pane>
        <el-tab-pane label="MV" name="second">
          <div class="singer-mv">
            <SingerMvCard v-for="item in mvss" :key="item.id" :mvss="item"></SingerMvCard>
          </div>
          <el-pagination
            background
            :page-size="limits"
            layout="prev, next"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="歌手详情" name="three">
          <SingerBrief :self="singerSelf" :contents="briefs"></SingerBrief>
        </el-tab-pane>
        <el-tab-pane label="相似歌手" name="four">
          <div class="singer-mv">
            <SingerMvCard
              v-for="item in simis"
              :key="item.id"
              :mvss="item"
              :mvright="false"
              :mvtime="false"
            ></SingerMvCard>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="演出" name="five">演出</el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  getSingerArt,
  getSingerAlbum,
  getSingerAlbumAll,
  getSingerMv,
  getSingerDesc,
  getSingerSimi,
} from "network/singer";
import SingerAlbum from "components/common/singerlist/SingerAlbum";
import SingerMvCard from "components/common/singerlist/SingerMvCard";
import SingerBrief from "components/common/singerlist/SingerBrief";
export default {
  name: "SingerMenu",
  components: {
    SingerAlbum,
    SingerMvCard,
    SingerBrief,
  },
  data() {
    return {
      id: 0,
      activeName: "first",
      count: 0,
      singerMessage: {},
      singerSongs: [],
      albumAll: [],
      mvss: [],
      briefs: [],
      singerSelf: "",
      end: true,
      offsets: 0,
      limits: 20,
      simis: [],
      liked: false,
      likeContent: "收藏",
      likeClass: "el-icon-first-aid-kit",
    };
  },
  methods: {
    //右上角的收藏按钮
    addLike(id) {
      // console.log(id);
      this.liked = !this.liked;
      if (this.liked) {
        // console.log("收藏成功");
        this.$toast.show("收藏成功", 1500);
        this.likeClass = "el-icon-success";
        this.likeContent = "已收藏";
      } else {
        // console.log("确认取消收藏吗");
        if (window.confirm("确定取消收藏吗？")) {
          this.likeContent = "收藏";
          this.likeClass = "el-icon-first-aid-kit";
          return true;
        } else {
          this.liked = true;
          return false;
        }
      }
    },
    //切换页码
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.offsets = (newPage - 1) * this.limits;
      this.getSingerMv(this.id, this.limits, this.offsets);
    },
    //切换那个标题 再请求相应数据
    handleClick(tab, event) {
      // console.log(tab, event);
      switch (tab.name) {
        case "second":
          this.getSingerMv(this.id);
          break;
        case "three":
          this.getSingerDesc(this.id);
          break;
        case "four":
          this.getSingerSimi(this.id);
          break;
        default:
          this.getSingerArt(this.id);
      }
    },
    getSingerArt(id) {
      getSingerArt(id).then((res) => {
        // console.log(res);
        // console.log(res.artist);
        this.singerMessage = res.artist;
        this.singerSongs = res.hotSongs;
      });
    },
    getSingerAlbum(id) {
      getSingerAlbum(id).then((res) => {
        // console.log(res.hotAlbums);
        res.hotAlbums.map((item) => {
          this.getSingerAlbumAll(item.id);
        });
      });
    },
    getSingerAlbumAll(id) {
      getSingerAlbumAll(id).then((res) => {
        // console.log(res);
        this.albumAll.push(res);
        // console.log(this.albumAll);
      });
    },
    getSingerMv(id, limit, offset) {
      getSingerMv(id, limit, offset).then((res) => {
        console.log(res.mvs);
        this.mvss = res.mvs;
      });
    },
    getSingerDesc(id) {
      getSingerDesc(id).then((res) => {
        // console.log(res);
        this.singerSelf = res.briefDesc;
        this.briefs = res.introduction;
        this.briefs.forEach((item) => {
          //简单对数据处理 便于展示美观
          item.txt = item.txt.replace(/▪/g, "<br/>▪");
          // item.txt = item.txt.replace(/^\d{4}'年'$/g, "111");
        });
        // console.log(this.singerSelf);
        // console.log(this.briefs);
      });
    },
    getSingerSimi(id) {
      getSingerSimi(id).then((res) => {
        console.log(res);
        this.simis = res.artists;
      });
    },
    //跳转到歌手详情 暂无
    toMyself(id) {
      console.log(id);
    },
    handleScroll() {
      let scrollHeight = this.$refs.singerMenu.scrollHeight; // div里内容的高度，根据内容的增加和减少变化
      let scrollTop = this.$refs.singerMenu.scrollTop; // 滚动条的最上端到，div上端内里框框的高度
      let clientHeight = this.$refs.singerMenu.clientHeight; // div内里框框的高度，是死的
      if (scrollHeight - clientHeight == scrollTop) {
        console.log("到达底部");
        if (this.end) {
          this.getSingerAlbum(this.id);
        }
        this.end = false;
      }
    },
  },
  created() {
    this.id = parseInt(this.$route.params.id);
    // console.log(this.id);
    this.getSingerArt(this.id);
    // this.getSingerAlbum(this.id);
    // this.getSingerAlbumAll(80003734);
  },
  mounted() {
    console.log("进入");
    this.$refs.singerMenu.addEventListener("scroll", this.handleScroll, true);
  },
  beforeDestroy() {
    console.log("离开了");
    this.$refs.singerMenu.removeEventListener(
      "scroll",
      this.handleScroll,
      true
    );
  },
  watch: {
    // 利用watch方法检测路由变化：
    $route: function (to, from) {
      // 拿到目标参数 to.params.id 去再次请求数据接口
      console.log(to.params.id);
      this.id = parseInt(to.params.id);
      this.getSingerSimi(this.id);
      this.getSingerArt(this.id);
    },
  },
};
</script>

<style scoped>
.bottom-btn {
  display: flex;
}
.singer-mv-left,
.singer-mv-right {
  width: 30px;
  height: 30px;
  background: #f4f4f5;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.singer-mv-left {
  margin-left: 50px;
  margin-right: 15px;
}
.singer-mv {
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-bottom: 30px;
}
.myself {
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.9);
  padding: 5px 10px;
  font-size: 14px;
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 15px;
  cursor: pointer;
}
.myself:hover {
  background: rgba(0, 0, 0, 0.3);
}
.showTime {
  text-decoration: underline;
  color: #666;
}
.title-son {
  margin-top: 10px;
  font-size: 14px;
}
.like {
  border: 1px solid #e1e1e2;
  padding: 4px 8px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
}
.like:hover {
  background: #f5f5f7;
}
.songs {
  display: flex;
  flex-wrap: wrap;
  max-height: 630px;
  overflow: auto;
  padding-top: 30px;
}
.songstable {
  position: relative;
}
.s-img {
  width: 20%;
  margin: 0 20px;
  position: relative;
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
</style>