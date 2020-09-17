<template>
  <div class="search">
    <h2 style="color:#888;fontSize:14px;">
      搜索
      <span style="color:#5292fe">“{{keywords}}”</span>找到
      <span style="color:#333">{{totals}}</span>首单曲
    </h2>
    <div style="width:90%;margin:0 auto;marginTop:10px;">
      <el-table :data="playList" style="width: 100%" :lazy="true" @row-dblclick="playMusicList">
        <el-table-column type="index" width="70"></el-table-column>
        <el-table-column label="操作" width="70">
          <a href class="icon" slot-scope="scope" @click.prevent.stop="addCollect(scope.row.id)">
            <i :class="[scope.row.id === currIndex ? 'el-icon-star-on':'el-icon-star-off']"></i>
            <!-- <i class="el-icon-star-on" ></i> -->
          </a>
          <a href="#" class="icon">
            <i class="el-icon-download"></i>
          </a>
        </el-table-column>
        <el-table-column prop="name" label="音乐标题" width="280"></el-table-column>
        <el-table-column prop="artists[0].name" label="歌手" width="200"></el-table-column>
        <el-table-column prop="album.name" label="专辑"></el-table-column>
        <el-table-column label="时长" width="100">
          <span slot-scope="scope">{{scope.row.duration | showTime}}</span>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getSearchAll } from "network/search";
import { timeFormat } from "common/uctil";
import { getMusicUrl, getMusicMenu } from "network/home";
import { NOW_MUSICMENU, NOW_MUSIC } from "@/store/mutationType";
export default {
  name: "SearchMain",
  data() {
    return {
      keywords: "",
      totals: 0,
      playList: [],
      currIndex: 0,
    };
  },
  methods: {
    //播放音乐
    playMusicList(row) {
      // console.log(row.id);
      this.getMusicUrl(row.id);
      this.getMusicMenu(row.id);
    },
    //加入收藏
    addCollect(id) {
      this.currIndex = id;
      // console.log(id);
    },
    //获取搜索的所有歌曲
    getSearchAll(keywords, limit, offset, type) {
      getSearchAll(keywords, limit, offset, type).then((res) => {
        // console.log(res);
        this.totals = res.result.songCount;
        this.playList = res.result.songs;
        // console.log(this.totals);
        // console.log(this.playList);
      });
    },
    //设置当前播放地址
    getMusicUrl(id) {
      getMusicUrl(id).then((res) => {
        this.$store.commit(NOW_MUSIC, res.data[0].url);
      });
    },
    //设置当前播放信息
    getMusicMenu(id) {
      getMusicMenu(id).then((res) => {
        this.$store.commit(NOW_MUSICMENU, res.songs[0]);
      });
    },
  },
  created() {
    // this.getSearchAll();
    this.keywords = this.$route.params.keywords;
    // console.log(this.keywords);
    this.getSearchAll(this.keywords, 30, 0, 1);
  },
  filters: {
    showTime(value) {
      return timeFormat(value);
    },
  },
  watch: {
    // 利用watch方法检测路由变化：
    $route: function (to, from) {
      // 拿到目标参数 to.params.id 去再次请求数据接口
      // console.log(to.params.keywords);
      if(to.params.keywords === undefined) return;
      this.keywords = to.params.keywords;
      this.getSearchAll(this.keywords, 30, 0, 1);
    },
  },
};
</script>

<style scoped>
.icon i {
  color: #ccc;
  font-size: 17px;
  margin-right: 5px;
}
.icon:hover i {
  color: red;
}
.search {
  width: 100%;
  max-height: 630px;
  padding-top: 25px;
  overflow: auto;
}
</style>