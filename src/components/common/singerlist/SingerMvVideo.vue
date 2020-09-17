<template>
  <div class="mvvideo" v-if="topMenu.id" ref="scroll">
    <div class="mv-left">
      <header>
        <a href="#">
          <i class="el-icon-arrow-left"></i>
        </a>
        <span class="mv-title">MV</span>
        <span style="fontSize: 16px;marginRight:5px">{{topMenu.name}}</span>
        <span style="fontSize: 13px;" v-if="topMenu.artists.length > 0">{{topMenu.artists[0].name}}</span>
        <span
          style="fontSize: 13px;"
          v-if="topMenu.artists.length > 1"
        >{{topMenu.artists[0].name}}/{{topMenu.artists[1].name}}</span>
      </header>
      <video
        controls
        autoplay
        muted
        loop
        style="width:99%;margin:20px 0;"
        id="myvideo"
        :src="videurl"
      >
        <!-- <source :src="videurl" /> -->
        <!-- <source src="../../../assets/img/try/open.webm" /> -->
        <p>对不起，你的浏览器不支持video元素，请点击这里下载最新版本的浏览器</p>
      </video>
      <el-button size="small" icon="el-icon-thumb">赞({{likeCom.likedCount}})</el-button>
      <el-button
        size="small"
        icon="el-icon-star-off"
        @click="subscripe(12)"
      >收藏({{topMenu.subCount}})</el-button>
      <el-button size="small" icon="el-icon-share">分享({{topMenu.shareCount}})</el-button>
      <el-button size="small" icon="el-icon-download">下载MV</el-button>
      <a
        href="#"
        style="color:#888;fontSize:13px;textDecoration: underline;float:right;marginRight:5px"
      >举报</a>
      <TitleHeader :name="'评论('+likeCom.commentCount+')'" :show="false" style="marginTop:50px"></TitleHeader>
      <MvComment :comments="comments"></MvComment>
      <el-pagination
        background
        :page-size="limits"
        layout="prev, next"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <div class="mv-right">
      <TitleHeader name="Mv介绍" :show="false" style="marginBottom:8px;"></TitleHeader>
      <div style="display:flex;justifyContent:space-between;">
        <span style="fontSize:13px;color:#888">发布时间:{{topMenu.publishTime}}</span>
        <span
          style="fontSize:13px;color:#888"
        >播放次数:{{topMenu.playCount > 1000 ? (topMenu.playCount/10000).toFixed(0) + '万' : topMenu.playCount}}次</span>
      </div>
      <div style="marginTop:8px">
        <span style="fontSize:13px;color:#888;lineHeight:1.4;">{{topMenu.desc}}</span>
      </div>
      <TitleHeader name="相关推荐" :show="false" style="marginTop:50px"></TitleHeader>
      <MvSimiCard v-for="item in simiMvs" :key="item.id" :simis="item"></MvSimiCard>
    </div>
  </div>
</template>

<script>
import {
  getMvUrl,
  getMvDetail,
  getMvDetailInfo,
  getMvComment,
  getMvSimi,
} from "network/singer";
import TitleHeader from "components/common/titleheader/TitleHeader";
import MvComment from "components/common/singerlist/MvComment";
import MvSimiCard from "components/common/singerlist/MvSimiCard";
export default {
  name: "SingerMvVideo",
  components: {
    TitleHeader,
    MvSimiCard,
    MvComment,
  },
  data() {
    return {
      id: 0,
      videurl: 0,
      topMenu: {},
      likeCom: {},
      comments: [],
      limits: 20,
      offsets: 0,
      simiMvs: [],
    };
  },
  methods: {
    handleCurrentChange(newPage) {
      //   console.log(newPage);
      this.offsets = (newPage - 1) * this.limits;
      this.getMvComment(this.id, this.limits, this.offsets);
      //回到合适位置
      this.$refs.scroll.scrollTop = 530;
    },
    subscripe(id) {
      console.log(id);
    },
    getMvUrl(id) {
      getMvUrl(id).then((res) => {
        // console.log(res);
        this.videurl = res.data.url;
        // console.log(this.videurl);
      });
    },
    getMvDetail(id) {
      getMvDetail(id).then((res) => {
        console.log(res.data);
        this.topMenu = res.data;
        // this.artists = this.topMenu.artists;
        // console.log(this.artists);
      });
    },
    getMvDetailInfo(id) {
      getMvDetailInfo(id).then((res) => {
        // console.log(res);
        this.likeCom = res;
      });
    },
    getMvComment(id, limit, offset) {
      getMvComment(id, limit, offset).then((res) => {
        // console.log(res);
        if (offset > 0) {
          this.comments = res.comments;
        } else {
          this.comments = [...res.hotComments, ...res.comments];
        }
        // console.log(this.comments);
      });
    },
    getMvSimi(id) {
      getMvSimi(id).then((res) => {
        console.log(res);
        this.simiMvs = res.mvs;
      });
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getMvUrl(this.id);
    this.getMvDetail(this.id);
    this.getMvDetailInfo(this.id);
    this.getMvComment(this.id);
    this.getMvSimi(this.id);
  },
  watch: {
    // 利用watch方法检测路由变化：
    $route: function (to, from) {
      // 拿到目标参数 to.params.id 去再次请求数据接口
      console.log(to.params.id);
      this.id = parseInt(to.params.id);
      this.getMvUrl(this.id);
      this.getMvDetail(this.id);
      this.getMvDetailInfo(this.id);
      this.getMvComment(this.id);
      this.getMvSimi(this.id);
    },
  },
};
</script>

<style scoped>
.mv-title {
  border: 1px solid red;
  padding: 3px 4px;
  font-size: 13px;
  color: red;
  margin: 0 5px;
}
.mvvideo {
  width: 93%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin: 0 auto;
  max-height: 630px;
  overflow: auto;
}
.mv-left {
  width: 62%;
}
.mv-right {
  width: 32%;
}
</style>