<template>
  <div class="s-album">
    <div class="album-img" v-if="imgShow">
      <slot name="albumImg">
        <img src="~assets/img/singer/top50.png" alt="404" />
      </slot>
    </div>
    <div class="album-list" :style="{width:wth + '%'}">
      <div class="sell-btn" @click="addCollect">
        <i class="el-icon-first-aid-kit"></i>
      </div>
      <div class="play-btn" @click="playMusicList(tableList[0])">
        <i class="el-icon-video-play"></i>
      </div>
      <el-table
        :data="tableList.slice(0,showNum)"
        style="width: 100%;cursor: pointer;"
        :lazy="true"
        @row-click="playMusicList"
        size="mini"
      >
        <slot name="albumTitle">
          <el-table-column type="index" width="90" :label="topTitle"></el-table-column>
        </slot>
        <el-table-column width="70">
          <slot name="tableicon" slot-scope="scope" :item='scope.row.album.picUrl ' v-if="images">
            <a href class="icon" @click.prevent.stop="addCollect">
              <i class="el-icon-star-off" v-if="isshow"></i>
              <i class="el-icon-star-on" v-else></i>
            </a>
            <a href="#" class="icon">
              <i class="el-icon-download"></i>
            </a>
          </slot>
        </el-table-column>
        <el-table-column prop="name" width="180"></el-table-column>
        <el-table-column prop="ar[0].name" width="100">
        </el-table-column>
        <el-table-column prop="al.name">
           <slot name="tablesinger" slot-scope="scope" :item='scope.row.album.artists' v-if="nicknameshow">
          </slot>
        </el-table-column>
        <el-table-column prop="dt" width="100">
          <span slot-scope="scope">{{scope.row.duration || scope.row.dt | singDate}}</span>
        </el-table-column>
      </el-table>
      <div class="lookAll" v-if="tableList.length > 10 && lookshow" @click="lookAll">
        查看全部{{tableList.length}}首
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { getMusicUrl, getMusicMenu } from "network/home";
import { NOW_MUSICMENU, NOW_MUSIC } from "@/store/mutationType";
import { timeFormat } from "common/uctil";
export default {
  name: "SingerAlbum",
  props: {
    tableList: {
      type: Array,
      default() {
        return [];
      },
    },
    wth: {
      type: Number,
      default: 70,
    },
    imgShow: {
      type: Boolean,
      default: true,
    },
    topTitle:{
      type:String,
      default:'热门50首'
    },
    images:{
        type:Boolean,
        default:false,
      },
    nicknameshow:{
        type:Boolean,
        default:false,
      },
  },
  data() {
    return {
      isshow: true,
      lookshow: true,
      showNum: 10,
    };
  },
  methods: {
    playMusicList(row) {
      console.log(row.id);
      if (row.id === null) return;
      this.getMusicUrl(row.id);
      this.getMusicMenu(row.id);
    },
    getMusicUrl(id) {
      getMusicUrl(id).then((res) => {
        this.$store.commit(NOW_MUSIC, res.data[0].url);
      });
    },
    getMusicMenu(id) {
      getMusicMenu(id).then((res) => {
        this.$store.commit(NOW_MUSICMENU, res.songs[0]);
      });
    },
    addCollect() {
      console.log("收藏了");
      this.isshow = !this.isshow;
    },
    //查看全部
    lookAll() {
      this.lookshow = false;
      this.showNum = this.tableList.length;
    },
  },
  filters: {
    singDate(value) {
      return timeFormat(value);
    },
  },
};
</script>

<style scoped>
.lookAll {
  display: inline-block;
  font-size: 14px;
  margin-top: 8px;
  cursor: pointer;
  color: #ccc;
}
.lookAll:hover {
  color: #666;
}
.sell-btn,
.play-btn {
  position: absolute;
  right: 36px;
  top: 11px;
  color: #666;
  z-index: 999;
  font-size: 18px;
  cursor: pointer;
}
.play-btn {
  right: 5px;
}
.sell-btn:hover,
.play-btn:hover {
  color: red;
}
.s-album {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.album-img {
  width: 150px;
  height: 150px;
}
.album-img img {
  width: 150px;
  height: 150px;
}
.album-list {
  /* width: 70%; */
  position: relative;
  padding-bottom: 20px;
}
</style>