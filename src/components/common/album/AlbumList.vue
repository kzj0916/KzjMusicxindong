<template>
  <div class="albumlist" v-if="albumMenu.id" ref="albumScroll">
    <div class="albumlist-top">
      <div class="albumlist-img">
        <img :src="albumMenu.picUrl" alt="404" />
      </div>
      <div class="albumlist-content">
        <span class="span-ti">专辑</span>
        <span style="fontSize:20px">{{albumMenu.name}}</span>
        <p style="marginBottom:20px"></p>
        <el-button size="mini" type="primary" icon="el-icon-video-play">
          播放全部
          <button class="btn-a">+</button>
        </el-button>
        <el-button
          size="small"
          icon="el-icon-star-off"
          @click="subscripe(1)"
        >收藏({{albumMenu.info.likedCount}})</el-button>
        <el-button size="small" icon="el-icon-thumb">分享({{albumMenu.info.shareCount}})</el-button>
        <el-button size="small" icon="el-icon-download">vip下载</el-button>
        <p style="margin:20px 0;fontSize:14px">
          歌手 :
          <i style="color:#888">{{albumMenu.artist.name}}</i>
        </p>
        <p style="fontSize:14px">
          时间 :
          <i style="color:#888">{{albumMenu.publishTime | showDate}}</i>
        </p>
      </div>
    </div>
    <div class="albumlist-btm">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="歌曲列表" name="first">
          <el-table :data="albumSong" style="width: 100%" @row-dblclick="playMusicList">
            <el-table-column type="index" label="序号" width="70"></el-table-column>
            <el-table-column label="操作" width="70">
              <a
                href
                class="icon"
                slot-scope="scope"
                @click.prevent.stop="addCollect(scope.row.id)"
              >
                <i class="el-icon-star-off" v-if="isshow"></i>
                <i class="el-icon-star-on" v-else></i>
                <i class="el-icon-download"></i>
              </a>
            </el-table-column>
            <el-table-column prop="name" label="音乐标题" width="280"></el-table-column>
            <el-table-column prop="ar[0].name" label="歌手" width="200"></el-table-column>
            <el-table-column prop="al.name" label="专辑"></el-table-column>
            <el-table-column prop="dt" label="时长" width="100">
              <span slot-scope="scope">{{scope.row.dt |showTime}}</span>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="'评论('+albumMenu.info.commentCount+')'" name="second">
          <MvComment :comments="albumComment"></MvComment>
          <el-pagination
            background
            :page-size="limits"
            layout="prev, next"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="专辑详情" name="third">
          <h2 style="fontSize:20px;margin:20px 0;fontWeight:bold;">专辑简介</h2>
          <p style="color:#888;fontSize:14px;textIndent:2em">{{albumMenu.description}}</p>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import SingerAlbum from "components/common/singerlist/SingerAlbum";
import MvComment from "components/common/singerlist/MvComment";
import { getMusicUrl, getMusicMenu } from "network/home";
import { NOW_MUSICMENU, NOW_MUSIC } from "@/store/mutationType";
import { getSingerAlbumAll } from "network/singer";
import { getNewAlbumComment } from "network/newSongs";
import { formatDate, timeFormat } from "common/uctil";
export default {
  name: "AlbumList",
  components: {
    SingerAlbum,
    MvComment,
  },
  data() {
    return {
      activeName: "first",
      id: 0,
      albumMenu: [],
      albumSong: [],
      albumComment: [],
      isshow: true,
      limits:20,
      offsets:0,
    };
  },
  methods: {
    //页面改变操作 newPage默认是从1开始的哦
    handleCurrentChange(newPage) {
      //   console.log(newPage); 
      this.offsets = (newPage - 1) * this.limits;
      this.getNewAlbumComment(this.id, this.limits, this.offsets);
      this.$refs.albumScroll.scrollTop = 230;
    },
    //收藏 暂无
    subscripe(id) {
      console.log(id);
    },
    // 添加收藏 
    addCollect(id) {
      console.log(id);
      this.isshow = !this.isshow;
    },
    // 标题切换
    handleClick(tab, event) {
      // console.log(tab, event);
      //不同的标题请求不同的数据
      switch (tab.name) {
        case "second":
          this.getNewAlbumComment(this.id);
          break;
        default:
          this.getSingerAlbumAll(this.id);
      }
    },
    //获取歌手全部专辑
    getSingerAlbumAll(id) {
      getSingerAlbumAll(id).then((res) => {
        // console.log(res);
        this.albumMenu = res.album;
        this.albumSong = res.songs;
      });
    },
    //获取专辑评论
    getNewAlbumComment(id,limit,offset) {
      getNewAlbumComment(id,limit,offset).then((res) => {
        // console.log(res);
        if(this.offsets > 0){
          this.albumComment = [...res.comments];
        }else{
          this.albumComment = [...res.hotComments, ...res.comments];
        }
      });
    },
    //获取播放地址
    getMusicUrl(id) {
      getMusicUrl(id).then((res) => {
        this.$store.commit(NOW_MUSIC, res.data[0].url);
      });
    },
    //获取歌曲信息
    getMusicMenu(id) {
      getMusicMenu(id).then((res) => {
        this.$store.commit(NOW_MUSICMENU, res.songs[0]);
      });
    },
    //播放音乐
    playMusicList(row) {
      // console.log(row.id);
      if (row.id === null) return;
      this.getMusicUrl(row.id);
      this.getMusicMenu(row.id);
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getSingerAlbumAll(this.id);
  },
  filters: {
    //日期过滤
    showDate(value) {
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd");
    },
    //时间过滤
    showTime(value) {
      return timeFormat(value);
    },
  },
};
</script>

<style scoped>
.btn-a {
  background: #409eff;
  cursor: pointer;
  border: none;
  color: #fff;
}
.albumlist {
  margin-top: 30px;
  width: 100%;
  max-height: 630px;
  overflow: auto;
}
.albumlist-top,
.albumlist-btm {
  width: 90%;
  margin: 0 auto;
}
.albumlist-top {
  display: flex;
}
.albumlist-img {
  width: 20%;
}
.albumlist-img img {
  width: 100%;
}
.albumlist-content {
  width: 55%;
  margin-left: 30px;
}
.span-ti {
  border: 1px solid red;
  padding: 2px 4px;
  font-size: 13px;
  background: red;
  color: #fff;
  margin-right: 8px;
}
</style>