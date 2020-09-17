<template>
  <div class="anchorList">
    <h2 style="fontSize:19px;margin:10px 0 30px 0">{{category}}</h2>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="热门" name="first">
        <div class="content">
          <PayCard v-for="item in types" :key="item.id" :item="item" :timeShow="false">
            <p slot="count">节目：{{item.programCount}}，订阅：{{item.subCount}}</p>
          </PayCard>
        </div>
      </el-tab-pane>
      <el-tab-pane label="精选" name="second">
        <div class="content">
          <PayCard v-for="item in typess" :key="item.id" :item="item" :timeShow="false">
            <p slot="count">节目：{{item.programCount}}，订阅：{{item.subCount}}</p>
          </PayCard>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PayCard from "components/common/anchor/PayCard";
import { getAnchorPay } from "network/anchor";
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
      category: "付费精品",
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab.name);
      // console.log(event);
      if (tab.name === "second") {
        this.getAnchorPayt(60);
      }
    },
    //热门
    getAnchorPay(li) {
      getAnchorPay(li).then((res) => {
        console.log(res);
        this.types = res.data.list;
        // console.log(this.types);
      });
    },
    //最新
    getAnchorPayt(li) {
      if (this.typess.length > 0) return;
      getAnchorPay(li).then((res) => {
        res.data.list.splice(0, 30);
        this.typess = res.data.list;
      });
    },
  },
  created() {
    this.getAnchorPay(30);
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