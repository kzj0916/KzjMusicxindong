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
      <el-tab-pane label="推荐" name="second">
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
import { getAnchorHot } from "network/anchor";
export default {
  name: "AnchorList",
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
      category:'',
    };
  },
  methods: {
    //标题栏切换
    handleClick(tab, event) {
      // console.log(tab.name);
      // console.log(event);
      if(tab.name === 'second'){
        this.getAnchorHott(this.id,100);
      }
    },
    //获取精选电台
    getAnchorHot(id,li) {
      getAnchorHot(id,li).then((res) => {
        // console.log(res.djRadios);
        this.types = res.djRadios;
        this.category = res.djRadios[0].category;
        // console.log(this.types);
      });
    },
    //获取热门电台
    getAnchorHott(id,li) {
      if(this.typess.length > 0) return;
      getAnchorHot(id,li).then((res) => {
        // console.log(res.djRadios);
        res.djRadios.splice(0,50);
        this.typess = res.djRadios;
        // console.log(this.typess);
      });
    },
  },
  created() {
    this.id = this.$route.params.id;
    console.log(this.id);
    this.getAnchorHot(this.id,50);
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