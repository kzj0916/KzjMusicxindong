<template>
  <div class="anchorList">
    <h2 style="fontSize:19px;margin:10px 0 30px 0">{{category}}</h2>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="热门" name="first">
        <div class="content">
          <PayCard
            v-for="item in types"
            :key="item.id"
            :item="item"
            :timeShow="false"
            :priceShow="false"
          >
          <p slot="count">节目：{{item.programCount}}，订阅：{{item.subCount}}</p>
          </PayCard>
        </div>
      </el-tab-pane>
      <el-tab-pane label="最新" name="second">
         <div class="content">
          <PayCard
            v-for="item in typess"
            :key="item.id"
            :item="item"
            :timeShow="false"
            :priceShow="false"
          >
          <p slot="count">节目：{{item.programCount}}，订阅：{{item.subCount}}</p>
          </PayCard>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PayCard from "components/common/anchor/PayCard";
import { getAnchorToplist } from "network/anchor";
export default {
  name: "AnchorHotList",
  components: {
    PayCard,
  },
  data() {
    return {
      activeName: "first",
      pays: [],
      id: 0,
      types: [],
      typess: [],
      category:'精选电台',
    };
  },
  methods: {
    //标题栏切换
    handleClick(tab, event) {
      // console.log(tab.name);
      // console.log(event);
      if(tab.name === 'second'){
        this.getAnchorToplistt('new');
      }
    },
    //精选电台热门数据
   getAnchorToplist() {
     getAnchorToplist().then((res) => {
        //  console.log(res.toplist);
        this.types = res.toplist;
        // console.log(this.types);
      });
    },
    //最新数据
   getAnchorToplistt(type) {
      if(this.typess.length > 0) return;
     getAnchorToplist(type).then((res) => {
        this.typess = res.toplist;
      });
    },
  },
  created() {
    this.getAnchorToplist();
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.anchorList {
  width: 95%;
  max-height: 630px;
  overflow: auto;
  margin: 0 auto;
  margin-top: 30px;
  padding: 0 30px;
  padding-bottom: 30px;
}
</style>

<style>

</style>