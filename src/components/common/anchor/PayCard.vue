<template>
  <div class="payCard" style="width:48%;">
    <div class="pay-img">
      <a href="#" @click.prevent="handel(item.id)">
        <img :src="item.picUrl" alt="404" />
      </a>
      <span class="time" v-if="timeShow">{{time | showDate}}...</span>
    </div>
    <div class="content">
      <p class="title">
        <a href="#">{{item.name}}</a>
      </p>
      <p>{{item.rcmdText || item.rcmdtext}}</p>
      <slot name="count">
        <p>{{item.lastProgramName}}</p>
      </slot>
      <p class="price" v-if="priceShow">￥{{item.originalPrice/100}}</p>
    </div>
  </div>
</template>

<script>
import {getAnchorDetail} from 'network/anchor'
import { formatDate } from "common/uctil";
export default {
  data() {
    return {
        time:0,
    };
  },
  props:{
      item:{
          type:Object,
          default(){
              return {}
          }
      },
      timeShow:{
        type:Boolean,
        default:true,
      },
      priceShow:{
        type:Boolean,
        default:true,
      },
  },
  methods:{
      handel(id){
          // console.log(id);
           this.$router.push('/listAnchor' + id)
      },
      //付费电台数据
      getAnchorDetail(id){
          getAnchorDetail(id).then(res => {
              this.time = res.djRadio.lastProgramCreateTime;
          })
      }
  },
  created(){
      this.getAnchorDetail(this.item.id);
  },
  filters: {
    showDate (value) {
      let date = new Date(value);
      return formatDate(date, "yyyy年MM月dd日");
    },
  },
};
</script>

<style scoped>
.payCard {
    margin-top:10px;
    padding-bottom: 8px;
  display: flex;
  border-bottom: 1px solid #ccc;
}
.pay-img {
  position: relative;
  width: 28%;
  margin-right: 8px;
}
.pay-img img {
  width: 100%;
}
.pay-img .time {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.02)
  );
  font-size: 12px;
  color: #fff;
  padding: 5px 0 3px 5px;
  box-sizing: border-box;
}
.content p{
  font-size: 13px;
  color: #999;
  margin-bottom: 13px;
  padding-left: 5px;
}
.content p.title{
    margin: 8px 0 20px 0;
}
.title a{
  color: #666;
  font-size: 16px;
}
 .content .price {
  color: #44b1fb;
  font-size: 16px;
  margin-top: 2px;
}
</style>