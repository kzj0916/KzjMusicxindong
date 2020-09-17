<template>
  <div class="songs" ref="table">
    <div class="s-img">
      <img :src="songList.coverImgUrl" alt="404" />
    </div>
    <div class="s-menu">
      <div class="title">
        <div>
          <span class="tol">歌单</span>
          <span class="title-a">{{songList.name}}</span>
        </div>
        <div class="r-nums">
          <div class="sums">
            歌曲数
            <p>{{songList.trackCount}}</p>
          </div>
          <div class="plays">
            播放数
            <p>{{(songList.playCount/10000).toFixed(0)}}万</p>
          </div>
        </div>
      </div>
      <div class="time">
        <a href="#">
          <img :src="creators.avatarUrl" alt="404" />
        </a>
        <a href="#" class="source">{{creators.nickname}}</a>
        <span class="time-t">{{songList.createTime | showDate}}创建</span>
      </div>
      <div class="btn">
        <el-button size="mini" type="primary" icon="el-icon-video-play"  @click="playAll(songList.id)">
          播放全部
          <button class="btn-a"  @click.stop="subscripe(songList.id)">+</button>
        </el-button>
        <el-button
          size="small"
          icon="el-icon-star-off"
          @click="subscripe(songList.id)"
        >收藏({{songList.subscribedCount}})</el-button>
        <el-button size="small" icon="el-icon-thumb">分享({{songList.shareCount}})</el-button>
        <el-button size="small" icon="el-icon-download">下载全部</el-button>
      </div>
      <div class="tag">
        <span>标签:</span>
        <a
          href="#"
          v-for="(item,index) in songList.tags"
          :key="index"
        >{{index+1 === songList.tags.length ? item : item+' / '}}</a>
      </div>
      <div class="brief">
        <span style="marginRight:8px">简介:</span>
        <span style="lineHeight:1.5">{{(songList.description + '').substr(0,200) + '...' }}</span>
      </div>
    </div>
    <div class="songstable" style="width:90%;marginTop:20px;">
      <el-tabs v-model="activeName" @tab-click="handleClick" style="marginLeft:50px;">
        <el-tab-pane label="歌曲列表" name="first">
          <SongTable :load="load" :numbers="count"></SongTable>
        </el-tab-pane>
        <el-tab-pane :label="gettalk" name="second">
          <SongComment></SongComment>
        </el-tab-pane>
        <el-tab-pane label="收藏者" name="third">
          <SongCollect></SongCollect>
        </el-tab-pane>
      </el-tabs>
      <div class="find" style="width:180px;height:40px;">
        <el-input v-model="input" placeholder="请输入内容" size="mini" suffix-icon="el-icon-search"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import SongTable from "./SongTable";
import SongCollect from "./SongCollect";
import SongComment from "./SongComment";
import { formatDate } from "common/uctil";
import { getSongListInfo} from "network/home";
import {MUSIC_LISTIDS} from '@/store/mutationType'
export default {
  name: "SongList",
  components: {
    SongTable,
    SongCollect,
    SongComment,
  },
  data() {
    return {
      id: 0,
      ids: [],
      songList: {},
      creators: {},
      activeName: "first",
      input: "",
      load: false,
      count: 0,
    };
  },
  methods: {
    //播放全部
    playAll(id){
      // console.log(id);
      // console.log(this.ids);
      //修改vuex的歌单id数据
       this.$store.commit(MUSIC_LISTIDS,this.ids);
      // this.getSongListInfoSongs(id);
    },
    //列表切换
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    //获取歌单数据
    getSongListInfo(id) {
      getSongListInfo(id).then((res) => {
        this.songList = res.playlist;
        this.creators = res.playlist.creator;
        //遍历数组把得到歌曲id放到一个数据里面
        this.songList.trackIds.forEach((item) => {
          this.ids.push(item.id);
          this.count = this.songList.trackCount;
        });
        // console.log(this.songList);
        // this.currentSongList = { ...res};
      });
    },
    // 收藏 暂无
    subscripe(id) {
      console.log(id);
    },
    //添加监听滚动条滚动事件
    listenerFunction(e) {
      window.addEventListener("scroll", this.handleScroll, true);
    },
    //判断到达一定高度时触发刷新 因为有时数据过多加载较慢 可能加载不完
    handleScroll() {
      let top = this.$refs.table.scrollTop;
      if (top > 700) {
        this.load = true;
      }
    },
  },
  mounted() {
    // console.log("进入");
    //进入添加
    document.addEventListener("scroll", this.handleScroll, true);
  },
  beforeDestroy() {
    // console.log("离开了");
    //离开清除 不然耗性能
    document.removeEventListener("scroll", this.handleScroll, true);
  },
  computed: {
    //获取评论数
    gettalk() {
      return `评论(${this.songList.commentCount})`;
    },
    getnums() {
      return this.songList.trackCount;
    },
  },
  created() {
    this.id = parseInt(this.$route.params.id);
    this.getSongListInfo(this.id);
    // console.log("生效了");
    // this.listenerFunction();
  },
  filters: {
    //日期过滤
    showDate: function (value) {
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  watch: {
    // 利用watch方法检测路由变化：
    $route: function (to, from) {
      // 拿到目标参数 to.params.id 去再次请求数据接口
      console.log(to.params.id);
      this.id = parseInt(to.params.id);
     this.getSongListInfo(this.id);
    },
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
.find {
  position: absolute;
  top: 0px;
  right: 0;
}
.brief {
  font-size: 13px;
  margin-top: 15px;
}
.tag {
  margin-top: 15px;
  font-size: 13px;
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
  width: 28px;
  margin-right: 8px;
  vertical-align: middle;
}
.source {
  color: rgba(0, 0, 255, 0.7);
  margin-right: 8px;
}
.source:hover {
  color: blue;
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
  border: 1px solid red;
  font-size: 14px;
  color: red;
  padding: 2px;
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