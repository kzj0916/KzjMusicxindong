<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <el-table
      :data="tableList"
      style="width: 100%"
      @scroll.passive="handleScroll"
      :lazy="true"
      @row-click="playMusicList"
      :size="size"
    >
      <el-table-column type="index" v-if="indexShow"></el-table-column>
      <el-table-column label="操作" width="70" v-if="doShow">
        <a href class="icon" @click.prevent.stop="addCollect">
          <i class="el-icon-star-off" v-show="isshow"></i>
          <i class="el-icon-star-on" v-show="!isshow"></i>
        </a>
        <a href="#" class="icon">
          <i class="el-icon-download"></i>
        </a>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题" :width="wth1"></el-table-column>
      <el-table-column prop="ar[0].name" label="歌手" :width="wth2"></el-table-column>
      <el-table-column prop="al.name" label="专辑" v-if="anchorShow"></el-table-column>
      <el-table-column prop="dt" label="时长" :width="wth3"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getSongListInfoSongs,
  getSongListInfo,
  getMusicUrl,
  getMusicMenu,
} from "network/home";
import { NOW_MUSICMENU, NOW_MUSIC, SET_COUNT } from "@/store/mutationType";
import { timeFormat } from "common/uctil";
export default {
  name: "SongTable",
  props: {
    doShow: {
      type: Boolean,
      default: true,
    },
    indexShow: {
      type: Boolean,
      default: true,
    },
    anchorShow: {
      type: Boolean,
      default: true,
    },
    load: {
      type: Boolean,
      default: false,
    },
    numbers: {
      type: Number,
      default: 0,
    },
    wth1: {
      type: Number,
      default: 280,
    },
    wth2: {
      type: Number,
      default: 200,
    },
    wth3: {
      type: Number,
      default: 100,
    },
    size: {
      type: String,
      default: "small",
    },
  },
  data() {
    return {
      tableList: [],
      id: 0,
      ids: [],
      nums: 1,
      isshow: true,
      loading: true,
    };
  },
  computed: {
    ...mapGetters(["getMusicListIds", "getMusicCount"]),
  },
  methods: {
    // 播放音乐
    playMusicList(row) {
      // console.log(row.id);
      // console.log(row.num);
      if (row.id === null) return;
      //判断是否已选择播放全部
      if (this.getMusicListIds.length > 0) {
        this.$store.commit(SET_COUNT, row.num - 1);
        this.getMusicUrl(this.getMusicListIds[this.getMusicCount]);
        this.getMusicMenu(this.getMusicListIds[this.getMusicCount]);
        return;
      }
      this.getMusicUrl(row.id);
      this.getMusicMenu(row.id);
    },
    //加入收藏 暂时没完成
    addCollect() {
      this.isshow = !this.isshow;
    },
    //设置播放地址
    getMusicUrl(id) {
      getMusicUrl(id).then((res) => {
        this.$store.commit(NOW_MUSIC, res.data[0].url);
      });
    },
    //设置歌曲信息
    getMusicMenu(id) {
      getMusicMenu(id).then((res) => {
        this.$store.commit(NOW_MUSICMENU, res.songs[0]);
      });
    },
    //通过歌曲id获取信息
    getSongListInfoSongs(id) {
      // if (this.numbers && this.load && this.nums - 1 === this.numbers) return;
      // //数据过多时 记录未加载完的位置 后面监听滑动位置再重新请求一次
      // if (this.numbers && this.load && this.nums - 1 !== this.numbers) {
      //   let num = this.nums;
      //   this.tableList = this.tableList.splice(0, num);
      // }
      getSongListInfoSongs(id).then((res) => {
        //num后面用来和vuex中count对应
        res.songs[0].num = this.nums++;
        // 时间格式化  也可以加过滤 就要用到scope 其它页面有用到可以翻阅
        res.songs[0].dt = timeFormat(res.songs[0].dt);
        //每首歌的信息保存
        this.tableList.push(res.songs[0]);
        this.loading = false;
      });
    },
    //根据歌单id获取其中的歌曲 因为接口中提供信息不完整 所以得拿到各个歌曲id再单独遍历获取信息
    getSongListInfo(id) {
      getSongListInfo(id).then((res) => {
        res.playlist.trackIds.forEach((item) => {
          //将该歌单中给所有歌曲的id放到一个数组中便于请求数据
          this.ids.push(item.id);
        });
        this.ids.map((item) => {
          this.getSongListInfoSongs(item);
        });
      });
    },
  },
  created() {
    this.id = parseInt(this.$route.params.id);
    this.getSongListInfo(this.id);
  },
  watch: {
    //观察父组件的滑动触发没有 触发了就执行重新请求一次数据
    // load() {
    //   console.log("该加载了");
    //   //大概就是获取之前的位置 再裁剪数据 后面剩下每加载的再重新请求一次
    //   let num = this.nums;
    //   this.ids.splice(0, num);
    //   const arr = this.ids;
    //   this.ids = this.ids.splice(0, num);
    //   arr.map((item) => {
    //     this.getSongListInfoSongs(item);
    //   });
    // },
    // 监听id变化就重新渲染页面
    $route: function (to, from) {
      // 拿到目标参数 to.params.id 去再次请求数据接口
      this.ids = [];
      this.nums = 0;
      this.tableList = [];
      console.log(this.ids);
      this.id = parseInt(to.params.id);
      this.getSongListInfo(this.id);
    },
  },
};
</script>
<style  scoped>
.icon i {
  color: #ccc;
  font-size: 17px;
  margin-right: 5px;
}
.icon:hover i {
  color: red;
}
</style>
