<template>
  <div class="mvvideo" v-if="topMenu.vid" ref="scroll">
    <div class="mv-left">
      <header>
        <a href="#">
          <i class="el-icon-arrow-left"></i>
        </a>
        <span class="mv-title">视频</span>
        <span style="fontSize: 16px;marginRight:5px">{{topMenu.title}}</span>
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
        <p>对不起，你的浏览器不支持video元素，请点击这里下载最新版本的浏览器</p>
      </video>
      <el-button size="small" icon="el-icon-thumb">赞({{likeCom.likedCount}})</el-button>
      <el-button
        size="small"
        icon="el-icon-star-off"
        @click="subscripe(12)"
      >收藏({{topMenu.subscribeCount}})</el-button>
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
        <span style="fontSize:13px;color:#888">发布时间:{{topMenu.publishTime | showDate}}</span>
        <span
          style="fontSize:13px;color:#888"
        >播放次数:{{topMenu.playTime > 10000 ? (topMenu.playTime/10000).toFixed(0) + '万' : topMenu.playTime}}次</span>
      </div>
      <div style="marginTop:8px">
        <span style="fontSize:13px;color:#888;lineHeight:1.4;">{{topMenu.desc}}</span>
      </div>
      <TitleHeader name="相关推荐" :show="false" style="marginTop:50px"></TitleHeader>
      <VideoCard v-for="item in simiMvs" :key="item.vid" :simis="item"></VideoCard>
    </div>
  </div>
</template>

<script>
import {
  getVideoDetail,
  getVideoDetailInfo,
  getVideoUrl,
  getVideoSimi,
  getVideoComment,
} from "network/musicvideo";
import { formatDate } from "common/uctil";

import TitleHeader from "components/common/titleheader/TitleHeader";
import MvComment from "components/common/singerlist/MvComment";
import VideoCard from "components/common/musicvideo/VideoCard";
export default {
  name: "SingerMvVideo",
  components: {
    TitleHeader,
    VideoCard,
    MvComment,
  },
  data() {
    return {
      id: 0, //MVid
      videurl: 0,//播放地址
      topMenu: {},//顶部信息 标题等..
      likeCom: {},//赞和评论等数据
      comments: [],//评论数据
      limits: 20,// 每次请求数
      offsets: 0,// 偏移量
      simiMvs: [],//相似mv数据
    };
  },
  methods: {
    //切换评论页码
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.offsets = (newPage - 1) * this.limits;
      this.getVideoComment(this.id, this.limits, this.offsets);
      this.$refs.scroll.scrollTop = 530;
    },
    //收藏 暂时未完成
    subscripe(id) {
      console.log(id);
    },
    //获取视频的播放地址
    getVideoUrl(id) {
      getVideoUrl(id).then((res) => {
        console.log(res);
        this.videurl = res.urls[0].url;
      });
    },
    //获取歌曲基本信息
    getVideoDetail(id) {
      getVideoDetail(id).then((res) => {
        console.log(res);
        this.topMenu = res.data;
      });
    },
    //获取 评论赞等数据 因为基本数据里面没有所以只能换个专属接口请求
    getVideoDetailInfo(id) {
      getVideoDetailInfo(id).then((res) => {
        this.likeCom = res;
      });
    },
    //获取评论数据 具体传参意思请参考网易云接口
    getVideoComment(id, limit, offset) {
      getVideoComment(id, limit, offset).then((res) => {
        //第一次请求评论加上热门评论 后续切换页码则不需要显示热门评论
        if (offset > 0) {
          this.comments = res.comments;
        } else {
          this.comments = [...res.hotComments, ...res.comments];
        }
      });
    },
    //获取相似mv数据
    getVideoSimi(id) {
      getVideoSimi(id).then((res) => {
        // console.log(res.data);
        this.simiMvs = res.data;
      });
    },
  },
  created() {
    //进入页面先获取需要展示的数据
    this.id = this.$route.params.id;
    this.getVideoDetail(this.id);
    this.getVideoUrl(this.id);
    this.getVideoDetailInfo(this.id);
    this.getVideoComment(this.id);
    this.getVideoSimi(this.id);
  },
  filters: {
    //对日期过滤成想要格式
    showDate: function (value) {
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  watch: {
    //解决同一组件间切换不刷新问题
    // 利用watch方法检测路由变化：
    $route: function (to, from) {
      // 拿到目标参数 to.params.id 去再次请求数据接口
      console.log(to.params.id);
      this.id = to.params.id;
      this.getVideoDetail(this.id);
      this.getVideoUrl(this.id);
      this.getVideoDetailInfo(this.id);
      this.getVideoComment(this.id);
      this.getVideoSimi(this.id);
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