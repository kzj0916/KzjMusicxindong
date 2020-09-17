<template>
  <div class="rt-list">
    <div class="rt-content">
      <TitleHeader name="官方榜" style="marginTop:20px;width:100%" :show="false"></TitleHeader>
      <TopListCard :cards="soarings" :id="soarings.id" style="marginRight:20px"></TopListCard>
      <TopListCard :cards="newsongs" :id="newsongs.id" style="marginRight:20px"></TopListCard>
      <TopListCard :cards="original" :id="original.id"></TopListCard>
      <TopListCard :cards="hotsong" :id="hotsong.id" style="marginRight:20px"></TopListCard>
      <TopListCard :cards="raphotlist" :id="raphotlist.id" style="marginRight:20px"></TopListCard>
      <TopListCard :cards="raplist" :id="raplist.id"></TopListCard>
      <TitleHeader name="全球榜" style="marginTop:30px;width:100%" :show="false"></TitleHeader>
     <div class="rt-card">
        <MusicListItem
        v-for="(item,index) in globalList"
        :key="index"
        :item="item"
        :wth="18"
        :topShow="false"
        :userShow="false"
        style="marginRight:10px"
      ></MusicListItem>
     </div>
    </div>
  </div>
</template>

<script>
import { getTopList,getTopListDetial } from "network/toplist";
import TitleHeader from "components/common/titleheader/TitleHeader";
import TopListCard from "components/common/toplist/TopListCard";
import MusicListItem from "components/common/musiclist/MusicListItem";
export default {
  name: "RightList",
  components: {
    TitleHeader,
    TopListCard,
    MusicListItem,
  },
  data() {
    return {
      allMes:[],
      soarings: {},
      newsongs: {},
      original: {},
      hotsong: {},
      raphotlist: {},
      raplist: {},
      globalList:[],
    };
  },
  methods: {
    //  getTopListDetial(){
    //   getTopListDetial().then(res => {
    //     console.log(res);
    //   })
    // },
    getTopList() {
      getTopList().then((res) => {
        console.log(res.list);
        this.allMes = res.list.splice(0,6);
        this.soarings = this.allMes[0];
        this.newsongs = this.allMes[1];
        this.original = this.allMes[2];
        this.hotsong = this.allMes[3];
        this.raplist = this.allMes[4];
        this.raphotlist = this.allMes[5];
        console.log(res.list);
        this.globalList = res.list;
        // console.log(this.globalList);
      });
    },
  },
  created() {
    // this.getTopListDetial();
    this.getTopList();
  },
};
</script>
<style scoped>
.rt-list {
  width: 95%;
  max-height: 580px;
  margin: 0 auto;
  overflow: auto;
  padding-bottom: 40px;
}
.rt-content {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.rt-card{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>