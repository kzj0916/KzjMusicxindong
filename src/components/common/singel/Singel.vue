<template>
  <div class="singel" v-if="getNowMusicMenu.id" ref="scroll">
    <div class="singel-main">
      <div class="singel-top">
        <div class="bck-img">
          <img
            :src="getNowMusicMenu.al.picUrl"
            alt
            style="width:100%;filter:blur(80px);maxHeight:400px;borderRadius:50%;"
          />
        </div>
        <div class="singel-play-img">
          <div class="play-bar" ref="playBar">
            <img src="~assets/img/playMusic/player_bar.png" alt="404" />
          </div>
          <div class="play-disc" ref="playDisc">
            <img src="~assets/img/playMusic/disc.png" alt="404" />
            <div class="disc-img">
              <img :src="getNowMusicMenu.al.picUrl" alt />
            </div>
          </div>
          <div class="btn">
            <el-button size="mini" icon="el-icon-circle-plus-outline">喜欢</el-button>
            <el-button size="mini" icon="el-icon-star-off">收藏</el-button>
            <el-button size="mini" icon="el-icon-thumb">分享</el-button>
            <el-button size="mini" icon="el-icon-download">vip下载</el-button>
          </div>
        </div>
        <div class="singer-text">
          <div class="singel-title">
            <span style="fontSize:25px;color:#000;marginRight:10px">{{getNowMusicMenu.name || getNowMusicMenu.al.name}}</span>
            <span style="border:1px solid red;fontSize:12px;color:red;padding:1px 4px">标准音质</span>
            <div style="margin:19px 0;fontSize:13px">
              专辑:
              <span style="color:#2559a4">{{getNowMusicMenu.alia[0] || getNowMusicMenu.al.name}}</span>
              歌手:
              <span style="color:#2559a4">{{getNowMusicMenu.ar[0].name}}</span>
            </div>
          </div>
          <div class="lyric">
            <!--歌词-->

            <div
              style="width: 350px;height: 350px;overflow: auto;margin-top: 25px;transition: scrollTop 0.3s;"
              ref="lyricScroll"
            >
              <ul ref="lyric">
                <li
                  v-for="(item, i) in lrcObject"
                  :key="i"
                  :style="{color: lyricIndex === i ? 'red' : 'black'}"
                  :ref="[lyricIndex === i ? 'lyricRef' : '']"
                >{{item.c}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="singel-back">
          <el-button @click="comBack" icon="el-icon-copy-document" size="small"></el-button>
        </div>
      </div>
      <div class="singel-btm">
        <div class="singer-left">
          <TitleHeader name="听友评论" :show="false" style="marginBottom:20px"></TitleHeader>
          <MvComment :comments="lyricComment"></MvComment>
          <el-pagination
            background
            :page-size="limits"
            layout="prev, next"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
        <div class="singer-right">
           <TitleHeader name="相似歌曲" :show="false" style="marginTop:110px"></TitleHeader>
           <MvSimiCard v-for="item in simis" :key="item.id" :simis="item" title='歌曲' :iconShow='false' simiType='song'></MvSimiCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSongLyric, getSongLyricComment,getSongSimi } from "network/home";
import TitleHeader from "components/common/titleheader/TitleHeader";
import MvComment from "components/common/singerlist/MvComment";
import MvSimiCard from "components/common/singerlist/MvSimiCard";
export default {
  name: "Singel",
  components: {
    TitleHeader,
    MvComment,
    MvSimiCard,
  },
  data() {
    return {
      lyrics: "",
      lrcObject: [],
      lyricIndex: 0,
      lyricComment: [],
      limits: 20,
      offsets: 0,
      duration: 0,
      timerId: 0,
      routeNum: 0,
      simis:{},
    };
  },
  methods: {
    //获取相似单曲
    getSongSimi(id){
      getSongSimi(id).then(res =>{
        console.log(res);
        this.simis = res.songs;
      })
    },
    //唱片旋转
    routeDeg() {
      let playDisc = this.$refs.playDisc;
      playDisc.style.transform = "rotateZ(" + this.routeNum + "deg)";
      this.routeNum += 4;
    },
    //切换评论页码
    handleCurrentChange(newPage) {
      //   console.log(newPage);
      this.offsets = (newPage - 1) * this.limits;
      this.getSongLyricComment(
        this.getNowMusicMenu.id,
        this.limits,
        this.offsets
      );
      this.$refs.scroll.scrollTop = 530;
    },
    //获取单曲评论
    getSongLyricComment(id, limit, offset) {
      getSongLyricComment(id, limit, offset).then((res) => {
        console.log(res);
        if (offset > 0) {
          this.lyricComment = res.comments;
        } else {
          this.lyricComment = [...res.hotComments, ...res.comments];
        }
        console.log(this.lyricComment);
      });
    },
    //收缩页面
    comBack() {
      //   console.log("返回");
      //   console.log(this.$route);
      this.$router.back();
    },
    //获取歌词
    getSongLyric(id) {
      getSongLyric(id).then((res) => {
        console.log(res.lrc.lyric);
        this.lyrics = res.lrc.lyric;
        this.createLrcObj(this.lyrics);
      });
    },
    //解析歌词
    createLrcObj(lrc) {
      var oLRC = {
        ms: [], //歌词数组{t:时间,c:歌词}
      };
      if (lrc.length == 0) return;
      var lrcs = lrc.split("\n"); //用回车拆分成数组 (每一句歌词都用换行隔开了)
      for (var i in lrcs) {
        //遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
          var arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
          var start = 0;
          for (var k in arr) {
            start += arr[k].length; //计算歌词位置 长度叠加
          }
          var content = lrcs[i].substring(start); //获取歌词内容 相当于减去时间字符串的长度剩下的就是内容
          for (var k in arr) {
            var t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
            // var t = arr[k]
            var s = t.split(":"); //分离:前后文字 便于计算成毫秒数
            oLRC.ms.push({
              //对象{t:时间,c:歌词}加入ms数组
              // t: t,
              t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
              c: content === "" ? ".............." : content,
            });
        }
      }
      oLRC.ms.sort(function (a, b) {
        //按时间顺序排序
        return a.t - b.t;
      });
      // for (var i in oLRC) {
      //   //查看解析结果
      //   console.log(i, ":", oLRC[i]);
      // }
      this.lrcObject = oLRC.ms;
    },
  },
  computed: {
    ...mapGetters([
      "getNowMusic",
      "getNowMusicMenu",
      "getDuration",
      "getIsPlay",
    ]),
  },
  created() {
    // setTimeout((res) => {
    //   console.log(this.$refs.lyricRef[0].scrollTop);
    //   console.log(this.getDuration);
    // }, 1000);
    // console.log(this.getNowMusicMenu);
    this.getSongLyric(this.getNowMusicMenu.id);
    this.getSongLyricComment(this.getNowMusicMenu.id);
    this.getSongSimi(this.getNowMusicMenu.id);
    //唱片滚动
    this.timerId = setInterval(this.routeDeg, 100);
  },
  watch: {
    //切换了歌曲时
    getNowMusicMenu() {
      console.log("改变了");
      clearInterval(this.timerId);
      this.offsets = 0;
      this.duration = 0;
      this.timerId = 0;
      this.routeNum = 0;
      this.lyricIndex = 0;
      this.getSongLyric(this.getNowMusicMenu.id);
      this.getSongLyricComment(
        this.getNowMusicMenu.id,
        this.limits,
        this.offsets
      );
      this.getSongSimi(this.getNowMusicMenu.id);
      this.timerId = setInterval(this.routeDeg, 100);
    },
    //歌曲播放状态
    getIsPlay() {
      if (this.getIsPlay) {
        clearInterval(this.timerId);
        this.timerId = setInterval(this.routeDeg, 100);
        let playBar = this.$refs.playBar;
        playBar.style.transform = "rotate(0deg)";
      } else {
        clearInterval(this.timerId);
        let playBar = this.$refs.playBar;
        playBar.style.transform = "rotate(-30deg)";
      }
    },
    //歌曲进度条变化
    getDuration() {
      this.duration = this.getDuration;
      //对每次进来的进度条进行判断
      // 跟下一句台词时长是否匹配,如果匹配则当前高亮的索引值+1
      //使用循环找到最接近当前播放时间的歌词
      for (let i = 0; i < this.lrcObject.length; i++) {
        //这里使用小于符号判断是为了 保证回退音乐进度事件的效果实现性
        if (this.getDuration <= parseFloat(this.lrcObject[i].t)) {
          if (this.lyricIndex === i - 1) {
            break;
          }
          //找到比当前时间点 大一点的后一位的歌词的索引值
          this.lyricIndex = i-1;
          // console.log(i);
          // console.log(this.$refs.lyricRef);
          // console.log(this.$refs.lyricRef[0].offsetTop);
          // console.log(this.$refs.lyricScroll.scrollTop);
          // this.$refs.lyricScroll.transition = 'all .3s';
          //动态绑定ref 根据距离顶部不同的位置来控制歌词滚动 (原生的滚动条动画效果未实现，需要的话可能需要换其他滚动条，eg:bater-scroll)
          //这里加入了一个效果就是滑下去查看歌词时，不会自动滑动 只有到了高亮显示在可视区才会滚动
          // 175 是可视区的一半 55是出现离可视区距离 相当于一行高度 都可微调
          if (
            this.$refs.lyricScroll.scrollTop + 55 >
            this.$refs.lyricRef[0].offsetTop
          ) {
            console.log("不自动滑动");
          } else {
            if (this.$refs.lyricRef[0].offsetTop > 175) {
              this.$refs.lyricScroll.scrollTop =
                this.$refs.lyricRef[0].offsetTop - 175;
            }
          }
          //如果当前是最后一句歌词 代表歌曲要放送结束了 将我们的lyricIndex(当前歌词索引值还原成0便于下一曲使用)
          if (this.lyricIndex === this.lrcObject.length - 1) {
            this.lyricIndex = 0;
          }
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
.expand-transition {
  transition: all 0.3s ease;
}
.singel-btm {
  display: flex;
}
.singer-left {
  width: 65%;
}
.singer-right {
  width: 30%;
  margin-left:20px;
}
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #cecdd3;
  border-radius: 3px;
}
li {
  margin-top: 15px;
}
.singel-back {
  position: absolute;
  top: 0;
  right: -100px;
}
.bck-img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.lyric {
  position: relative;
  z-index: 199;
  /* overflow: auto;
  max-height: 320px;
  width: 400px;
  border: 1px solid red; */
}
.singer-text {
  margin-left: 100px;
}
.singel {
  width: 100%;
  height: 630px;
  padding-top: 20px;
  overflow: auto;
}
.singel-main {
  width: 70%;
  margin: 0 auto;
}
.singel-top {
  display: flex;
  position: relative;
}
.singel-play-img {
  margin-left: 35px;
  position: relative;
}
.play-bar {
  position: absolute;
  top: -30px;
  left: 120px;
  z-index: 10;
  transform: rotate(0deg);
  transform-origin: left top;
  transition: transform 0.5s;
}
.play-disc {
  position: relative;
  margin-top: 30px;
  width: 254px;
  height: 255px;
}
.disc-img {
  position: absolute;
  top: 57px;
  left: 58px;
  width: 140px;
  height: 140px;
}
.disc-img img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
}
.btn {
  display: flex;
  margin-top: 30px;
}
</style>