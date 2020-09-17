<template>
<!-- 找不到对应的接口 只能自己先模拟几个数据了 -->
  <div class="subscr">
    <div class="item" v-for="item in 16" :key="item">
      <img src="../../../assets/img/try/song.jpg" alt="404" />
      <p>vs-心动</p>
    </div>
  </div>
</template>

<script>
// import {getAnchorSub} from 'network/anchor'
export default {
  name: "AnchorSubscr",
   data(){
        return{
            collects:[],
            id:0,
        }
    },
    methods:{
      //由于没有提供电台收藏者的接口 所以没有数据 自己暂时用图片模拟了
        // getAnchorSub(id){
        //     getAnchorSub(id).then(res => {
        //         console.log(res);
        //         this.collects = res.subscribers;
        //     })
        // }
    },
    created(){
        this.id = parseInt(this.$route.params.id);
        // this.getAnchorSub(this.id);
    }
};
</script>

<style scpoed>
.subscr{
    display: flex;
    flex-wrap: wrap;
    
}
.item{
    width: 120px;
    height: 120px;
    margin: 10px;
    overflow: hidden;
    font-size: 13px;
    color: red;
    text-align: center;
}
.item img{
    border-radius:50%;
    width: 90px;
    height: 90px;
    margin-bottom: 9px;
}
</style>