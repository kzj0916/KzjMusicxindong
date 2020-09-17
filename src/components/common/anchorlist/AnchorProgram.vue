<template>
  <div
    class="program"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <el-table :data="programs" style="width: 100%" :lazy="true" @row-dblclick="playMusicList">
      <el-table-column prop="num" width="70"></el-table-column>
      <el-table-column label="操作" width="90">
        <a href class="iconn" @click.prevent.stop="playMusicList(scope.row)" slot-scope="scope">
          <img :src="scope.row.coverUrl" alt="404" style="width:40px;height:40px" />
          <i class="el-icon-caret-right playy"></i>
        </a>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题"></el-table-column>
      <el-table-column prop="listenerCount" width="100">
        <span slot-scope="scope" style="fontSize:13px">播放:{{scope.row.listenerCount}}</span>
      </el-table-column>
      <el-table-column prop="likedCount" width="100">
        <span slot-scope="scope" style="fontSize:13px">赞:{{scope.row.likedCount}}</span>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="100">
        <span slot-scope="scope" style="fontSize:13px">{{scope.row.createTime | showDate}}</span>
      </el-table-column>
      <el-table-column prop="duration" label="时长" width="100"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAnchorProgram } from "network/anchor";
import { getMusicUrl, getMusicMenu } from "network/home";
import { NOW_MUSICMENU, NOW_MUSIC } from "@/store/mutationType";
import { timeFormat, formatDate } from "common/uctil";
export default {
  name: "AnchorProgram",
  data() {
    return {
      id: 0,
      programs: [],
      nums: 1,
      loading:true,
    };
  },
  methods: {
    //获取电台节目数据
    getAnchorProgram(id) {
      getAnchorProgram(id).then((res) => {
        console.log(res.programs);
        this.programs = res.programs;
        this.programs.map((item) => {
          item.num = this.nums++;
          item.duration = timeFormat(item.duration);
          this.loading = false;
        });
      });
    },
    getMusicUrl(id) {
      getMusicUrl(id).then((res) => {
        console.log(res);
        this.$store.commit(NOW_MUSIC, res.data[0].url);
      });
    },
    getMusicMenu(id) {
      getMusicMenu(id).then((res) => {
        console.log(res);
        this.$store.commit(NOW_MUSICMENU, res.songs[0]);
      });
    },
    playMusicList(row) {
      console.log(row.mainTrackId);
      this.getMusicUrl(row.mainTrackId);
      this.getMusicMenu(row.mainTrackId);
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getAnchorProgram(this.id);
  },
  filters: {
    showDate: function (value) {
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>

<style scpoed>
.iconn {
  position: relative;
}
.playy {
  font-size: 20px;
  color: #fff;
  position: absolute;
  top: -13px;
  left: 10px;
  border: 1px solid #fff;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
}
</style>