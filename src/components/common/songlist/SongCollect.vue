<template>
  <div class="collect">
    <div class="item" v-for="(item,index) in collects" :key="index">
      <img :src='item.avatarUrl' alt='404' />
      <p>{{item.nickname}}</p>
    </div>
  </div>
</template>

<script>
import { getSongListCollect } from "network/home";
export default {
    data(){
        return{
            collects:[],
            id:0,
        }
    },
    methods:{
        //获取歌单收藏者信息
        getSongListCollect(id){
            getSongListCollect(id).then(res => {
                // console.log(res.subscribers);
                this.collects = res.subscribers;
            })
        }
    },
    created(){
        this.id = parseInt(this.$route.params.id);
        this.getSongListCollect(this.id);
    }
};
</script>

<style>
.collect{
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