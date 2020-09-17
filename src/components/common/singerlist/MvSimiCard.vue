<template>
  <div class="mvsimicard" v-if="simis.id">
    <div class="simi-img" @click="togMv(simis.id)">
      <img :src="simis.cover || simis.album.picUrl" alt="404" />
      <div class="r-top">
        <i class="el-icon-video-camera" v-if="iconShow"></i>
        {{simis.playCount > 10000 ? (simis.playCount/10000).toFixed(0) + '万' : simis.playCount}}
      </div>
    </div>
    <div class="simi-content">
      <div class="simi-title">
        <span class="simi-mv">{{title}}</span>
        <span>{{simis.name}}</span>
      </div>
      <p style="fontSize:13px;color:#888;marginBottom:10px">{{simis.duration | showTime}}</p>
      <div
        style="fontSize:13px;color:#888;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
        v-if="simis.artists.length > 1"
      >
        <i
          v-for="(item,index) in simis.artists"
          :key="item.id"
        >{{simis.artists.length === index+1 ? item.name : item.name + '/' }}</i>
      </div>
      <span style="fontSize:13px;color:#888" v-else>{{simis.artistName || simis.artists[0].name}}</span>
    </div>
  </div>
</template>

<script>
import { timeFormat } from "common/uctil";
import { NOW_MUSICMENU, NOW_MUSIC } from "@/store/mutationType";
import { getMusicUrl, getMusicMenu } from "network/home";
export default {
  name: "MvSimiCard",
  props: {
    simis: {
      type: Object,
      default() {
        return {};
      },
    },
    title: {
      type: String,
      default: "Mv",
    },
    iconShow: {
      type: Boolean,
      default: true,
    },
    simiType: {
      type: String,
      default: "mv",
    },
  },
  methods: {
    //因为复用了组件 所以要判断跳转到那个页面
    togMv(id) {
      console.log(id);
      if (this.simiType === "mv") {
        this.$router.push("/mvvideo" + id);
      }
      if (this.simiType === "song") {
        this.getMusicUrl(id);
        this.getMusicMenu(id);
      }
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
  },
  filters: {
    showTime(value) {
      return timeFormat(value);
    },
  },
};
</script>

<style scoped>
.mvsimicard {
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.simi-img {
  width: 46%;
  position: relative;
  cursor: pointer;
}
.simi-content {
  width: 46%;
}
.simi-img img {
  width: 100%;
}
.simi-img .r-top {
  position: absolute;
  top: 2px;
  right: 3px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.03),
    rgba(0, 0, 0, 0.4)
  );
  color: #f5f5f7;
  font-size: 13px;
}
.simi-mv {
  font-size: 13px;
  padding: 3px 2px;
  border: 1px solid red;
  display: inline;
  margin-right: 4px;
}
.simi-title {
  width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  display: inline-block;
  padding: 15px 0;
}
</style>