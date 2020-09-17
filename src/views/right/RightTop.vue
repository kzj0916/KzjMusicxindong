<template>
  <div class="rt-top">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
      <el-tab-pane
        class="tabs-item"
        v-for="item in tabs"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
    <!-- <button @click="handel">+++</button> -->
  </div>
</template>

<script>
export default {
  name:'righttop',
  // props:{
  //   actived:{
  //     type:String,
  //     default:"/rtstyle"
  //   }
  // },
  data() {
    return {
      activeName: "/home/rtstyle",
      tabs: [
        { label: "个性推荐", name: "/home/rtstyle", },
        { label: "歌单", name: "/home/rtsongs" },
        { label: "主播电台", name: "/home/rtanchor" },
        { label: "排行榜", name: "/home/rtlist" },
        { label: "歌手", name: "/home/rtsinger" },
        { label: "最新音乐", name: "/home/rtnewsing" },
      ],
    };
  },
  created(){
    // if(this.activeName === "/rtstyle"){
    //    this.$router.replace(this.activeName);
    // }
    // this.activeName = this.actived;
    // this.handel();
  },
  methods: {
    handleClick(tab, event,name) {
        // console.log(tab, event);
      this.$router.replace(tab.name);
      this.activeName = tab.name;
    },
    // handel(){
    //   // console.log("失去活性了");
    //   this.activeName = this.actived;
    // }
  },
};
</script>
<style >
.tabs .el-tabs__item {
  /* border: 1px solid white; */
  /* background: rgba(255, 255, 255, 0.5); */
  padding: 0 10px;
  text-align: center;
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.5);
}
/* .tabs .el-tabs__item.is-active{
  color: rgba(255, 255, 255, 0.9);
} */
/* .tabs .el-tabs__item:hover{
  color: rgba(255, 255, 255, 0.8);
} */
/* .tabs .el-tabs__active-bar{
  background: #fff;
} */
</style>
<style scoped>
.rt-top {
  width: 100%;
  text-align: center;
}
.tabs {
  display: flex;
  justify-content: center;
}
</style>