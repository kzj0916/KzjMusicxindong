<template>
  <div class="rt-songs" ref="scoll">
    <el-dropdown @command="handleCommand">
      <el-button size="mini">
        音乐
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item,index) in catt"
          :key="index"
          :command="item.name"
          :index='index'
        >{{item.name}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="title">
      <span>热门标签:</span>
      <span
        v-for="(item,index) in catlist"
        :key="index"
        style="cursor: pointer;"
        :class="[curIndex === index ? 'active' : '']"
        @click="changeMusicListCat(item.name,index)"
      >
        {{item.name}}
        <i
          style="paddingLeft:8px;color:#666;"
        >{{index === catlist.length-1 ? '' : "|"}}</i>
      </span>
    </div>
    <div class="songsList">
      <MusicListItem
        v-for="(item,index) in songsList"
        :key="index"
        :item="item"
        :wth="18"
        :topShow="false"
        :userShow="true"
      ></MusicListItem>
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
import RightTop from "views/right/RightTop";
import { getSongListCatlist, getSongList } from "network/songs";
import MusicListItem from "components/common/musiclist/MusicListItem";
export default {
  name: "RightSongs",
  components: {
    RightTop,
    MusicListItem,
  },
  data() {
    return {
      catt:[],
      catlist: [],
      songsList: [],
      totals: 0,
      limit: 30,
      offset: 0,
      cat: "全部",
      curIndex: 0,
    };
  },
  methods: {
    //分类
    getSongListCatlist() {
      getSongListCatlist().then((res) => {
        // console.log(res);
        this.catlist = res.tags.splice(0, 10);
        const arr = [...this.catlist];
        this.catt = arr.splice(0,5);
        // console.log(this.catlist);
      });
    },
    //歌单
    getSongList(limit, offset, cat) {
      getSongList(limit, offset, cat).then((res) => {
        console.log(res);
        this.songsList = res.playlists;
        this.totals = res.total;
      });
    },
    //切换分类
    changeMusicListCat(name, index) {
      console.log(name, index);
      this.curIndex = index;
      this.cat = name;
      this.getSongList(this.limit, this.offset, this.cat);
    },
    //切换页码
    handleCurrentChange(newPage) {
      this.offset = (newPage - 1) * this.limit;
      this.getSongList(this.limit, this.offset, this.cat);
      //返回顶部
       this.$refs.scoll.scrollTop = 0;
    },
    //切换分类
    handleCommand(command,index) {
      // console.log(index.$attrs.index);
        this.curIndex = index.$attrs.index;
        this.cat = command;
        this.getSongList(this.limit, this.offset, this.cat);
    }
  },
  created() {
    this.getSongListCatlist();
    this.getSongList(this.limit, this.offset, this.cat);
  },
};
</script>
<style scoped>
.active {
  color: red;
}
.songsList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.title {
  font-size: 13px;
  margin-top: 8px;
}
.title span {
  margin: 0 8px;
}
.rt-songs {
  width: 90%;
  height: 620px;
  max-height: 620px;
  overflow: auto;
  margin: 0 auto;
  padding-right: 30px;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>