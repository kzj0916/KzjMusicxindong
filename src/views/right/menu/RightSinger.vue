<template>
  <div class="rt-sing" ref="tablell">
    <div class="sing-title">
      <div class="title-o">
        <TitleBox :titles="titleOne" @changeClass="changeOne"></TitleBox>
        <TitleBox :titles="titleTwo" name="分类" @changeClass="changeTwo"></TitleBox>
        <TitleBox :titles="titleThree" name="筛选" @changeClass="changeThree"></TitleBox>
      </div>
      <div class="singers">
        <SingerCard v-for="(item,index) in singerAll" :key="index" :cards="item" ></SingerCard>
      </div>
    </div>
  </div>
</template>

<script>
import { getSinger } from "network/singer";
import TitleBox from "components/common/singerlist/TitleBox";
import SingerCard from "components/common/singerlist/SingerCard";
export default {
  name: "RightSinger",
  components: {
    TitleBox,
    SingerCard,
  },
  data() {
    return {
      //接口未找到 只能自己模拟了
      titleOne: ["华语", "欧美", "日本", "韩国", "其他"],
      titleTwo: ["全部", "男歌手", "女歌手", "乐队组合"],
      titleThree: [
        "热门",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "#",
      ],
      singerAll: [],
      id1: -1,
      id2: -1,
      id3: -1,
      limit: 30,
    };
  },
  methods: {
    getSinger(area, type, initial, limit) {
      // console.log(area,type,initial);
      getSinger(area, type, initial, limit).then((res) => {
        // console.log(res.artists);
        this.singerAll = res.artists;
      });
    },
    changeOne(name) {
      // console.log(name);
      this.limit = 30;
      switch (name) {
        case "欧美":
          this.id1 = 96;
          break;
        case "华语":
          this.id1 = 7;
          break;
        case "日本":
          this.id1 = 8;
          break;
        case "韩国":
          this.id1 = 16;
          break;
        case "其他":
          this.id1 = 0;
          break;
        default:
          this.id1 = -1;
      }
      this.getSinger(this.id1, this.id2, this.id3);
    },
    changeTwo(name) {
      console.log(name);
      this.limit = 30;
      switch (name) {
        case "男歌手":
          this.id2 = 1;
          break;
        case "女歌手":
          this.id2 = 2;
          break;
        case "乐队组合":
          this.id2 = 3;
          break;
        default:
          this.id2 = -1;
      }
      this.getSinger(this.id1, this.id2, this.id3);
    },
    changeThree(name) {
      // console.log(name);
      // console.log(name.toLowerCase());
      this.limit = 30;
      switch (name) {
        case "#":
          this.id3 = 0;
          break;
        case "热门":
          this.id3 = -1;
          break;
        default:
          this.id3 = name.toLowerCase();
      }
      this.getSinger(this.id1, this.id2, this.id3);
    },
    listenerFunction(e) {
      window.addEventListener("scroll", this.handleScroll, true);
    },
    handleScroll() {
      let scrollHeight = this.$refs.tablell.scrollHeight; // div里内容的高度，根据内容的增加和减少变化
      let scrollTop = this.$refs.tablell.scrollTop; // 滚动条的最上端到，div上端内里框框的高度
      let clientHeight = this.$refs.tablell.clientHeight; // div内里框框的高度，是死的
      if (scrollHeight - clientHeight == scrollTop) {
        console.log("到达底部");
        if(this.limit > 80) return;
        this.limit += 30;
        this.getSinger(this.id1, this.id2, this.id3, this.limit);
      }
    },
  },
  created() {
    this.getSinger(-1,-1,-1);
  },
  mounted() {
    console.log("进入");
    this.$refs.tablell.addEventListener("scroll", this.handleScroll, true);
  },
  beforeDestroy() {
    console.log("离开了");
    this.$refs.tablell.removeEventListener("scroll", this.handleScroll, true);
  },
};
</script>
<style scoped>
.singers {
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.rt-sing {
  width: 100%;
  max-height: 600px;
  overflow: auto;
  padding-bottom: 20px;
}
.sing-title {
  width: 95%;
  margin: 0 auto;
}
.title-o {
  width: 90%;
  margin: 0 auto;
  font-size: 13px;
}
</style>